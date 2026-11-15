/*
# Create orders table (single-tenant, no auth)

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `customer_name` (text, not null) — name of the person placing the order
  - `phone_number` (text, not null) — contact phone number
  - `burger_type` (text, not null) — which burger was ordered (e.g. "Classic Smash Burger")
  - `quantity` (integer, not null, default 1) — how many burgers
  - `address` (text, not null) — delivery address
  - `payment_method` (text, not null) — "bKash" or "Cash on Delivery"
  - `status` (text, not null, default 'pending') — order fulfillment status
  - `created_at` (timestamptz, default now()) — when the order was placed
2. Security
- Enable RLS on `orders`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can read/write.
- Allow anon + authenticated CRUD because this is a no-auth public ordering app.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  burger_type text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  address text NOT NULL,
  payment_method text NOT NULL DEFAULT 'Cash on Delivery',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON orders TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);
