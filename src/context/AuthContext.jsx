/* eslint-disable */

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Creación del contexto de autenticación
export const AuthContext = createContext();

/**
 * Componente AuthProvider
 * 
 * Este componente proporciona un contexto de autenticación para toda la aplicación. 
 * Maneja el estado de autenticación del usuario, el almacenamiento de datos del usuario, 
 * y ofrece funciones para iniciar sesión, cerrar sesión y verificar si el usuario está autenticado.
 * 
 * @param {object} children - Los componentes hijos que serán envueltos por este proveedor de contexto.
 * @returns {JSX.Element} Un proveedor de contexto que envuelve la aplicación con los valores de autenticación.
 */
export const AuthProvider = ({ children }) => {
    const nav = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData , setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga los datos del usuario desde localStorage cuando el componente se monta
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
    }, []);

    // Verifica si hay un token en localStorage para establecer el estado de autenticación
    useEffect(() => {
        const token = localStorage.getItem('logged');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    /**
     * Función para iniciar sesión
     * 
     * @param {boolean} token - Un valor booleano que indica si el usuario está autenticado.
     * @param {object} userData - Los datos del usuario que serán almacenados en el estado y en localStorage.
     */
    const login = (token, userData) => {
        localStorage.setItem('logged', true);
        setUserData(userData);
        setIsAuthenticated(token);
    };

    /**
     * Función para cerrar sesión
     * 
     * Elimina el estado de autenticación y los datos del usuario de localStorage, 
     * y redirige al usuario a la página de inicio de sesión.
     */
    const logout = () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData([]);
        nav("/login");
    };

    /**
     * Función para verificar si el usuario está autenticado
     * 
     * @returns {boolean} Retorna true si el usuario está autenticado, de lo contrario false.
     */
    const isLogged = () => {
        return isAuthenticated;
    }

    /**
     * Función para obtener los datos del usuario autenticado
     * 
     * @returns {object} Los datos del usuario almacenados en el estado.
     */
    const loggedData = () => {
        return userData;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLogged, loggedData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
