const express = require('express');
const Trainer = require('../models/Trainer');
const ClassBooking = require('../models/ClassBooking');
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');

const router = express.Router();

router.get('/my-schedule', authGuard, roleGuard('Trainer'), async (req, res, next) => {
    try {
        const bookings = await ClassBooking.find({ trainerId: req.member.id })
            .populate('memberId', 'name email phone')
            .sort({ date: 1, timeSlot: 1 });
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const trainers = await Trainer.find().sort({ name: 1 });
        res.status(200).json(trainers);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
