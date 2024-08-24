import axios from "axios";
import Swal from "sweetalert2";

/**
 * Función getUser
 * 
 * Esta función se encarga de obtener la información de un usuario específico a partir 
 * de su correo electrónico. Realiza una solicitud GET a un endpoint que retorna los 
 * datos del usuario. En caso de que ocurra un error durante la solicitud, se muestra 
 * una alerta utilizando SweetAlert2.
 * 
 * @param {string} email - El correo electrónico del usuario cuya información se desea obtener.
 * @returns {object|undefined} Los datos del usuario obtenidos o `undefined` en caso de error.
 */
export const getUser = async (email) => {
    try {
        // Realiza la solicitud GET para obtener los datos del usuario
        const userData = await axios.get(
            `https://backend-users.up.railway.app/users?email=${email}`
        );
        return userData.data.data;
    } catch (error) {
        // Maneja cualquier error durante la solicitud y muestra una alerta
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error Interno",
            text: "Tuvimos un error al traer la información de usuario, por favor contacte al administrador del sistema. " + error,
            timer: 3000
        });
    }
};
