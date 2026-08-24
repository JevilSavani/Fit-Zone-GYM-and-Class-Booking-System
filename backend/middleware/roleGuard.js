function roleGuard(...allowedRoles) {
    return (req, res, next) => {
        if (!req.member || !allowedRoles.includes(req.member.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

module.exports = roleGuard;