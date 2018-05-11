INSERT INTO meiosis_cart_products
(user_id, product_id)
VALUES
(${user_id}, ${product_id});

SELECT product_id as id, name, price, quantity as quantity
FROM (
    SELECT user_id, product_id, count(*) as quantity
    FROM meiosis_cart_products
    GROUP BY product_id, user_id
) as cart
JOIN meiosis_products ON meiosis_products.id = cart.product_id
WHERE user_id = ${user_id};
