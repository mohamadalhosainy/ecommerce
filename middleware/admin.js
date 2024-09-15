const jwt = require('jsonwebtoken') ;

module.exports = function (req , res , next) {
    const token = req.header('token') ;
    if (!token) return res.status(401).send('Access denied.No Token Provided.') ;

    try {
        const decoded = jwt.verify(token , 'MySecuruKey') ;
        if (decoded.role === 'admin'){
            req.admin = decoded ; 
            next() ;
        } else {
            return res.status(401).send('You don\'t have permission.') ;
        }
    } catch (e) {
        res.status(400).send('Invalid token.') ;
    }
}