const express = require('express');
const Member = require('../models/Member');
const Trainer = require('../models/Trainer');
const ClassBooking = require('../models/ClassBooking');

const router = express.Router();

router.get('/stats', async (req, res, next) => {
    try {
        const [members, trainers, bookings] = await Promise.all([
            Member.countDocuments(),
            Trainer.countDocuments(),
            ClassBooking.countDocuments()
        ]);
        res.status(200).json({ members, trainers, bookings });
    } catch (error) {
        next(error);
    }
});

module.exports = router;