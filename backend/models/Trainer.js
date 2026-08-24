const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Trainer name is required'], minlength: [2, 'Trainer name must be at least 2 characters'] },
        email: { type: String, required: [true, 'Trainer email is required'], unique: true, lowercase: true, trim: true },
        specialization: { type: String, required: [true, 'Specialization is required'], minlength: [2, 'Specialization must be at least 2 characters'] },
        available: { type: Boolean, default: true },
        role: { type: String, enum: ['Trainer'], default: 'Trainer' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
