const express = require('express');
const mongoose = require('mongoose');
const ClassBooking = require('../models/ClassBooking');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const booking = new ClassBooking({
            memberId: req.member.memberId,
            trainerId: req.body.trainerId,
            className: req.body.className,
            date: req.body.date,
            timeSlot: req.body.timeSlot
        });

        const savedBooking = await booking.save();
        res.status(201).json({ message: 'Booking created', booking: savedBooking });
    } catch (error) {
        next(error);
    }
});

router.get('/my', async (req, res, next) => {
    try {
        const bookings = await ClassBooking.find({ memberId: req.member.memberId })
            .populate('memberId', 'name email')
            .populate('trainerId', 'name specialization')
            .sort({ date: 1 });

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id/status', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid booking id' });
        }

        const booking = await ClassBooking.findOneAndUpdate(
            { _id: req.params.id, memberId: req.member.memberId },
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
