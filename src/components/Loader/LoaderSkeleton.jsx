import React from "react";

/**
 * Componente LoaderSkeleton
 * 
 * Este componente es un indicador de carga visual que se muestra mientras los datos o el contenido 
 * principal de la página están siendo cargados. El componente utiliza una estructura simple para 
 * centrar el indicador de carga en la pantalla.
 * 
 * @returns {JSX.Element} Un contenedor que muestra el indicador de carga.
 */
const LoaderSkeleton = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<p className="loader3"></p>
		</div>
	);
};

export default LoaderSkeleton;
