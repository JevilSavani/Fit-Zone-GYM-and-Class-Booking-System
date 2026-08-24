import React, { useEffect, useState } from 'react';
import TrainerCard from '../components/TrainerCard';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function ClassesPage() {
    const { token } = useAuth();
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({ trainerId: '', className: '', date: '', timeSlot: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchTrainers() {
            try {
                const response = await fetch(`${apiUrl}/trainers`);
                if (!response.ok) throw new Error('Could not load trainers');
                setTrainers(await response.json());
            } catch (requestError) {
                setError(requestError.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTrainers();
    }, []);

    const filteredTrainers = trainers.filter((trainer) => trainer.specialization.toLowerCase().includes(search.toLowerCase()));
    const selectedTrainer = trainers.find((trainer) => trainer._id === formData.trainerId);

    function updateForm(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleBooking(event) {
        event.preventDefault();
        setMessage('');
        try {
            const response = await fetch(`${apiUrl}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.errors?.join(', ') || data.message);
            setMessage('Class booked successfully.');
            setFormData({ trainerId: '', className: '', date: '', timeSlot: '' });
        } catch (requestError) {
            setMessage(requestError.message);
        }
    }

    return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">SCHEDULE / 02</p><h1>Find your next<br /><em>challenge.</em></h1></div><label className="search-label">Search specialization<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try yoga or cardio" /></label></div>{loading && <p>Loading trainers...</p>}{error && <p className="error">{error}</p>}{!loading && !error && <section className="trainer-grid">{filteredTrainers.map((trainer) => <TrainerCard key={trainer._id} name={trainer.name} specialization={trainer.specialization} available={trainer.available} />)}</section>}<section className="booking-section"><div><p className="eyebrow">Reserve a place</p><h2>Book a class</h2><p className="muted">{selectedTrainer ? `Training with ${selectedTrainer.name}` : 'Choose a trainer to get started.'}</p></div><form className="booking-form" onSubmit={handleBooking}><label>Trainer<select name="trainerId" value={formData.trainerId} onChange={updateForm} required><option value="">Select trainer</option>{trainers.map((trainer) => <option key={trainer._id} value={trainer._id} disabled={!trainer.available}>{trainer.name} {trainer.available ? '' : '(Fully Booked)'}</option>)}</select></label><label>Class name<input name="className" value={formData.className} onChange={updateForm} placeholder="Yoga flow" required /></label><label>Date<input type="date" name="date" value={formData.date} onChange={updateForm} required /></label><label>Time slot<select name="timeSlot" value={formData.timeSlot} onChange={updateForm} required><option value="">Select time</option><option>8:00 AM</option><option>10:00 AM</option><option>5:00 PM</option><option>7:00 PM</option></select></label><button className="primary-button">Reserve class</button>{message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}</form></section></main>;
}

export default ClassesPage;
