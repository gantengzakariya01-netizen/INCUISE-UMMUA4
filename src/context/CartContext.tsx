import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, Promo, Order, OrderStatus, PaymentMethod, DeliveryZone } from '../types';
import { INITIAL_PROMOS, INITIAL_DELIVERY_ZONES } from '../data/restaurantData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string, addons?: string[], notes?: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cuisene_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePromo, setActivePromo] = useState<Promo | null>(null);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(INITIAL_DELIVERY_ZONES[0]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cuisene_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cuisene_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cuisene_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, quantity = 1, variant?: string, addons?: string[], notes?: string) => {
    const itemPrice = product.promo_price ?? product.price;
    const cartItemId = `${product.id}-${variant || 'default'}-${addons ? addons.join(',') : ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          subtotal: newQty * itemPrice
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          quantity,
          selectedVariant: variant,
          selectedAddons: addons,
          itemPrice,
          subtotal: quantity * itemPrice,
          notes
        }
      ];
    });
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: newQty, subtotal: newQty * item.itemPrice }
          : item
      )
    );
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
  const taxAmount = Math.round(taxableAmount * 0.10); // 10% Tax
  const serviceFeeAmount = Math.round(taxableAmount * 0.05); // 5% Service fee
  const grandTotal = Math.max(0, taxableAmount + deliveryFee + taxAmount + serviceFeeAmount);

  const placeOrder = async (
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    paymentMethod: PaymentMethod,
    customerNote?: string
  ) => {
    if (cart.length === 0) {
      return { success: false, error: 'Keranjang belanja Anda masih kosong.' };
    }

    const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      customer_name: customerName,
      customer_phone: customerPhone,
      subtotal,
      discount: discountAmount,
      delivery_fee: deliveryFee,
      tax: taxAmount,
      service_fee: serviceFeeAmount,
      total: grandTotal,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'CASH_ON_DELIVERY' ? 'UNPAID' : 'PAID',
      order_status: 'PENDING',
      delivery_address: deliveryAddress,
      customer_note: customerNote,
      created_at: new Date().toISOString(),
      items: cart.map((c) => ({
        id: `oi-${Date.now()}-${Math.random()}`,
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
          status: 'PENDING',
          note: 'Pesanan baru telah diterima oleh sistem ICUISENE UMMU A4.',
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
          const newHistory = [
            ...(ord.status_history || []),
            {
              id: `sh-${Date.now()}`,
              order_id: orderId,
              status: newStatus,
              note: note || `Status pesanan diperbarui menjadi ${newStatus}`,
              created_at: new Date().toISOString()
            }
          ];
          return {
            ...ord,
            order_status: newStatus,
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
