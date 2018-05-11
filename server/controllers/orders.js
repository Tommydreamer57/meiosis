const convertOrders = require('../utils/utils');

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
                let cart = [];
                res.status(200).send({ cart, orders });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}