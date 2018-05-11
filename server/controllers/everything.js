module.exports = {
    read(req, res) {
        console.log(req.session);
        let { id: user_id } = req.session.user;
        req.db.read_products()
            .then(products => {
                req.db.read_cart({ user_id })
                    .then(cart => {
                        req.db.read_orders({ user_id })
                            .then(orders => {
                                orders = orders.reduce((all, curr) => {
                                    let { order_id, timestamp, product_id, name, price, count } = curr;
                                    let order = all.find(ord => ord.id === order_id)
                                    if (order) {
                                        order.products.push({ id: product_id, name, price, count });
                                    } else {
                                        order = {
                                            id: order_id,
                                            timestamp,
                                            products: [{ id: product_id, name, price, count }]
                                        };
                                        all.push(order);
                                    }
                                    return all;
                                }, []);
                                res.status(200).send({ cart, orders, products });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(err);
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}