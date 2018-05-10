module.exports = {
    read(req, res) {
        let { id } = req.body;
        req.db.read_cart({})
    },
    create(req, res) {
        
    },
    delete(req, res) {
        
    }
}