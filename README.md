# Practica Firebase - React Native

Esta es una aplicación de React Native con Expo que utiliza Firebase Realtime Database para almacenar y sincronizar datos de estudiantes en tiempo real.

## Configuración

**IMPORTANTE**: Antes de ejecutar la app, debes configurar tu propia instancia de Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa Realtime Database (modo test para desarrollo)
4. En la configuración del proyecto, obtén tu configuración web
5. Reemplaza las credenciales en `config/firebase.js` con tus propias credenciales

## Instalación

```bash
npm install
```

## Ejecutar la aplicación

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Estructura MVC

- **Model** (`models/StudentModel.js`): Maneja la comunicación con Firebase
- **Controller** (`controllers/StudentController.js`): Lógica de negocio
- **Views** (`views/`): Pantallas de la aplicación
  - `AddStudentView.js`: Captura y graba datos
  - `StudentsListView.js`: Consulta y muestra datos en tiempo real

## Sincronización en tiempo real

Los datos se sincronizan automáticamente entre dispositivos. Al agregar un estudiante en un dispositivo, aparecerá inmediatamente en todos los dispositivos conectados.
