module.exports = {
    read(req, res) {
        let { id } = req.session.user;
        req.db.read_cart({ id })
            .then(cart => {
                res.status(200).send(cart);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
    create(req, res) {
        let { product_id } = req.params;
        let { id: user_id } = req.session.user;
        req.db.create_cart({ product_id, user_id })
            .then(cart => {
                res.status(200).send(cart);
            })
            .catch(err => {
                console.log(err);
                res.status(200).send(err);
            });
    },
    delete(req, res) {
        let { amt } = req.query;
        let { product_id } = req.params;
        let { id: user_id } = req.session.user;
        console.log({ amt, product_id, user_id });
        let deletion;
        if (amt)
            deletion = req.db.delete_cart_amt({ user_id, product_id, amt });
        else
            deletion = req.db.delete_cart({ user_id, product_id });
        deletion
            .then(cart => {
                res.status(200).send(cart);
            })
            .catch(err => {
                console.log(err);
                res.status(200).send(err);
            });
    }
}