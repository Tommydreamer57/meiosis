module.exports = {
    readAll(req, res) {
        req.db.read_products()
            .then(all => {
                res.status(200).send(all);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    readOne(req, res) {
        let { id } = req.params;
        req.db.read_product_by_id({ id })
            .then(([one]) => {
                res.status(200).send(one);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
    create(req, res) {
        let { name, price, } = req.body;
        req.db.create_product({ name, price })
            .then(all => {
                res.status(200).send(all);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    update(req, res) {
        let { id } = req.params;
        let { name, price } = req.body;
        req.db.update_product({ id, name, price })
            .then(all => {
                res.status(200).send(all);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    delete(req, res) {
        let { id } = req.params;
        req.db.delete_product({ id })
            .then(all => {
                res.status(200).send(all);
            })
            .catch(err => {
                res.status(500).send(err)
            });
    }
}