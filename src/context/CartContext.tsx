import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, Promo, Order, OrderStatus, PaymentMethod, DeliveryZone } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PROMOS, INITIAL_DELIVERY_ZONES } from '../data/restaurantData';

interface CartContextType {
  // Persistent Products
  products: Product[];
  toggleProductAvailability: (productId: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string, addons?: string[], notes?: string) => { success: boolean; message: string };
  updateQuantity: (cartItemId: string, newQty: number) => { success: boolean; message?: string };
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  activePromo: Promo | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  selectedZone: DeliveryZone;
  setSelectedZone: (zone: DeliveryZone) => void;
  
  // Financial totals
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  taxAmount: number;
  serviceFeeAmount: number;
  grandTotal: number;

  // Order Placement & History
  orders: Order[];
  placeOrder: (
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    paymentMethod: PaymentMethod,
    customerNote?: string
  ) => Promise<{ success: boolean; order?: Order; error?: string }>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  latestOrder: Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistent Products Store
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('muscle_chicken_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('muscle_chicken_cart') || localStorage.getItem('cuisene_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const [activePromo, setActivePromo] = useState<Promo | null>(null);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(INITIAL_DELIVERY_ZONES[0]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('muscle_chicken_orders') || localStorage.getItem('cuisene_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback
      }
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('muscle_chicken_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('muscle_chicken_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('muscle_chicken_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.is_available;
          return { ...p, is_available: nextState };
        }
        return p;
      })
    );
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const validated = Math.max(0, newStock);
          return {
            ...p,
            stock: validated,
            is_available: validated > 0 ? p.is_available : false,
          };
        }
        return p;
      })
    );
  };

  const addToCart = (product: Product, quantity = 1, variant?: string, addons?: string[], notes?: string) => {
    const currentProduct = products.find((p) => p.id === product.id) || product;

    if (!currentProduct.is_available || currentProduct.stock <= 0) {
      return {
        success: false,
        message: `Maaf, ${currentProduct.name} sedang habis (Sold Out).`
      };
    }

    const itemPrice = currentProduct.promo_price ?? currentProduct.price;
    const cartItemId = `${currentProduct.id}-${variant || 'default'}-${addons ? addons.join(',') : ''}`;

    const existingItem = cart.find((item) => item.id === cartItemId);
    const currentCartQty = existingItem ? existingItem.quantity : 0;
    const requestedTotalQty = currentCartQty + quantity;

    if (requestedTotalQty > currentProduct.stock) {
      return {
        success: false,
        message: `Stok ${currentProduct.name} hanya tersisa ${currentProduct.stock} porsi (di keranjang sudah ada ${currentCartQty}).`
      };
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: requestedTotalQty,
          subtotal: requestedTotalQty * itemPrice
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product: currentProduct,
          quantity,
          selectedVariant: variant,
          selectedAddons: addons,
          itemPrice,
          subtotal: quantity * itemPrice,
          notes
        }
      ];
    });

    return {
      success: true,
      message: `${currentProduct.name} (${quantity}x) dimasukkan ke keranjang.`
    };
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return { success: true };
    }

    const item = cart.find((c) => c.id === cartItemId);
    if (!item) return { success: false, message: 'Item tidak ditemukan.' };

    const currentProduct = products.find((p) => p.id === item.product.id) || item.product;
    if (newQty > currentProduct.stock) {
      return {
        success: false,
        message: `Maksimal pembelian untuk ${currentProduct.name} adalah ${currentProduct.stock} porsi sesuai sisa stok.`
      };
    }

    setCart((prev) =>
      prev.map((c) =>
        c.id === cartItemId
          ? { ...c, quantity: newQty, subtotal: newQty * c.itemPrice }
          : c
      )
    );
    return { success: true };
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setActivePromo(null);
  };

  const applyPromo = (code: string) => {
    const found = INITIAL_PROMOS.find(
      (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.is_active
    );
    if (!found) {
      return { success: false, message: 'Kode voucher promo tidak ditemukan atau sudah kedaluwarsa.' };
    }

    const currentSubtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    if (currentSubtotal < found.min_order_amount) {
      return {
        success: false,
        message: `Minimal transaksi untuk voucher ${found.code} adalah Rp ${found.min_order_amount.toLocaleString('id-ID')}.`
      };
    }

    setActivePromo(found);
    return { success: true, message: `Voucher ${found.title} berhasil dipasang!` };
  };

  const removePromo = () => {
    setActivePromo(null);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  let discountAmount = 0;
  if (activePromo && subtotal >= activePromo.min_order_amount) {
    if (activePromo.discount_type === 'PERCENTAGE') {
      discountAmount = (subtotal * activePromo.discount_amount) / 100;
    } else {
      discountAmount = activePromo.discount_amount;
    }
  }

  const deliveryFee = selectedZone ? selectedZone.delivery_fee : 15000;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.10); // 10% Restaurant Tax PB1
  const serviceFeeAmount = Math.round(taxableAmount * 0.05); // 5% Service packaging fee
  const grandTotal = Math.max(0, taxableAmount + deliveryFee + taxAmount + serviceFeeAmount);

  const placeOrder = async (
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    paymentMethod: PaymentMethod,
    customerNote?: string
  ) => {
    if (cart.length === 0) {
      return { success: false, error: 'Keranjang belanja Muscle Chicken Anda masih kosong.' };
    }

    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: 'Nama pemesan wajib diisi dengan benar (minimal 2 karakter).' };
    }

    const cleanedPhone = customerPhone.replace(/[\s-]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 8) {
      return { success: false, error: 'Nomor WhatsApp / telepon wajib valid (minimal 8 digit angka).' };
    }

    const trimmedAddress = deliveryAddress.trim();
    if (!trimmedAddress || trimmedAddress.length < 5) {
      return { success: false, error: 'Alamat pengiriman wajib diisi dengan lengkap.' };
    }

    // Re-verify stock for every single item before committing
    for (const item of cart) {
      const liveProd = products.find((p) => p.id === item.product.id);
      if (!liveProd || !liveProd.is_available || liveProd.stock < item.quantity) {
        return {
          success: false,
          error: `Stok untuk "${item.product.name}" tidak mencukupi (Tersisa: ${liveProd?.stock || 0}). Mohon sesuaikan pesanan Anda.`
        };
      }
    }

    // Deduct stock from persistent products
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const purchased = cart
          .filter((c) => c.product.id === p.id)
          .reduce((sum, c) => sum + c.quantity, 0);
        if (purchased > 0) {
          const remainingStock = Math.max(0, p.stock - purchased);
          return {
            ...p,
            stock: remainingStock,
            sold_count: (p.sold_count || 0) + purchased,
            is_available: remainingStock > 0 ? p.is_available : false
          };
        }
        return p;
      })
    );

    const orderNumber = `MC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentNote = paymentMethod === 'CASH_ON_DELIVERY'
      ? 'Bayar tunai di tempat (COD) saat kurir tiba.'
      : `Metode ${paymentMethod}. Menunggu transfer & verifikasi kasir.`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      customer_name: trimmedName,
      customer_phone: cleanedPhone,
      subtotal,
      discount: discountAmount,
      delivery_fee: deliveryFee,
      tax: taxAmount,
      service_fee: serviceFeeAmount,
      total: grandTotal,
      payment_method: paymentMethod,
      payment_status: 'UNPAID', // Truthful status: No live payment webhook connected
      order_status: 'ORDER RECEIVED',
      delivery_address: trimmedAddress,
      customer_note: customerNote,
      created_at: new Date().toISOString(),
      items: cart.map((c) => ({
        id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        order_id: `ord-${Date.now()}`,
        product_id: c.product.id,
        product_name: c.product.name,
        quantity: c.quantity,
        price: c.itemPrice,
        subtotal: c.subtotal,
        variant_name: c.selectedVariant
      })),
      status_history: [
        {
          id: `sh-${Date.now()}`,
          order_id: `ord-${Date.now()}`,
          status: 'ORDER RECEIVED',
          note: `Pesanan tercatat di terminal Muscle Chicken Indonesia. ${paymentNote}`,
          created_at: new Date().toISOString()
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const shouldMarkPaid =
            newStatus === 'PAYMENT CONFIRMED' ||
            newStatus === 'COMPLETED' ||
            (newStatus === 'OUT FOR DELIVERY' && ord.payment_method !== 'CASH_ON_DELIVERY');

          const nextPaymentStatus = shouldMarkPaid ? 'PAID' : ord.payment_status;

          const newHistory = [
            ...(ord.status_history || []),
            {
              id: `sh-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
              order_id: orderId,
              status: newStatus,
              note: note || `Status pesanan diperbarui menjadi ${newStatus}${shouldMarkPaid ? ' (Pembayaran terverifikasi)' : ''}`,
              created_at: new Date().toISOString()
            }
          ];
          return {
            ...ord,
            order_status: newStatus,
            payment_status: nextPaymentStatus,
            status_history: newHistory
          };
        }
        return ord;
      })
    );
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <CartContext.Provider
      value={{
        products,
        toggleProductAvailability,
        updateProductStock,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        activePromo,
        applyPromo,
        removePromo,
        selectedZone,
        setSelectedZone,
        subtotal,
        discountAmount,
        deliveryFee,
        taxAmount,
        serviceFeeAmount,
        grandTotal,
        orders,
        placeOrder,
        updateOrderStatus,
        latestOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
