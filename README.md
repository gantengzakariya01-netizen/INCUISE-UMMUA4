# 👑 CUISENE UMMU A4 — Luxury Restaurant E-Commerce & Management Platform

A production-ready, ultra-premium restaurant web application platform built with **React**, **TypeScript**, **Tailwind CSS v4**, **Lucide Icons**, **Supabase PostgreSQL**, and **Supabase Auth**.

Designed with the **Purple Elegant Luxury** design system (Deep Royal Purple, Champagne Gold accents, Glassmorphism, and smooth micro-interactions).

---

## 🌟 Key Features

### 🛒 Customer E-Commerce Experience
- **Interactive Fine Dining Menu:** Dynamic search, category filtering (*Signature Chef Specials, Prime Wagyu & Steaks, Seafood Delicacies, Royal Desserts, Artisanal Drinks*).
- **Customizable Food Detail Modal:** Variant selection (e.g., steak doneness levels), extra add-ons, special cooking instructions, and real-time pricing.
- **Cart Drawer & Voucher System:** Live subtotal, delivery fee calculation based on delivery zones, 10% tax, 5% service fee, and interactive promo code vouchers (`ROYAL20`, `UMMU50K`, `GOLDVIP`).
- **Multi-Step Checkout:** Address details, delivery zone selection, and payment options (*QRIS, Bank Transfer BCA/Mandiri, Credit Card, COD*).
- **Real-time Order Status Timeline:** Visual step progress indicator (`PENDING` ➔ `CONFIRMED` ➔ `PREPARING` ➔ `ON_DELIVERY` ➔ `DELIVERED`) with status history logs.
- **Customer Auth & Profile:** Register, login, reset password, update profile name/phone/avatar, and order history tracking.

### 🛡️ Admin Dashboard & Management Portal
- **Role-Based Access Control (RBAC):**
  - `SUPER_ADMIN`: Full access to orders, products, promos, reports, and system settings.
  - `ADMIN`: Products, orders, promos, customers, and sales reports.
  - `STAFF`: Live orders management and status updates.
- **Real-Time Orders Management:** Single-click order status updates (`PENDING`, `CONFIRMED`, `PREPARING`, `ON_DELIVERY`, `DELIVERED`, `CANCELLED`).
- **Product & Stock Control:** Edit stock levels, toggle product availability (`Tersedia` / `Habis`).
- **Promo Voucher Management:** Manage active discount vouchers.
- **Sales & Analytics Summary:** Live revenue summary, completed orders tally, and customer satisfaction rating.

---

## 🚀 Tech Stack

- **Frontend:** React 19 + TypeScript 6
- **Styling:** Tailwind CSS v4 + Design Tokens System
- **Icons:** Lucide React (`lucide-react`)
- **Backend & Database:** Supabase (PostgreSQL 14+) with Row Level Security (RLS)
- **Authentication:** Supabase Auth + RBAC Context
- **Tooling & Build:** Vite 8

---

## 📦 Project Setup & Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/cuisene-ummu-a4.git
cd cuisene-ummu-a4
npm install
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Supabase Database Migration & Seed
Run the SQL scripts located in the `supabase/` folder in your Supabase SQL Editor:
1. `supabase/schema.sql`: Sets up tables, indexes, enums, and Row Level Security policies.
2. `supabase/seed.sql`: Populates development demo data (10+ luxury dishes, categories, promos, delivery zones, settings).

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 🔐 Credentials Demo Access

### Customer Demo
- **Email:** `customer@cuisene.id`
- **Password:** Any password / local demo login

### Admin Portal Demo
- **Email:** `admin@cuisene-ummua4.id`
- **Password:** `admin123` (or click **Portal Admin** tab in Login Modal)

---

## 📜 License
Copyright © 2026 **CUISENE UMMU A4**. All Rights Reserved.
