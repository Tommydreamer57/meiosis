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
            .then(() => {
                req.db.read_cart({ id: user_id })
                    .then(cart => {
                        res.status(200).send(cart);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(200).send(err);
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(200).send(arr);
            });
    },
    delete(req, res) {
        req.db.delete_cart();
    }
}