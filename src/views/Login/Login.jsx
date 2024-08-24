/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { loginUser } from "../../services/loginUser";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { doLogin } from "../../services/doLogin";
import Loader from "../../components/Loader/Loader";

/**
 * Componente Login
 *
 * Este componente representa la vista de inicio de sesión para la aplicación.
 * Permite a los usuarios ingresar sus credenciales (nombre de usuario y contraseña)
 * para autenticar su acceso a la aplicación. Incluye funcionalidad de manejo de errores
 * y feedback al usuario.
 *
 * Props:
 * - isLoading: Estado que indica si se está realizando una operación de carga.
 * - setIsLoading: Función para actualizar el estado de carga.
 *
 * @param {object} props - Props del componente, incluyendo isLoading y setIsLoading.
 * @returns {JSX.Element} Vista del componente Login.
 */
export const Login = ({ isLoading, setIsLoading }) => {
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
		setIsLoading(false);
	}, [log]);

	/**
	 * Estados para manejar los valores de los inputs y errores del formulario de login.
	 */
	const [username, setUserName] = useState(null);
	const [password, setPassword] = useState(null);
	const [errors, setErrors] = useState("");

	/**
	 * Función asincrónica para manejar el proceso de inicio de sesión.
	 *
	 * @param {event} e - Evento de formulario.
	 * @param {string} _user - Nombre de usuario ingresado.
	 * @param {string} _pass - Contraseña ingresada.
	 *
	 * La función valida que ambos campos estén completos, luego llama a la función
	 * doLogin() que se encarga de realizar la petición al backend para autenticar
	 * al usuario. Muestra mensajes de error en caso de que la autenticación falle.
	 */
	const handleLogin = async (e, _user, _pass) => {
		setIsLoading(true);
		e.preventDefault();
		if (!_user || !_pass) {
			// Muestra una alerta de error si los campos están vacíos.
			Swal.fire({
				icon: "error",
				title: "Error al iniciar sesión",
				text: "Debes ingresar los datos para iniciar sesión",
				timer: 2000,
				showCloseButton: false,
				showConfirmButton: false,
				timerProgressBar: true,
				customClass: {
					popup: "xxs:width-2/5 md:width-2/5 xs:width-2/5 lg:text-lg",
					title:
						"xxs:text-xs md:text-md xs:text-sm xl:text-xl lg:text-lg font-bold text-red-400",
					icon: "xxs:text-xs md:text-md xs:text-xxs xl:text-lg lg:text-lg text-red-400",
					htmlContainer:
						"xs:text-xs md:text-md xxs:text-xs xl:text-xl lg:text-lg",
					timerProgressBar: "bg-red-400",
				},
			});
			setErrors("Ingresa usuario y contraseña");
			setIsLoading(false);
		} else {
			// Intenta realizar el login llamando a doLogin()
			await doLogin(_user, _pass)
				.then((response) => {
					return response;
				})
				.then((result) => {
					if (Object.keys(result).length > 0) {
						setErrors("");
						login(true, result[0]); // Establece el estado de autenticación.
						navigate("/inicio"); // Redirige al usuario a la página de inicio.
					} else {
						Swal.fire({
							icon: "error",
							title: "Error al iniciar sesión",
							text: "Usuario y/o contraseña incorrectos, por favor intente nuevamente.",
							timer: 2000,
							showCloseButton: false,
							showConfirmButton: false,
							timerProgressBar: true,
							customClass: {
								popup: "xxs:width-2/5 md:width-2/5 xs:width-2/5 lg:text-lg",
								title:
									"xxs:text-xs md:text-md xs:text-sm xl:text-xl lg:text-lg font-bold text-red-400",
								icon: "xxs:text-xs md:text-md xs:text-xxs xl:text-lg lg:text-lg text-red-400",
								htmlContainer:
									"xs:text-xs md:text-md xxs:text-xs xl:text-xl lg:text-lg",
								timerProgressBar: "bg-red-400",
							},
						});
						setErrors("Contraseña y/o Usuario Incorrectos");
					}
				})
				.finally(setIsLoading(false));
		}
	};

	/**
	 * Renderizado de la vista del componente Login.
	 * Muestra un formulario de inicio de sesión o un loader dependiendo del estado de carga.
	 *
	 * Estilos aplicados: TailwindCSS
	 */
	return (
		<>
			{isLoading ? (
				<div className="relative w-full h-screen">
					<img
						className="absolute h-full w-full object-cover object-center"
						src="/assets/bg-login.webp"
						alt="nature image"
					/>
					<div className="absolute inset-0 bg-black/40">
						<div className="relative w-full h-full flex justify-center items-center">
							<Loader styling={"top-25"} />
						</div>
					</div>
				</div>
			) : (
				<div
					className="flex h-screen w-screen items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: "url('/assets/bg-login.webp')",
					}}>
					<div className="rounded-xl bg-gray-800 bg-opacity-50 xl:px-10 xl:py-5 shadow-lg backdrop-blur-md py-5 text-xs:px-4">
						<div className="flex flex-col items-center justify-center text-white">
							<div className="mb-8 flex flex-col items-center">
								<img
									src="/assets/users_network.png"
									width="60"
									alt=""
									srcSet=""
								/>
								<h1 className="mb-2 text-xl mt-2">BlackHole App</h1>
								<h3 className="mb-2">Prueba Técnica</h3>
								<span className="text-gray-300">Login</span>
							</div>
							<form action="#">
								<div className="mb-4 text-lg">
									<input
										className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
										type="text"
										id="username"
										name="username"
										placeholder="Email"
										onChange={(e) => setUserName(e.target.value)}
									/>
								</div>

								<div className="mb-4 text-lg">
									<input
										className={`rounded-3xl px-6 py-2 text-center text-inherit placeholder-gray-200 placeholder-opacity-50 shadow-lg outline-none backdrop-blur-md bg-yellow-400 bg-opacity-50
                                    ${errors ? "border-2 border-red-400" : ""}`}
										id="password"
										type="Password"
										name="password"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								{errors.length > 0 ? (
									<p className="text-red-400 text-center">{errors}</p>
								) : null}
								<div className="mt-8 flex flex-col justify-center items-center text-lg text-black">
									<button
										type="submit"
										className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
										onClick={(e) => handleLogin(e, username, password)}>
										Login
									</button>
									<div className="flex flex-row justify-center items-center mt-5">
										<p className="text-white">Si no tienes cuenta,&nbsp;</p>
										<Link
											to={"/registro"}
											className="rounded-3xl w-24 text-sm bg-yellow-400 bg-opacity-50 px-2 text-center text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">
											Registrate
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
