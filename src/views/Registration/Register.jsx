/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { doRegister } from "../../services/doRegister";

/**
 * Componente Register
 * 
 * Este componente representa la vista de registro de usuarios en la aplicación.
 * Permite a los usuarios crear una nueva cuenta proporcionando sus datos personales 
 * y autenticación (nombre, correo electrónico, y contraseña). Incluye validación 
 * de campos y manejo de errores.
 * 
 * Props:
 * - isLoading: Estado que indica si se está realizando una operación de carga.
 * - setIsLoading: Función para actualizar el estado de carga.
 * 
 * @param {object} props - Props del componente, incluyendo isLoading y setIsLoading.
 * @returns {JSX.Element} Vista del componente Register.
 */
export const Register = ({ isLoading, setIsLoading }) => {

    /**
     * Obtiene las funciones login e isLogged del contexto de autenticación.
     * - login: Se utiliza para establecer el estado de autenticación del usuario y 
     *   guardar la información del usuario en el localStorage.
     * - isLogged: Verifica si el usuario ya está autenticado.
     */
    const { login, isLogged } = useContext(AuthContext);
    const navigate = useNavigate();
    const log = isLogged();

    useEffect(() => {
        if (log) {
            // Redirige al usuario a la página de inicio si ya está autenticado.
            navigate("/inicio");
        }
    }, [log]);

    /**
     * Estado para manejar los datos ingresados por el usuario en el formulario de registro.
     */
    const [user, setUser] = useState({
        nombre: "",
        email: "",
        reemail: "",
        password: "",
        repassword: "",
        id_admin: "88b1257b-1e55-43b7-9ec8-4cf1d329db9c", // ID de administrador predeterminado.
    });
    const [errors, setErrors] = useState("");

    /**
     * Función asincrónica para manejar el proceso de registro de un nuevo usuario.
     * 
     * Valida que todos los campos sean correctos y coincidan, luego llama a la función
     * doRegister() que se encarga de realizar la petición al backend para registrar al usuario.
     * Muestra mensajes de error o éxito en función del resultado.
     */
    const handleRegister = async () => {
        const { email, reemail, password, repassword, nombre } = user;
        if (
            email !== reemail ||
            password !== repassword ||
            nombre === "" ||
            email === "" ||
            password === "" ||
            reemail === "" ||
            repassword === ""
        ) {
            // Muestra una alerta de error si los campos no coinciden o están vacíos.
            Swal.fire({
                icon: "error",
                title: "Error al registrarse",
                text: "Los datos ingresados no coinciden, por favor, intenta de nuevo.",
                timer: 5000,
                showCloseButton: false,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    popup: "xxs:width-2/5 md:width-2/5 xs:width-2/5 lg:text-lg",
                    title: "xxs:text-xs md:text-md xs:text-sm xl:text-xl lg:text-lg font-bold text-red-400",
                    icon: "xxs:text-xs md:text-md xs:text-xxs xl:text-lg lg:text-lg text-red-400",
                    htmlContainer: "xs:text-xs md:text-md xxs:text-xs xl:text-xl lg:text-lg",
                    timerProgressBar: "bg-red-400",
                },
            });

            setErrors("Faltan datos por ingresar, intenta nuevamente");
        } else {
            const { email, password, nombre, id_admin } = user;
            await doRegister(email, password, nombre, id_admin)
                .then((response) => {
                    return response;
                })
                .then((result) => {
                    if (Object.keys(result).length > 4) {
                        setErrors("");
                        setIsLoading(false);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Usuario Creado",
                            text: "Usuario creado satisfactoriamente",
                        });
                        navigate("/login");
                    } else {
                        setIsLoading(false);
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear el usuario",
                            text: "No fue posible crear el usuario, intenta nuevamente.",
                            timer: 2000,
                            showCloseButton: false,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            customClass: {
                                popup: "xxs:width-2/5 md:width-2/5 xs:width-2/5 lg:text-lg",
                                title: "xxs:text-xs md:text-md xs:text-sm xl:text-xl lg:text-lg font-bold text-red-400",
                                icon: "xxs:text-xs md:text-md xs:text-xxs xl:text-lg lg:text-lg text-red-400",
                                htmlContainer: "xs:text-xs md:text-md xxs:text-xs xl:text-xl lg:text-lg",
                                timerProgressBar: "bg-red-400",
                            },
                        });
                        setErrors("Faltan campos o hay campos vacíos");
                    }
                })
                .finally(setIsLoading(false));
        }
    };

    return (
        /**
         * Renderizado de la vista del componente Register.
         * Muestra un formulario de registro o un loader dependiendo del estado de carga.
         * 
         * Estilos aplicados: TailwindCSS
         */
        <div
            className="flex h-screen w-screen items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/assets/bg-login.webp')",
            }}>
            <div
                className="rounded-xl bg-gray-800 bg-opacity-50 xl:px-10 xl:py-5 shadow-lg backdrop-blur-md py-5 text-xs:px-4">
                <div className="flex flex-col items-center justify-center text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src="/assets/users_network.png" width="60" alt="" srcSet="" />
                        <h1 className="mb-2 text-xl">UsersApp - Prueba Técnica</h1>
                        <span className="text-gray-300">Login</span>
                    </div>
                    <div>
                        <div className="mb-4 text-lg">
                            <input
                                className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                                value={user.username} 
                            />
                        </div>

                        <div className="mb-4 text-lg">
                            <input
                                className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
                                type="text"
                                id="reusername"
                                name="reusername"
                                placeholder="Repetir Email"
                                onChange={(e) => setUser({ ...user, reemail: e.target.value })} 
                                value={user.reusername} 
                            />
                        </div>

                        <div className="mb-4 text-lg">
                            <input
                                className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
                                id="password"
                                type="Password"
                                name="Password"
                                placeholder="Password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password} 
                                
                            />
                        </div>

                        <div className="mb-4 text-lg">
                            <input
                                className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
                                id="repassword"
                                type="Password"
                                name="repassword"
                                placeholder="Repetir Password"
                                onChange={(e) => setUser({ ...user, repassword: e.target.value })}
                                value={user.repassword} 
                            />
                        </div>

                        <div className="mb-4 text-lg">
                            <input
                                className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
                                id="nombre"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                onChange={(e) => setUser({ ...user, nombre: e.target.value })} 
                                value={user.nombre}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center text-lg text-black gap-2 xl:gap-1 lg:gap-4 xs:gap-1 xxs:gap-4">
                        <button
                            type="submit"
                            className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                            onClick={() => handleRegister()}>
                            Registrar
                        </button>
                        <button
                            type="submit"
                            className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                            onClick={() => navigate("/login")}>
                            Ir a Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
