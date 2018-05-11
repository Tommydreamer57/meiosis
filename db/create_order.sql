WITH ord AS (
    INSERT INTO meiosis_orders
    (user_id)
    VALUES
    (${user_id})
    RETURNING *
), prod AS (
    DELETE FROM meiosis_cart_products
    WHERE user_id = ${user_id}
    RETURNING *
)
INSERT INTO meiosis_order_products
(order_id, product_id)
SELECT ord.id AS order_id, prod.product_id AS product_id FROM ord
JOIN prod ON ord.user_id = prod.user_id;

SELECT order_id, product_id, timestamp, name, price, COUNT(*) AS quantity FROM meiosis_orders
JOIN meiosis_order_products
ON meiosis_order_products.order_id = meiosis_orders.id
JOIN meiosis_products
ON meiosis_products.id = meiosis_order_products.product_id
WHERE meiosis_orders.user_id = ${user_id}
GROUP BY name, order_id, timestamp, product_id, name, price;