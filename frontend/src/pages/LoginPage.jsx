import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

function LoginPage() {
    const { token, login } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('member@example.com');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [membershipType, setMembershipType] = useState('basic');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (token) return <Navigate to="/classes" replace />;

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
            const body = mode === 'login' ? { email } : { name, email, phone, membershipType };
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.errors?.join(', ') || data.message || 'Request failed');
            login(data);
            navigate('/classes');
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    }

    return <main className="login-layout"><section className="login-copy"><p className="eyebrow">MEMBER ACCESS / 01</p><h1>Train with<br /><em>intention.</em></h1><p>Book your next session and keep momentum on your side.</p></section><form className="login-form" onSubmit={handleSubmit}><div className="auth-tabs"><button type="button" className={mode === 'login' ? 'auth-tab active' : 'auth-tab'} onClick={() => { setMode('login'); setError(''); }}>Login</button><button type="button" className={mode === 'register' ? 'auth-tab active' : 'auth-tab'} onClick={() => { setMode('register'); setError(''); }}>Create account</button></div><p className="eyebrow">{mode === 'login' ? 'Welcome back' : 'New member'}</p><h2>{mode === 'login' ? 'Sign in to FitZone' : 'Create your account'}</h2>{mode === 'register' && <><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} required /></label><label>Membership<select value={membershipType} onChange={(event) => setMembershipType(event.target.value)}><option value="basic">Basic</option><option value="premium">Premium</option><option value="platinum">Platinum</option></select></label></>}<label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>{error && <p className="error">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Enter the gym' : 'Create account'}</button>{mode === 'login' && <small>Demo member: member@example.com</small>}</form></main>;
}

export default LoginPage;
