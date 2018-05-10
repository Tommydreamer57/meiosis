module.exports = function addDbToReq(req, res, next) {
    const db = req.app.get('db');
    req.db = db;
    next();
}