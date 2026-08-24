const jwt = require('jsonwebtoken');

function authGuard(req, res, next) {
    const authorization = req.headers.authorization || '';
    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        req.member = jwt.verify(token, process.env.JWT_SECRET);
        if (req.member.id && !req.member.memberId) req.member.memberId = req.member.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authGuard;
