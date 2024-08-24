import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/getUsers";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import LoaderSkeleton from "../../components/Loader/LoaderSkeleton";

/**
 * Componente Users
 * 
 * Este componente muestra una lista de usuarios del sistema. Permite navegar a través de las páginas
 * de usuarios y proporciona enlaces a los detalles de cada usuario. También maneja el estado de carga 
 * y muestra un spinner mientras los datos están siendo obtenidos del servidor.
 * 
 * Props:
 * - updateContextUser: Función para actualizar el contexto del usuario con la información obtenida.
 * - user: Estado del usuario proporcionado por el contexto.
 * - isLoading: Estado que indica si se está realizando una operación de carga.
 * - setIsLoading: Función para actualizar el estado de carga.
 * 
 * @param {object} props - Props del componente, incluyendo updateContextUser, user, isLoading y setIsLoading.
 * @returns {JSX.Element} Vista del componente Users.
 */
export const Users = ({ updateContextUser, user, isLoading, setIsLoading }) => {

    /**
     * Estados para manejar la lista de usuarios, la copia de seguridad de usuarios y la paginación.
     */
    const [users, setUsers] = useState([]);
    const [usersBk, setUsersBk] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Número de usuarios por página.

    /**
     * Función para obtener la lista de usuarios desde el servidor.
     * 
     * Si se encuentran usuarios, se guardan en el estado; si no, se muestra una alerta de error.
     */
    const handleGetUsers = async () => {
        setIsLoading(true);
        try {
            const users = await getUsers()
                .then((response) => {
                    return response;
                })
                .finally(() => setIsLoading(false));
            if (users.data.users?.length > 0) {
                setUsers(users.data.users);
                return users;
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "No se encontraron usuarios",
                    text: "No se encontraron usuarios en el sistema",
                    timer: 3000,
                });
            }
            return users;
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error Interno",
                text: "Tuvimos un error al traer la información de usuarios, por favor contacte al administrador del sistema. " + error,
                timer: 3000,
            });
        }
    };

    useEffect(() => {
        // Llamar a la función de obtener usuarios sólo si no hay usuarios cargados
        if (users.length === 0) {
            handleGetUsers().then((fetchedUsers) => {
                if (fetchedUsers) {
                    setUsersBk(fetchedUsers.data); // Asegurando que se guarde la copia de seguridad correctamente
                }
            });
        }
        // Actualizar el contexto del usuario sólo si el ID es válido
        if (user.id) {
            updateContextUser(user);
        }
    }, [users.length]);

    // Calcular los usuarios a mostrar en la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <section>
                <div className="relative w-full h-96">
                    <img
                        className="absolute h-full w-full object-cover object-center"
                        src="/assets/earth.jpg"
                        alt="Imagen de fondo"
                    />
                    <div className="absolute inset-0 h-full w-full bg-black/50"></div>
                    <div className="relative pt-28 text-center">
                        {isLoading ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Loader styling={"top-25"} />
                            </div>
                        ) : (
                            <>
                                <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
                                    Listado de usuarios
                                </h2>
                                <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                                    En este módulo puedes ver todos los usuarios del sistema
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <div className="-mt-16 mb-8 px-8">
                    <div className="mx-auto">
                        <div className="py-12 rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200 xs:w-full sm:w-full md:w-full lg:w-full xl:w-full">
                            <div className="h-full">
                                <div className="xs:w-full sm:w-full md:w-full xl:w-full lg:w-full px-4 md:px-32 py-8">
                                    <div className="overflow-x-auto shadow rounded border-b border-gray-200">
                                        {isLoading ? (
                                            <div className="w-full h-full flex justify-center items-center">
                                                <LoaderSkeleton />
                                            </div>
                                        ) : (
                                            <>
                                                <table className="min-w-full bg-white">
                                                    <thead className="bg-gray-800 text-white">
                                                        <tr>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                ID
                                                            </th>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                Nombre
                                                            </th>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                Apellido
                                                            </th>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                Email
                                                            </th>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                Rol
                                                            </th>
                                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                                                Acciones
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-700">
                                                        {currentUsers.map((element, index) => {
                                                            const [nombre, apellido] =
                                                                element.nombre.split(" ");
                                                            return (
                                                                <tr
                                                                    key={element.id}
                                                                    className={
                                                                        index % 2 === 0 ? "" : "bg-gray-100"
                                                                    }>
                                                                    <td className="w-1/6 text-left py-3 px-4">
                                                                        {element.id}
                                                                    </td>
                                                                    <td className="w-1/6 text-left py-3 px-4">
                                                                        {nombre}
                                                                    </td>
                                                                    <td className="w-1/6  text-left py-3 px-4">
                                                                        {apellido}
                                                                    </td>
                                                                    <td className="w-1/5 text-left py-3 px-4">
                                                                        <a
                                                                            className="hover:text-blue-500"
                                                                            href={`mailto:${element.email}`}>
                                                                            {element.email}
                                                                        </a>
                                                                    </td>
                                                                    <td className="w-2/3 text-left py-3 px-4">
                                                                        <p className="hover:text-blue-500">
                                                                            {element.type}
                                                                        </p>
                                                                    </td>
                                                                    <td className="w-2/3 text-left py-3 px-4">
                                                                        <Link
                                                                            to={`/usuarios/detalles/usuario/${element.email}`}
                                                                            className="text-white hover:text-green-400 bg-gray-700 p-2 rounded-lg">
                                                                            Detalles
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                {/* Paginación */}
                                                <div className="flex justify-center mt-4 rounded-lg">
                                                    {Array.from(
                                                        { length: Math.ceil(users.length / usersPerPage) },
                                                        (_, index) => (
                                                            <button
                                                                key={index + 1}
                                                                onClick={() => paginate(index + 1)}
                                                                className={` mb-3 rounded-lg px-4 py-2 mx-1 border ${
                                                                    currentPage === index + 1
                                                                        ? "bg-gray-800 text-white"
                                                                        : "bg-white  text-gray-800"
                                                                }`}>
                                                                {index + 1}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
