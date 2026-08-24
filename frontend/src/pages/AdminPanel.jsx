import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function AdminPanel() {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${apiUrl}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Could not load statistics');
                return data;
            })
            .then(setStats)
            .catch((requestError) => setError(requestError.message));
    }, [token]);

    return <main className="page-shell"><p className="eyebrow">OPERATIONS / 04</p><h1>Admin panel</h1><p className="intro">Live FitZone overview.</p>{error && <p className="error">{error}</p>}{!stats && !error && <p>Loading statistics...</p>}{stats && <section className="stats-grid"><div className="admin-stat"><strong>{stats.members}</strong><span>Total Members</span></div><div className="admin-stat"><strong>{stats.trainers}</strong><span>Total Trainers</span></div><div className="admin-stat"><strong>{stats.bookings}</strong><span>Total Bookings</span></div></section>}</main>;
}

export default AdminPanel;
