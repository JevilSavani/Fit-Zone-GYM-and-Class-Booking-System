import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const savedAuth = JSON.parse(localStorage.getItem('fitzoneAuth') || 'null');

export function AuthProvider({ children }) {
    const [member, setMember] = useState(savedAuth?.member || null);
    const [token, setToken] = useState(savedAuth?.token || '');
    const [role, setRole] = useState(savedAuth?.role || '');

    function login(authData) {
        setMember(authData.member);
        setToken(authData.token);
        setRole(authData.role);
        localStorage.setItem('fitzoneAuth', JSON.stringify(authData));
    }

    function logout() {
        setMember(null);
        setToken('');
        setRole('');
        localStorage.removeItem('fitzoneAuth');
    }

    return <AuthContext.Provider value={{ member, token, role, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
