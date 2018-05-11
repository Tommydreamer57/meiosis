function convertOrders(orders) {
    return orders.reduce((all, curr) => {
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
}

module.exports = {
    read(req, res) {
        let { id: user_id } = req.session.user;
        req.db.read_orders({ user_id })
            .then(orders => {
                orders = convertOrders(orders);
                res.status(200).send(orders);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
    create(req, res) {
        let { id: user_id } = req.session.user;
        req.db.create_order({ user_id })
            .then(orders => {
                orders = convertOrders(orders);
                console.log(orders);
                res.status(200).send(orders);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}