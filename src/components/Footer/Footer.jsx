import React from "react";

/**
 * Componente Footer
 *
 * Este es un componente funcional sin estado que renderiza el pie de página de la aplicación.
 * El pie de página contiene un bloque de texto con enlaces a recursos externos.
 *
 * @returns {JSX.Element} Código JSX que renderiza el pie de página.
 */
export const Footer = () => {
	return (
		<footer className="relative sm:mt-5 pt-8 xl:mt-1">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap items-center md:justify-between justify-center">
					<div className="w-full md:w-6/12 px-4 mx-auto text-center">
						<div className="text-sm text-blueGray-500 font-semibold py-1">
							{/* Esta sección proporciona créditos y enlaces a sitios externos */}
							Hecho para UseIt{" "}
							<a
								href="https://www.creative-tim.com/product/notus-js"
								className="text-blueGray-500 hover:text-gray-800"
								target="_blank"
								rel="noopener noreferrer">
								BlackHoleApp - Prueba Técnica |
							</a>{" "}
							Por{" "}
							<a
								href="https://www.creative-tim.com"
								className="text-blueGray-500 hover:text-blueGray-800"
								target="_blank"
								rel="noopener noreferrer">
								{" "}
								Daniel Ospina Ramírez
							</a>
							.
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
