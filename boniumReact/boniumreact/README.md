
# Bonium React - Instrucciones para correr el proyecto

## 🚀 Pasos para ejecutar el frontend (solo React)

1. **Requisitos previos**
  - Tener instalado [Node.js](https://nodejs.org/) (recomendado v18+)
  - Tener instalado npm (se incluye con Node.js)

2. **Instalar dependencias**
  - Abre una terminal en la carpeta `boniumReact/boniumreact`
  - Ejecuta:
    ```bash
    npm install
    ```

3. **Iniciar el servidor de desarrollo**
  - En la misma terminal, ejecuta:
    ```bash
    npm run dev
    ```
  - Se mostrará una URL (por ejemplo, `http://localhost:5173/`). Ábrela en tu navegador.

4. **Usuarios de prueba**
  - Puedes usar los siguientes usuarios para ingresar (o crear nuevos desde el panel de admin):
    - **Administrador**: Documento `1001`, Contraseña `admin123`, Rol `admin`
    - **Restaurante**: Documento `2001`, Contraseña `resto123`, Rol `resto`
    - **Colaborador**: Documento `3001`, Contraseña `colab123`, Rol `colab`

5. **Notas**
  - Todos los datos se guardan en el navegador (localStorage). No necesitas backend para probar la app.
  - Si quieres restablecer los datos, borra el localStorage desde las herramientas del navegador.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Bonium React - Notas de acceso de usuarios

**NOTA:** El login y los usuarios de prueba ahora funcionan solo con número de documento y contraseña, y se validan contra los usuarios almacenados en localStorage (clave: `usuariosBonium`). El admin puede crear usuarios desde el panel de administración.

## Ejemplos de usuarios de prueba

Puedes ingresar con los siguientes datos de ejemplo (si no existen, créalos desde el panel de admin):

- **Administrador**
  - Documento: `1001`
  - Contraseña: `admin123`
  - Rol: `admin`

- **Restaurante**
  - Documento: `2001`
  - Contraseña: `resto123`
  - Rol: `resto`

- **Colaborador**
  - Documento: `3001`
  - Contraseña: `colab123`
  - Rol: `colab`

Puedes crear más usuarios con el panel de administración. Si olvidas la contraseña, puedes actualizarla desde la opción de crear usuario (ingresando el mismo documento y nueva contraseña).
