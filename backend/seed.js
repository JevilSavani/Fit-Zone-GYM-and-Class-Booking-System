require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Member');
const Trainer = require('./models/Trainer');
const Admin = require('./models/Admin');

const trainers = [
    { name: 'Rahul Patel', email: 'trainer@fitzone.com', specialization: 'Yoga', available: true },
    { name: 'Priya Shah', email: 'priya@fitzone.com', specialization: 'Zumba', available: false },
    { name: 'Amit Kumar', email: 'amit@fitzone.com', specialization: 'Strength Training', available: true },
    { name: 'Neha Joshi', email: 'neha@fitzone.com', specialization: 'Cardio', available: true }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    for (const trainer of trainers) {
        await Trainer.findOneAndUpdate(
            { name: trainer.name },
            trainer,
            { upsert: true, new: true, runValidators: true }
        );
    }
    await Member.findOneAndUpdate(
        { email: 'member@fitzone.com' },
        { name: 'Test Member', email: 'member@fitzone.com', phone: '9876543210', membershipType: 'premium', role: 'Member' },
        { upsert: true, new: true, runValidators: true }
    );
    await Admin.findOneAndUpdate(
        { email: 'admin@fitzone.com' },
        { name: 'FitZone Admin', email: 'admin@fitzone.com', role: 'Admin' },
        { upsert: true, new: true, runValidators: true }
    );
    console.log('Sample members, trainers, and admin inserted.');
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
