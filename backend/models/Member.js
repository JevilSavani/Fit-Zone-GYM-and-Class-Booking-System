const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], minlength: [2, 'Name must be at least 2 characters'] },
        email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
        phone: { type: String, required: [true, 'Phone is required'], minlength: [7, 'Phone must be at least 7 characters'] },
        membershipType: {
            type: String,
            enum: { values: ['basic', 'premium', 'platinum'], message: 'Membership type must be basic, premium, or platinum' },
            default: 'basic'
        },
        role: { type: String, enum: ['Member'], default: 'Member' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
