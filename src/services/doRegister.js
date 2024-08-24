import axios from "axios";
import Swal from "sweetalert2";

/**
 * Función doRegister
 * 
 * Esta función maneja el proceso de registro de un nuevo usuario. Realiza una solicitud POST 
 * a un endpoint para crear un usuario con los datos proporcionados. Si el registro es exitoso, 
 * retorna los datos del usuario creado. En caso de error o si el registro falla, se muestra 
 * una alerta utilizando SweetAlert2.
 * 
 * @param {string} email - El correo electrónico del usuario que se desea registrar.
 * @param {string} password - La contraseña del usuario que se desea registrar.
 * @param {string} nombre - El nombre completo del usuario.
 * @param {string} id_admin - El ID del administrador que está registrando al usuario.
 * @returns {object|undefined} Los datos del usuario registrado o `undefined` en caso de error.
 */
export const doRegister = async (email, password, nombre, id_admin) => {
    let obj = {email, password, nombre, id_admin}; // Crea un objeto con los datos del usuario a registrar
    // console.log(obj); // Descomentar para depuración

    try {
        // Realiza la solicitud para registrar un nuevo usuario
        const userRegister = await axios.post(
            `https://backend-users.up.railway.app/users/create`,
            obj 
        );

        // Si el registro es exitoso, retorna los datos del usuario registrado
        if (userRegister.data.user?.nombre) {
            return userRegister.data.user;
        } else {
            // Muestra una alerta en caso de que el registro falle
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error al crear usuario",
                text: "Error al crear el usuario, intentalo nuevamente",
                timer: 3000,
            });
        }
    } catch (error) {
        // Maneja cualquier error durante el proceso de registro
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Hubo un problema con el servidor, por favor intente nuevamente.",
            timer: 3000,
        });
    }
};
