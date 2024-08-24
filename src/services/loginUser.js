import axios from "axios";
import Swal from "sweetalert2";

/**
 * Función loginUser
 * 
 * Esta función maneja el proceso de inicio de sesión de un usuario. Realiza una solicitud GET 
 * para autenticar al usuario utilizando su nombre de usuario y contraseña. Si la autenticación 
 * es exitosa, realiza una segunda solicitud para obtener detalles adicionales del usuario y 
 * almacena estos datos en `localStorage`. En caso de error o si las credenciales no son válidas, 
 * se muestra una alerta utilizando SweetAlert2.
 * 
 * @param {string} user - El nombre de usuario del usuario que intenta iniciar sesión.
 * @param {string} password - La contraseña del usuario que intenta iniciar sesión.
 * @returns {object|undefined} Los detalles del usuario autenticado o `undefined` en caso de error.
 */
export const loginUser = async (user, password) => {
    try {
        // Realiza la solicitud de autenticación utilizando el nombre de usuario y la contraseña
        const userResponse = await axios.get(
            `http://localhost:3000/users?username=${user}&password=${password}`
        );

        // Verifica si la respuesta contiene datos y si el usuario fue encontrado
        if (userResponse?.data?.length > 0) {
            const { id } = userResponse.data[0];  // Extrae el ID del usuario

            // Realiza una segunda solicitud para obtener detalles adicionales del usuario
            const userDetailsResponse = await axios.get(
                `http://localhost:3000/userDetails?id=${id}`
            );

            // Almacena los detalles del usuario en localStorage para uso futuro
            localStorage.setItem("userData", JSON.stringify(userDetailsResponse.data));

            // Retorna los detalles del usuario autenticado
            return userDetailsResponse.data;
        } else {
            // Muestra una alerta si el nombre de usuario o la contraseña son inválidos
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error al iniciar sesión",
                text: "Usuario o contraseña inválidos, intente nuevamente.",
                timer: 3000
            });
        }
    } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso de autenticación
        console.error("Error durante el inicio de sesión:", error);

        // Muestra una alerta en caso de que ocurra un problema con la solicitud al servidor
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Hubo un problema con el servidor, por favor intente nuevamente.",
            timer: 3000
        });
    }
};
