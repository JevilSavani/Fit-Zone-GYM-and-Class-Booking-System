import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function TrainerDashboard() {
    const { token, user } = useAuth();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${apiUrl}/trainers/my-schedule`, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Could not load schedule');
                return data;
            })
            .then(setSchedule)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, [token]);

    return <main className="page-shell"><p className="eyebrow">TRAINER VIEW / 05</p><h1>{user?.name}'s schedule</h1>{loading && <p>Loading schedule...</p>}{error && <p className="error">{error}</p>}{!loading && !error && schedule.length === 0 && <p className="muted">No class bookings are scheduled yet.</p>}{!loading && !error && schedule.map((booking) => <article className="booking-row" key={booking._id}><div><strong>{booking.className}</strong><span>{booking.date} / {booking.timeSlot}</span></div><div><span>Member: {booking.memberId?.name}</span><span>{booking.memberId?.email}</span></div><b className={`status ${booking.status}`}>{booking.status}</b></article>)}</main>;
}

export default TrainerDashboard;
