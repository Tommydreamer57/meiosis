const convertOrders = require('../utils/utils');

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
                                orders = convertOrders(orders);
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