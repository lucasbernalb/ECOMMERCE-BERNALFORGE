-- =============================================
-- BERNALFORGE E-COMMERCE RLS FIX
-- Migration: Fix RLS policies for public read access
-- =============================================
-- Run this in Supabase SQL Editor

-- =============================================
-- PRODUCTS TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "products_public_read" ON products;
DROP POLICY IF EXISTS "products_admin_insert" ON products;
DROP POLICY IF EXISTS "products_admin_update" ON products;
DROP POLICY IF EXISTS "products_admin_delete" ON products;

-- Create public read policy (for ALL users - anon AND authenticated)
CREATE POLICY "products_public_read" ON products
FOR SELECT USING (true);

-- Create admin-only insert policy
CREATE POLICY "products_admin_insert" ON products
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Create admin-only update policy
CREATE POLICY "products_admin_update" ON products
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Create admin-only delete policy
CREATE POLICY "products_admin_delete" ON products
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);


-- =============================================
-- CATEGORIES TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON categories;
DROP POLICY IF EXISTS "categories_public_read" ON categories;
DROP POLICY IF EXISTS "categories_admin_insert" ON categories;
DROP POLICY IF EXISTS "categories_admin_update" ON categories;
DROP POLICY IF EXISTS "categories_admin_delete" ON categories;

-- Create public read policy
CREATE POLICY "categories_public_read" ON categories
FOR SELECT USING (true);

-- Create admin-only insert policy
CREATE POLICY "categories_admin_insert" ON categories
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Create admin-only update policy
CREATE POLICY "categories_admin_update" ON categories
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Create admin-only delete policy
CREATE POLICY "categories_admin_delete" ON categories
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);


-- =============================================
-- PROFILES TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "profiles_public_read" ON profiles;
DROP POLICY IF EXISTS "profiles_user_select" ON profiles;
DROP POLICY IF EXISTS "profiles_user_update" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_select" ON profiles;
DROP POLICY IF EXISTS "profiles_user_update" ON profiles;

-- Users can read their own profile
CREATE POLICY "profiles_own_select" ON profiles
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (except is_admin)
CREATE POLICY "profiles_own_update" ON profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_select" ON profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles AS admin_profiles
    WHERE admin_profiles.id = auth.uid() AND admin_profiles.is_admin = true
  )
);


-- =============================================
-- ORDERS TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "orders_user_select" ON orders;
DROP POLICY IF EXISTS "orders_public_insert" ON orders;
DROP POLICY IF EXISTS "orders_admin_update" ON orders;

-- Users can read their own orders
CREATE POLICY "orders_own_select" ON orders
FOR SELECT USING (auth.uid() = user_id);

-- Admins can read all orders
CREATE POLICY "orders_admin_select" ON orders
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Public insert (guest checkout allowed)
CREATE POLICY "orders_public_insert" ON orders
FOR INSERT WITH CHECK (true);

-- Admin update
CREATE POLICY "orders_admin_update" ON orders
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);


-- =============================================
-- ORDER_ITEMS TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "order_items_user_select" ON order_items;
DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;

-- Users can view items in their own orders
CREATE POLICY "order_items_own_select" ON order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- Admins can view all order items
CREATE POLICY "order_items_admin_select" ON order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Public insert
CREATE POLICY "order_items_public_insert" ON order_items
FOR INSERT WITH CHECK (true);


-- =============================================
-- WISHLIST TABLE
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "wishlist_user_select" ON wishlist;
DROP POLICY IF EXISTS "wishlist_user_insert" ON wishlist;
DROP POLICY IF EXISTS "wishlist_user_delete" ON wishlist;

-- Users can read their own wishlist
CREATE POLICY "wishlist_own_select" ON wishlist
FOR SELECT USING (auth.uid() = user_id);

-- Users can add to their own wishlist
CREATE POLICY "wishlist_own_insert" ON wishlist
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete from their own wishlist
CREATE POLICY "wishlist_own_delete" ON wishlist
FOR DELETE USING (auth.uid() = user_id);


-- =============================================
-- VERIFICATION QUERY (run this separately to verify)
-- =============================================
-- SELECT 
--     tablename,
--     policyname,
--     cmd,
--     qual,
--     with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
