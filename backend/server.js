require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requestLogger = require('./middleware/requestLogger');
const authGuard = require('./middleware/authGuard');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'FitZone API is running', health: '/api/v1/health' });
});
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ message: 'FitZone API is running' });
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trainers', trainerRoutes);
app.use('/api/v1/bookings', authGuard, bookingRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`FitZone API listening on port ${port}`));
    })
    .catch((error) => {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    });

module.exports = app;
