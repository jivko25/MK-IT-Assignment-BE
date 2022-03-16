const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header('token');

    if(!token) return res.status(401).send('Access Denied!');

    try {
        const verified = jwt.verify(token, process.env.secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = verify;