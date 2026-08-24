const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Admin name is required'], minlength: [2, 'Admin name must be at least 2 characters'] },
        email: { type: String, required: [true, 'Admin email is required'], unique: true, lowercase: true, trim: true },
        role: { type: String, enum: ['Admin'], default: 'Admin' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);