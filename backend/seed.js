require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Member');
const Trainer = require('./models/Trainer');

const trainers = [
    { name: 'Rahul Patel', specialization: 'Yoga', available: true },
    { name: 'Priya Shah', specialization: 'Zumba', available: false },
    { name: 'Amit Kumar', specialization: 'Strength Training', available: true },
    { name: 'Neha Joshi', specialization: 'Cardio', available: true }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await Trainer.deleteMany({});
    await Trainer.insertMany(trainers);
    await Member.findOneAndUpdate(
        { email: 'member@example.com' },
        { name: 'Demo Member', email: 'member@example.com', phone: '9876543210', membershipType: 'premium' },
        { upsert: true, new: true, runValidators: true }
    );
    console.log('Sample trainers and demo member inserted.');
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
