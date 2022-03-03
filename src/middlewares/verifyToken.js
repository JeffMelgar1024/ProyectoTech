const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers; 
    console.log(authorization, 'authorization');
    if (!authorization) {
        return res.status(401).send('No esta loggeado');
    }
    jwt.verify(authorization, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).send('No tienes permisos');
        }
        console.log(decoded, 'decoded');
        req.user = decoded.dataToken;
        next();
    });
}

exports.verifyToken = verifyToken;