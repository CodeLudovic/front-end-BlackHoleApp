# ![BlackHoleApp Icon](public/images/blackhole.ico) BlackHoleApp - Prueba Técnica

Este proyecto es una aplicación de administración de usuarios construida con React y Vite. Está diseñado para facilitar la autenticación, el registro y la gestión de usuarios. La aplicación utiliza una API backend para manejar las operaciones de usuario y está optimizada para un rendimiento rápido con Vite.

## Características

- **Registro de usuarios**: Permite a los usuarios registrarse con su correo electrónico y contraseña.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión en la aplicación.
- **Gestión de usuarios**: Los usuarios autenticados pueden ver y gestionar los detalles de otros usuarios.
- **Carga y feedback visual**: Uso de loaders personalizados y SweetAlert para proporcionar una experiencia de usuario fluida.
- **Diseño responsivo**: La aplicación está diseñada para ser responsiva y se adapta a diferentes tamaños de pantalla.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js**: Versión 14 o superior
- **npm** o **yarn**: Para la gestión de dependencias

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/CodeLudovic/front-end-BlackHoleApp.git

2. **Navega al directorio del proyecto**:
   ```bash
   cd front-end-BlackHoleApp

3. **Instala las dependencias**:
   ```bash
   npm install o yarn install

4. **Ejecuta el proyecto**:
   ```bash
   npm run dev

5. **Filesystem usado en el proyecto**:
    ```bash
        .
    ├── public                  # Archivos estáticos como imágenes
    ├── src                     # Código fuente de la aplicación
    │   ├── components          # Componentes reutilizables
    │   ├── context             # Contextos de React para la gestión del estado global
    │   ├── services            # Servicios para llamadas API
    │   ├── views               # Páginas o vistas de la aplicación
    │   ├── App.jsx             # Componente raíz de la aplicación
    │   ├── main.jsx            # Punto de entrada principal
    │   └── index.css           # Estilos globales
    ├── db.json                 # Archivo con base datos (Adicional: el proyecto cuenta con su backend desplegado no es necesario usar este archivo con json-server).
    ├── eslint.config.js        # Archivo de configuración del linter.
    ├── index.html              # Archivo raiz del proyecto en html.
    ├── package-lock.json       # Dependencias y scripts del proyecto
    ├── package.json            # Dependencias y scripts del proyecto
    ├── postcss.config.js       # Configuración de preprocesador de css
    ├── README.md               # Archivo con indicaciones y rasgos importantes de la prueba.
    ├── tailwind.config.js      # Configuración de Tailwind y clases personalizadas.
    └── vite.config.js          # Documentación del proyecto
