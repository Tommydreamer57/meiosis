
-- DROP TABLES

DROP TABLE IF EXISTS meiosis_order_products;

DROP TABLE IF EXISTS meiosis_orders;

DROP TABLE IF EXISTS meiosis_cart_products;

DROP TABLE IF EXISTS meiosis_users;

DROP TABLE IF EXISTS meiosis_products;

-- PRODUCTS

CREATE TABLE meiosis_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    price MONEY
);

INSERT INTO meiosis_products
(name, price)
VALUES
('one', 1.00),
('two', 2.00),
('three', 3.00);

-- USERS

CREATE TABLE meiosis_users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    username VARCHAR(40),
    email VARCHAR(60),
    auth_id VARCHAR(60),
    provider VARCHAR(20)
);

INSERT INTO meiosis_users
(first_name, last_name, username, email)
VALUES
('Tommy', 'Lowry', 'Tommydreamer57', 'minilao94@yahoo.com'),
('Thomas', 'Lowry', 'Tommydreamer57', 'thomas.lowry@devmounta.in'),
('Thomas', 'Lowry', 'tommydreamer57', 'thomas.lowry@devmountain.com');

-- CARTS

CREATE TABLE meiosis_cart_products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES meiosis_users(id),
    product_id INTEGER REFERENCES meiosis_products(id)--,
    -- quantity INTEGER
);

INSERT INTO meiosis_cart_products
(user_id, product_id)--, quantity)
VALUES
(1, 2),-- 3),
(1, 2),-- 3),
(1, 2),-- 3),
(1, 2),-- 3),
(1, 3),-- 1),
(1, 3),-- 1),
(1, 3),-- 1),
(1, 3),-- 1),
(1, 3),-- 1),
(1, 3),-- 1),
(1, 3),-- 1),
(2, 1),-- 4),
(2, 2),-- 2),
(2, 3),-- 6),
(3, 1),-- 3),
(3, 2),-- 1),
(3, 3);--, 8);

-- ORDERS

CREATE TABLE meiosis_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES meiosis_users(id),
    timestamp TIMESTAMP default CURRENT_TIMESTAMP
);

INSERT INTO meiosis_orders
(user_id)
VALUES
(1),
(2),
(2),
(3);

-- ORDER PRODUCTS

CREATE TABLE meiosis_order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES meiosis_orders(id),
    product_id INTEGER REFERENCES meiosis_products(id),
    price 
);

INSERT INTO meiosis_order_products
(order_id, product_id)
VALUES
(1, 1),
(1, 1),
(1, 2),
(1, 3),
(1, 3),
(1, 3),
(1, 3),
(2, 1),
(2, 1),
(2, 3);
