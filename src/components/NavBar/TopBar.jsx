import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Componente Topbar
 * 
 * Este componente representa la barra de navegación superior de la aplicación, que incluye 
 * enlaces de navegación y un menú desplegable para el usuario autenticado. Proporciona 
 * funcionalidad para abrir y cerrar el menú de navegación en dispositivos móviles y gestionar 
 * el menú desplegable de opciones de usuario.
 * 
 * Props:
 * - user: Objeto que contiene la información del usuario autenticado, como su nombre.
 * - logout: Función que maneja el cierre de sesión del usuario.
 * 
 * @param {object} props - Las propiedades recibidas por el componente, incluyendo `user` y `logout`.
 * @returns {JSX.Element} La barra de navegación superior.
 */
export const Topbar = ({ user, logout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    /**
     * Maneja el cierre del menú desplegable si se hace clic fuera del mismo.
     * 
     * @param {object} event - El evento de foco/desenfoque.
     */
    const handleBlur = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.relatedTarget)
        ) {
            setIsDropdownOpen(false);
        }
    };

    /**
     * Llama a la función de cierre de sesión y ejecuta cualquier acción necesaria después de cerrar sesión.
     */
    const handleLogOut = () => {
        logout();
    };

    return (
        <div
            onBlur={handleBlur}
            className="antialiased bg-gray-100 dark:bg-gray-900 z-20">
            <div className="w-full text-gray-400 bg-gray-700 dark:text-gray-200">
                <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between p-4">
                        <NavLink
                            to="/inicio"
                            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
                            BlackHole App - PT
                        </NavLink>
                        <button
                            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                {!isMenuOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <nav
                        className={`${
                            isMenuOpen ? "flex" : "hidden"
                        } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row `}>
                        <NavLink
                            to="/inicio"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-2 mt-2 text-sm font-semibold rounded-lg  md:mt-0 md:ml-4  ${
                                    isActive ? "dark:bg-gray-600" : "text-gray-200"
                                }`
                            }>
                            Inicio
                        </NavLink>
                        <NavLink
                            onClick={() => setIsMenuOpen(false)}
                            to="/usuarios"
                            className={({ isActive }) =>
                                `px-4 py-2 mt-2 text-sm font-semibold rounded-lg  md:mt-0 md:ml-4  ${
                                    isActive ? "dark:bg-gray-600" : "text-gray-200"
                                }`
                            }>
                            Usuarios
                        </NavLink>

                        <div
                            className="relative z-10"
                            tabIndex={0} // Añadir tabIndex para manejar el foco
                            ref={dropdownRef}
                            onBlur={handleBlur}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex flex-row text-white bg-gray-200 items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                <span id="nameUser">{user.nombre}</span>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${
                                        isDropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}>
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 origin-top-right">
                                    <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark:bg-gray-700">
                                        <div className="flex flex-row justify-center gap-4">
                                            <button
                                                onMouseDown={handleLogOut} // Usar onMouseDown en lugar de onClick
                                                className="flex w-44 flex-row items-end rounded-lg p-2 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                                <div className="bg-red-500 text-white rounded-lg p-3"></div>
                                                <div className="ml-3">
                                                    <p className="font-semibold">Log Out</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};
