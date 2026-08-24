const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Trainer = require('../models/Trainer');
const Admin = require('../models/Admin');

const router = express.Router();

function createAuthResponse(user) {
    const role = user.role || (user.specialization ? 'Trainer' : 'Member');
    const token = jwt.sign({ id: user._id.toString(), role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, user: { id: user._id, name: user.name, email: user.email }, role };
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
        const user = await Member.findOne({ email }) || await Trainer.findOne({ email }) || await Admin.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const authData = createAuthResponse(user);

        return res.status(200).json({
            message: 'Login successful',
            ...authData
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
