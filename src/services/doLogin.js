import axios from "axios";
import Swal from "sweetalert2";

/**
 * Función doLogin
 * 
 * Esta función maneja el proceso de inicio de sesión de un usuario. Realiza una solicitud GET a 
 * un endpoint de autenticación con el email y la contraseña proporcionados. Si la autenticación 
 * es exitosa, se realiza una segunda solicitud para obtener los detalles del usuario y se 
 * almacenan en `localStorage`. En caso de error o si las credenciales no son válidas, se muestra 
 * una alerta utilizando SweetAlert2.
 * 
 * @param {string} email - El correo electrónico del usuario que intenta iniciar sesión.
 * @param {string} password - La contraseña del usuario que intenta iniciar sesión.
 * @returns {object|undefined} Los datos del usuario autenticado o `undefined` en caso de error.
 */
export const doLogin = async (email, password) => {
    try {
        // Realiza la solicitud de autenticación
        const userResponse = await axios.get(
            `https://backend-users.up.railway.app/auth/login?email=${email}&password=${password}`
        );

        // Si la autenticación es exitosa, realiza la solicitud para obtener los detalles del usuario
        if (userResponse.data?.data) {
            const { email } = userResponse.data.data;
            const userDetailsResponse = await axios.get(
                `https://backend-users.up.railway.app/users?email=${email}`
            );

            // Almacena los datos del usuario en localStorage
            localStorage.setItem("userData", JSON.stringify(userDetailsResponse.data.data.data));
            return userDetailsResponse.data.data.data;
        } else {
            // Muestra una alerta en caso de credenciales inválidas
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error al iniciar sesión",
                text: "Usuario o contraseña inválidos, intente nuevamente.",
                timer: 3000
            });
        }
    } catch (error) {
        // Maneja cualquier error durante el proceso de inicio de sesión
        console.error("Error durante el inicio de sesión:", error);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Usuario o contraseña inválidos, intente nuevamente.",
            timer: 3000
        });
    }
};
