-- WITH order_id AS (
--     INSERT INTO meiosis_orders
--     (user_id)
--     VALUES
--     ${user_id}
--     RETURNING id;
-- )
-- SELECT product_id FROM (
--     DELETE FROM meiosis_cart_products
--     WHERE user_id = ${user_id}
--     RETURNING *;
-- ), order_id
-- INTO 

WITH order_id AS (
    INSERT INTO meiosis_orders
    (user_id)
    VALUES
    ${user_id}
    RETURNING id;
)
INSERT INTO meiosis_order_products
(order_id, product_id)
VALUES (order_id, (
    SELECT product_id FROM (
        DELETE FROM meiosis_cart_products
        WHERE user_id = ${user_id}
        RETURNING *;
    )
));