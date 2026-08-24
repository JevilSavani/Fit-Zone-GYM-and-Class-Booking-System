import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { token, logout } = useAuth();

    return (
        <header className="navbar">
            <Link className="brand" to={token ? '/classes' : '/'}>FITZONE</Link>
            <nav>
                {token && <NavLink to="/classes">Classes</NavLink>}
                {token && <NavLink to="/my-bookings">My Bookings</NavLink>}
                {token && <NavLink to="/admin">Admin</NavLink>}
                {token && <button className="link-button" onClick={logout}>Log out</button>}
            </nav>
        </header>
    );
}

export default Navbar;
