

import axios from "axios";
import Swal from "sweetalert2";

export const getUsers = async () => {
	try {
		const userData = await axios.get(
			`https://backend-users.up.railway.app/users`
		);
		return userData;
	} catch (error) {
		Swal.fire({
            position: "top-end",
            icon: "error",
			title: "Error Interno",
			text: "Tuvimos un error al traer la información de usuario, porfavor contacte al administrador del sistema, " + error,
            timer: 3000
		});

	}
};
