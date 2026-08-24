const mongoose = require('mongoose');

const classBookingSchema = new mongoose.Schema(
    {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: [true, 'Member is required'] },
        trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: [true, 'Trainer is required'] },
        className: { type: String, required: [true, 'Class name is required'], minlength: [2, 'Class name must be at least 2 characters'] },
        date: { type: String, required: [true, 'Date is required'] },
        timeSlot: { type: String, required: [true, 'Time slot is required'] },
        status: { type: String, enum: { values: ['booked', 'attended', 'cancelled'], message: 'Status must be booked, attended, or cancelled' }, default: 'booked' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ClassBooking', classBookingSchema);
