import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function MyBookingsPage() {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${apiUrl}/bookings/my`, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Could not load bookings');
                return data;
            })
            .then(setBookings)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, [token]);

    return <main className="page-shell"><p className="eyebrow">YOUR TRAINING / 03</p><h1>My bookings</h1>{loading && <p>Loading bookings...</p>}{error && <p className="error">{error}</p>}{!loading && !error && bookings.length === 0 && <p className="muted">No bookings yet. Your next session belongs on the calendar.</p>}{!loading && !error && bookings.map((booking) => <article className="booking-row" key={booking._id}><div><strong>{booking.className}</strong><span>{booking.trainerId?.name} / {booking.trainerId?.specialization}</span></div><div><span>{booking.date}</span><span>{booking.timeSlot}</span></div><b className={`status ${booking.status}`}>{booking.status}</b></article>)}</main>;
}

export default MyBookingsPage;
