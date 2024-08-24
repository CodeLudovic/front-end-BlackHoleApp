import React from "react";

/**
 * Componente Loader
 * 
 * Este componente muestra un indicador de carga animado, que es útil para indicar al usuario 
 * que un proceso o carga de datos está en curso. El componente permite personalizar su 
 * posición y estilo mediante la prop `styling`.
 * 
 * Props:
 * - styling: Una cadena que contiene clases CSS adicionales para personalizar el estilo y 
 *   la posición del contenedor del loader.
 * 
 * @param {object} props - Las propiedades recibidas por el componente, incluyendo `styling`.
 * @returns {JSX.Element} Un contenedor con un indicador de carga animado.
 */
const Loader = ({styling}) => {
	return (
		<div className={`fixed items-center flex-row justify-center bg-opacity-35 sm:w-1/1 xxs:w-full rounded-xl ${styling}`}>
			<div className="flex flex-col items-center justify-center">
				<div className="loader"></div>
				<p className="loader2 pt-5"></p>
			</div>
		</div>
	);
};

export default Loader;
