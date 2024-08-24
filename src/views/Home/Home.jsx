import React, { useEffect } from "react";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

/**
 * Componente Home
 * 
 * Este componente representa la vista principal de la aplicación después de que un usuario 
 * ha iniciado sesión. Muestra un mensaje de bienvenida y proporciona accesos directos a 
 * diferentes funcionalidades de la aplicación, como la visualización de perfiles y la tabla 
 * de usuarios. También maneja el estado de carga durante la obtención y actualización de 
 * información del usuario.
 * 
 * Props:
 * - updateContextUser: Función para actualizar el contexto del usuario con la información obtenida.
 * - user: Estado del usuario proporcionado por el contexto.
 * - isLoading: Estado que indica si se está realizando una operación de carga.
 * - setIsLoading: Función para actualizar el estado de carga.
 * 
 * @param {object} props - Props del componente, incluyendo updateContextUser, user, isLoading y setIsLoading.
 * @returns {JSX.Element} Vista del componente Home.
 */
export const Home = ({ updateContextUser, user, isLoading, setIsLoading }) => {
    
    useEffect(() => {
        // Verifica si el usuario tiene un ID válido y actualiza el contexto del usuario
        if (user[0]?.id !== "" || user[0]?.id) {
            updateContextUser(user);
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Imagen de fondo con filtro y desvanecimiento */}
                    <div
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                            isLoading ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ backgroundImage: "url('/assets/earth.jpg')" }}></div>

                    {/* Overlay con opacidad y filtro gris */}
                    <div
                        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-1000 ease-in-out ${
                            isLoading ? "opacity-100" : "opacity-0"
                        }`}></div>

                    {/* Contenido del div */}
                    <div className="relative right-16 z-10">
                        <div className="text-white">
                            <Loader styling={"top-80"} />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <section className="h-5/6 bg-gray-50 z-0">
                        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                            <div
                                className="absolute top-0 w-full h-full bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/assets/galaxy-img.jpeg')",
                                }}>
                                <span
                                    id="blackOverlay"
                                    className="w-full h-full absolute opacity-35 bg-black"></span>
                            </div>
                            <div className="text-center relative mx-auto">
                                <div className="items-center flex flex-wrap">
                                    <div className="flex flex-row justify-center items-center w-full lg:w-6/12 px-4 ml-auto mr-auto">
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-white font-semibold w-full text-4xl sm:text-xl lg:text-xl xl:text-6xl whitespace-nowrap">
                                                BlackHole App
                                            </p>
                                            <p className="text-white font-semibold w-full text-xl pt-2 whitespace-nowrap">
                                                Administración de usuarios
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                                style={{ transform: "translateZ(0px)" }}>
                                <svg
                                    className="absolute bottom-0 overflow-hidden"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    version="1.1"
                                    viewBox="0 0 2560 100"
                                    x="0"
                                    y="0">
                                    <polygon
                                        className="text-blueGray-200 fill-current"
                                        points="2560 0 2560 100 0 100"></polygon>
                                </svg>
                            </div>
                        </div>
                        <section className="pb-10 bg-blueGray-200 -mt-24">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-wrap">
                                    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                            <div className="px-4 py-5 flex-auto">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                                                    <i className="fas fa-award"></i>
                                                </div>
                                                <h6 className="text-xl font-semibold">
                                                    Revisa tu perfil
                                                </h6>
                                                <p className="mt-2 mb-4 text-blueGray-500">
                                                    Username, Nombre, Correo
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-4/12 px-4 text-center">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                            <div className="px-4 py-5 flex-auto">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-violet-500">
                                                    <i className="fas fa-retweet"></i>
                                                </div>
                                                <h6 className="text-xl font-semibold">
                                                    Tabla de usuarios
                                                </h6>
                                                <p className="mt-2 mb-4 text-blueGray-500">
                                                    Puedes visualizar todos los usuarios registrados en el
                                                    sistema.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                            <div className="px-4 py-5 flex-auto">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                                    <i className="fas fa-fingerprint"></i>
                                                </div>
                                                <h6 className="text-xl font-semibold">
                                                    Detalles de Usuario
                                                </h6>
                                                <p className="mt-2 mb-4 text-blueGray-500">
                                                    Puedes ver a detalle los datos de los usuarios.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <Footer />
                </>
            )}
        </>
    );
};
