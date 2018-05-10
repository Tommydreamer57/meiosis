
-- DROP TABLES

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
    product_id INTEGER REFERENCES meiosis_products(id)
);

INSERT INTO meiosis_cart_products
(user_id, product_id)
VALUES
(1, 2),
(1, 3),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(2, 2),
(3, 2),
(3, 3);

-- SELECT name as product_name, price as product_price, first_name, last_name, username, email FROM meiosis_cart_products
-- JOIN meiosis_users ON meiosis_cart_products.user_id = meiosis_users.id
-- JOIN meiosis_products ON meiosis_cart_products.product_id = meiosis_products.id;
