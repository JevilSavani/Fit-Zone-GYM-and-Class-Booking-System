const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

const router = express.Router();

function createAuthResponse(member) {
    const role = 'Member';
    const token = jwt.sign({ memberId: member._id.toString(), role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, member: { id: member._id, name: member.name, email: member.email }, role };
}

router.post('/register', async (req, res, next) => {
    try {
        const member = await Member.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            membershipType: req.body.membershipType || 'basic'
        });
        return res.status(201).json({ message: 'Account created', ...createAuthResponse(member) });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();
        const member = await Member.findOne({ email });

        if (!member) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const authData = createAuthResponse(member);

        return res.status(200).json({
            message: 'Login successful',
            ...authData
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
