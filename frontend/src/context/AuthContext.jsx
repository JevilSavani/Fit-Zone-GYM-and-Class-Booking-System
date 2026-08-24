import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const savedAuth = JSON.parse(localStorage.getItem('fitzoneAuth') || 'null');
const savedUser = savedAuth?.user || savedAuth?.member || JSON.parse(localStorage.getItem('user') || 'null');
const savedToken = savedAuth?.token || localStorage.getItem('token') || '';
const savedRole = savedAuth?.role || localStorage.getItem('role') || '';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(savedUser);
    const [token, setToken] = useState(savedToken);
    const [role, setRole] = useState(savedRole);

    function login(userData, authToken, userRole) {
        const authData = userData?.user ? userData : { user: userData, token: authToken, role: userRole };
        const nextUser = authData.user || authData.member;
        setUser(nextUser);
        setToken(authData.token);
        setRole(authData.role);
        localStorage.setItem('fitzoneAuth', JSON.stringify({ user: nextUser, token: authData.token, role: authData.role }));
        localStorage.setItem('user', JSON.stringify(nextUser));
        localStorage.setItem('token', authData.token);
        localStorage.setItem('role', authData.role);
    }

    function logout() {
        setUser(null);
        setToken('');
        setRole('');
        localStorage.removeItem('fitzoneAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    return <AuthContext.Provider value={{ user, member: user, token, role, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
