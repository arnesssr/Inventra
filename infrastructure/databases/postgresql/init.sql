-- Inventra Database Initialization Script
-- This script sets up the initial database structure for all microservices

-- Create databases for each service
CREATE DATABASE inventra_products;
CREATE DATABASE inventra_inventory;
CREATE DATABASE inventra_orders;
CREATE DATABASE inventra_suppliers;
CREATE DATABASE inventra_auth;
CREATE DATABASE inventra_audit;
CREATE DATABASE inventra_analytics;

-- Create service-specific users
CREATE USER product_service WITH PASSWORD 'product_service_password';
CREATE USER inventory_service WITH PASSWORD 'inventory_service_password';
CREATE USER order_service WITH PASSWORD 'order_service_password';
CREATE USER supplier_service WITH PASSWORD 'supplier_service_password';
CREATE USER auth_service WITH PASSWORD 'auth_service_password';
CREATE USER audit_service WITH PASSWORD 'audit_service_password';
CREATE USER analytics_service WITH PASSWORD 'analytics_service_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE inventra_products TO product_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_inventory TO inventory_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_orders TO order_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_suppliers TO supplier_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_auth TO auth_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_audit TO audit_service;
GRANT ALL PRIVILEGES ON DATABASE inventra_analytics TO analytics_service;

-- Create read-only user for analytics
CREATE USER analytics_reader WITH PASSWORD 'analytics_reader_password';
GRANT CONNECT ON DATABASE inventra_products TO analytics_reader;
GRANT CONNECT ON DATABASE inventra_inventory TO analytics_reader;
GRANT CONNECT ON DATABASE inventra_orders TO analytics_reader;
GRANT CONNECT ON DATABASE inventra_suppliers TO analytics_reader;

-- Switch to each database and create schemas
\c inventra_products;
CREATE SCHEMA IF NOT EXISTS products;
CREATE SCHEMA IF NOT EXISTS categories;
GRANT USAGE ON SCHEMA products TO product_service;
GRANT USAGE ON SCHEMA categories TO product_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA products TO product_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA categories TO product_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA products TO product_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA categories TO product_service;

\c inventra_inventory;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS stock_movements;
GRANT USAGE ON SCHEMA inventory TO inventory_service;
GRANT USAGE ON SCHEMA stock_movements TO inventory_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA inventory TO inventory_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA stock_movements TO inventory_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA inventory TO inventory_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA stock_movements TO inventory_service;

\c inventra_orders;
CREATE SCHEMA IF NOT EXISTS orders;
CREATE SCHEMA IF NOT EXISTS order_items;
GRANT USAGE ON SCHEMA orders TO order_service;
GRANT USAGE ON SCHEMA order_items TO order_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA orders TO order_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA order_items TO order_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA orders TO order_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA order_items TO order_service;

\c inventra_suppliers;
CREATE SCHEMA IF NOT EXISTS suppliers;
CREATE SCHEMA IF NOT EXISTS purchase_orders;
GRANT USAGE ON SCHEMA suppliers TO supplier_service;
GRANT USAGE ON SCHEMA purchase_orders TO supplier_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA suppliers TO supplier_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA purchase_orders TO supplier_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA suppliers TO supplier_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA purchase_orders TO supplier_service;

\c inventra_auth;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS roles;
CREATE SCHEMA IF NOT EXISTS permissions;
GRANT USAGE ON SCHEMA users TO auth_service;
GRANT USAGE ON SCHEMA roles TO auth_service;
GRANT USAGE ON SCHEMA permissions TO auth_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA users TO auth_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA roles TO auth_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA permissions TO auth_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA users TO auth_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA roles TO auth_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA permissions TO auth_service;

\c inventra_audit;
CREATE SCHEMA IF NOT EXISTS audit_logs;
CREATE SCHEMA IF NOT EXISTS events;
GRANT USAGE ON SCHEMA audit_logs TO audit_service;
GRANT USAGE ON SCHEMA events TO audit_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA audit_logs TO audit_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA events TO audit_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA audit_logs TO audit_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA events TO audit_service;

\c inventra_analytics;
CREATE SCHEMA IF NOT EXISTS reports;
CREATE SCHEMA IF NOT EXISTS metrics;
GRANT USAGE ON SCHEMA reports TO analytics_service;
GRANT USAGE ON SCHEMA metrics TO analytics_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA reports TO analytics_service;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA metrics TO analytics_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA reports TO analytics_service;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA metrics TO analytics_service;