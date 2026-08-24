import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { token, role, logout } = useAuth();

    return (
        <header className="navbar">
            <Link className="brand" to={token ? '/classes' : '/'}>FITZONE</Link>
            <nav>
                {role === 'Member' && <NavLink to="/classes">Classes</NavLink>}
                {role === 'Member' && <NavLink to="/my-bookings">My Bookings</NavLink>}
                {role === 'Trainer' && <NavLink to="/trainer">My Schedule</NavLink>}
                {role === 'Admin' && <NavLink to="/admin">Admin Panel</NavLink>}
                {token && <button className="link-button" onClick={logout}>Log out</button>}
            </nav>
        </header>
    );
}

export default Navbar;
