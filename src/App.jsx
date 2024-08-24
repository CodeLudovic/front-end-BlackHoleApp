/* eslint-disable */

import { useState, useEffect, useContext } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { Topbar } from "./components/NavBar/TopBar";
import { Login } from "./views/Login/Login";
import { AuthContext } from "./context/AuthContext";
import { Home } from "./views/Home/Home";
import { Users } from "./views/Users/Users";
import { UserDetail } from "./views/UserDetail/UserDetail";
import { Register } from "./views/Registration/Register";

/**
 * Componente App
 *
 * Este es el componente principal de la aplicación que gestiona la navegación y el estado global
 * del usuario. La aplicación está estructurada en rutas protegidas y públicas. Si el usuario está
 * autenticado, puede acceder a las rutas protegidas, como el inicio y la lista de usuarios; de lo
 * contrario, es redirigido a la página de inicio de sesión.
 *
 * @returns {JSX.Element} La estructura de la aplicación con rutas y gestión del estado de autenticación.
 */
function App() {
	/**
	 * Estados para manejar la carga inicial, el usuario autenticado, y el estado del sidebar.
	 */
	const [loading, setLoading] = useState(false);
	const { logout } = useContext(AuthContext);
	const [user, setUser] = useState({
		id: "",
		name: "",
		mail: "",
	});
	const location = useLocation();
	const session = JSON.parse(localStorage.getItem("userData"));

	const [isCollapsed, setIsCollapsed] = useState(false);
	const navigate = useNavigate();

	const log = session ? true : false;

	/**
	 * Función para actualizar el contexto del usuario con nueva información.
	 *
	 * @param {object} newUser - Información del usuario actualizada.
	 */
	const updateContextUser = (newUser) => {
		setUser(newUser);
	};

	useEffect(() => {
		// Redirige al usuario autenticado a la página de inicio si se encuentra en la raíz.
		if (log && location.pathname === "/") {
			navigate("/inicio");
		}
	}, [log]);

	return (
		<div>
			{log ? (
				// Estructura de la aplicación para usuarios autenticados
				<div className="flex flex-row min-h-screen">
					<div className="flex flex-col w-3/4 flex-1 xl:w-full">
						<main className="content">
							<Topbar
								isCollapsed={isCollapsed}
								setIsCollapsed={setIsCollapsed}
								user={user}
								logout={logout}
							/>
							<Routes>
								<Route
									path="/inicio"
									element={
										<Home
											updateContextUser={updateContextUser}
											user={session}
											isLoading={loading}
											setIsLoading={setLoading}
										/>
									}
								/>
								<Route
									path="/usuarios"
									element={
										<Users
											updateContextUser={updateContextUser}
											user={session}
											isLoading={loading}
											setIsLoading={setLoading}
										/>
									}
								/>
								<Route
									path="/usuarios/detalles/usuario/:id"
									element={
										<UserDetail
											updateContextUser={updateContextUser}
											user={session}
											isLoading={loading}
											setIsLoading={setLoading}
										/>
									}
								/>
								<Route path="*" element={<Navigate to="/inicio" />} />
							</Routes>
						</main>
					</div>
				</div>
			) : (
				// Estructura de la aplicación para usuarios no autenticados
				<Routes>
					<Route
						path="/login"
						element={<Login isLoading={loading} setIsLoading={setLoading} />}
					/>
					<Route
						path="/registro"
						element={<Register isLoading={loading} setIsLoading={setLoading} />}
					/>
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
