import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../services/getUser";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import LoaderSkeleton from "../../components/Loader/LoaderSkeleton";

/**
 * Componente UserDetail
 *
 * Este componente muestra los detalles de un usuario específico en la aplicación.
 * Se encarga de obtener la información del usuario a partir de su correo electrónico
 * y mostrarla en una interfaz de usuario. Además, maneja la lógica para cargar y
 * mostrar un spinner mientras los datos se obtienen.
 *
 * Props:
 * - updateContextUser: Función para actualizar el contexto del usuario con la información obtenida.
 * - user: Estado del usuario proporcionado por el contexto.
 * - isLoading: Estado que indica si se está realizando una operación de carga.
 * - setIsLoading: Función para actualizar el estado de carga.
 *
 * @param {object} props - Props del componente, incluyendo updateContextUser, user, isLoading y setIsLoading.
 * @returns {JSX.Element} Vista del componente UserDetail.
 */
export const UserDetail = ({
	updateContextUser,
	user,
	isLoading,
	setIsLoading,
}) => {
	/**
	 * Estado para manejar el correo electrónico y los detalles del perfil del usuario.
	 */
	const [email, setEmail] = useState("");
	const [profile, setProfile] = useState("");
	const param = useLocation().pathname.split("/").at(4); // Obtiene el parámetro de email desde la URL.
	const url = useLocation().pathname;
	const nav = useNavigate();

	/**
	 * Función para obtener los detalles de un usuario a partir de su correo electrónico.
	 *
	 * @param {string} email - Correo electrónico del usuario a buscar.
	 */
	const handlerGetUser = async (email) => {
		setIsLoading(true);
		const user = await getUser(email)
			.then((response) => {
				return response;
			})
			.finally(() => setIsLoading(false));

		// Si el usuario es encontrado, se actualiza el perfil, de lo contrario, se muestra una alerta de error.
		if (user.data.status !== 0) {
			setProfile(user);
		} else {
			Swal.fire({
				icon: "error",
				title:
					"No se encontró el usuario con el correo electrónico proporcionado",
				text: "No se encontraron usuarios en el sistema",
				timer: 3000,
				timerProgressBar: true,
			}).then(() => {
				nav("/inicio"); // Redirige al usuario a la página de inicio si no se encuentra el usuario.
			});
		}
	};

	useEffect(() => {
		// Actualiza el contexto del usuario si el ID no está vacío.
		if (user[0]?.id !== "" || user[0]?.id) {
			updateContextUser(user);
		}
		setEmail(param);
		handlerGetUser(param);
	}, []);

	return (
		<>
			<section>
				<div className="relative w-full h-96">
					<img
						className="absolute h-full w-full object-cover object-center"
						src="/assets/saturno.jpg"
						alt="Imagen de fondo"
					/>
					<div className="absolute inset-0 h-full w-full bg-black/50"></div>
					<div className="relative pt-28 text-center">
						{isLoading ? (
							<div className="w-full h-full flex justify-center items-center">
								<Loader />
							</div>
						) : (
							<>
								<h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
									Detalles de usuario
								</h2>
								<p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
									Usuario: {profile?.data?.nombre}
								</p>
							</>
						)}
					</div>
				</div>
				<div className="-mt-16 mb-8 px-8">
					<div className="mx-auto max-w-full">
						<div className="rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200 w-full">
							<div className="h-full">
								<div className="w-full px-4 md:px-32">
									<div className="overflow-x-auto shadow rounded border-b border-gray-200">
										<div className="w-full h-full">
											<div className="h-full flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 items-center justify-center">
												<div className="w-full flex flex-col p-10 2xl:w-2/3">
													{isLoading ? (
														<div className="w-full h-full flex justify-center items-center">
															<LoaderSkeleton />
														</div>
													) : (
														<>
															<button
																className="rounded-3xl w-24 text-sm z-auto mx-5 bg-yellow-600 
                                                                bg-opacity-50 px-2 text-center text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
																onClick={() => nav("/usuarios")}>
																Volver
															</button>
															<div className="flex-1 bg-white rounded-lg shadow-xl p-8 overflow-auto">
																<h4 className="text-xl text-gray-900 font-bold text-center">
																	Información Personal
																</h4>
																<ul className="mt-2 text-gray-700">
																	<li className="flex border-b py-2 flex-wrap flex-1 text-xs lg:text-lg sm:text-sm">
																		<span className="font-bold w-24">ID: </span>
																		<span className="text-gray-700">
																			{profile?.data?.id}
																		</span>
																	</li>
																	<li className="flex border-y py-2 flex-wrap text-xs lg:text-lg sm:text-sm">
																		<span className="font-bold w-24">
																			Nombre:{" "}
																		</span>
																		<span className="text-gray-700">
																			{profile?.data?.nombre}
																		</span>
																	</li>
																	<li className="flex border-b py-2 flex-wrap text-xs lg:text-lg sm:text-sm">
																		<span className="font-bold w-24">
																			Email:{" "}
																		</span>
																		<span className="text-gray-700">
																			{profile?.data?.email}
																		</span>
																	</li>
																	<li className="flex border-b py-2 flex-wrap text-xs lg:text-lg sm:text-sm">
																		<span className="font-bold w-24">Rol:</span>
																		<span className="text-gray-700">
																			{profile?.data?.type === "admin"
																				? "Administrador"
																				: profile?.data?.type === "seller"
																				? "Usuario Final"
																				: profile?.data?.type}
																		</span>
																	</li>
																</ul>
															</div>
														</>
													)}
												</div>
											</div>
										</div>
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
