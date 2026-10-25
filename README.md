<div align="center">

# 🎬 Movies App

Tu próxima gran historia empieza aquí. Explora estrenos, descubre películas populares y conoce a su reparto.
Una aplicación móvil creada con React Native, Expo y datos de TMDB.

![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

</div>

## 📱 La aplicación

Consulta películas en cartelera, revisa selecciones populares y mejor calificadas, y abre cada título para ver su descripción y reparto.

### Capturas de la app

Capturas reales en el simulador de iPhone: una interfaz oscura con acentos dorados, cartelera destacada y fichas de película con sinopsis y reparto.

<table>
  <tr>
    <th>Descubre tu próxima película</th>
    <th>Cada historia, en detalle</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/inicio.png" alt="Inicio con diseño oscuro, cartelera destacada y películas populares" width="320" /></td>
    <td><img src="docs/screenshots/detalle.png" alt="Ficha de Spider-Man: Un nuevo día con póster, valoración, duración y sinopsis" width="320" /></td>
  </tr>
</table>

## ✨ Funcionalidades

- 🎞️ Carrusel de películas actualmente en cartelera.
- 🔥 Sección de películas populares.
- ⭐ Listado paginado de películas mejor calificadas.
- 📅 Próximos estrenos.
- 🎭 Detalle de cada película con descripción, calificación y reparto.
- ✨ Diseño de cine con fondo oscuro, acentos dorados y tarjetas con título, año y valoración.
- 🧭 Filtros por populares, mejor valoradas y próximos estrenos.
- 🔄 Actualización al deslizar y estados de carga y error con opción de reintentar.
- 📱 Interfaz para Android, iOS y web.

## 🧰 Tecnologías

| Tecnología | Uso |
| --- | --- |
| [React Native](https://reactnative.dev/) | Interfaz móvil multiplataforma |
| [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/) y [Expo Router](https://docs.expo.dev/versions/v54.0.0/sdk/router/) | Herramientas y navegación por archivos |
| [TypeScript](https://www.typescriptlang.org/) | Tipado del proyecto |
| [NativeWind](https://www.nativewind.dev/) | Estilos con clases de utilidad |
| [Axios](https://axios-http.com/) | Solicitudes a la API |
| [TMDB](https://developer.themoviedb.org/docs) | Catálogo de películas y reparto |

## 🚀 Instalación

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS) y npm.
- [Expo Go](https://expo.dev/go) en un teléfono o un emulador.
- Una clave de API de [TMDB](https://www.themoviedb.org/settings/api).

### Pasos

1. Clona el repositorio y entra en la carpeta:

   ```bash
   git clone https://github.com/albinrk10/MoviesAppExpo.git
   cd MoviesAppExpo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia `.env.template` como `.env` y agrega tu clave de TMDB. La plantilla ya contiene la URL base necesaria:

   ```env
   EXPO_PUBLIC_MOVIE_DB_URL=https://api.themoviedb.org/3/movie
   EXPO_PUBLIC_MOVIE_DB_KEY=tu_clave_de_tmdb
   ```

4. Inicia Expo:

   ```bash
   npx expo start
   ```

Escanea el código QR con Expo Go. También puedes presionar `a` para Android, `i` para iOS o `w` para abrir la app web.

### iOS con Xcode 27

Xcode 27 reemplaza Simulator por Device Hub. El script `postinstall` aplica una corrección de compatibilidad a la CLI de Expo SDK 54 para detectar Device Hub y abrir el dispositivo mediante `devices://`. Se conserva el funcionamiento habitual con versiones anteriores de Xcode.

Si instalaste dependencias con `--ignore-scripts`, ejecuta `npm run postinstall` antes de `npm run ios`. Esta corrección es para el inicio del simulador con Expo Go; no actualiza el SDK ni adapta las compilaciones nativas a Xcode 27.

## 📁 Estructura del proyecto

```text
src/
  app/               Pantallas y rutas de Expo Router
    home/            Catálogo principal
    movie/           Detalle de película
  core/              API y acciones de datos
  domain/            Modelos propios de la app
    entities/        Movie, CompleteMovie y Cast
  infrastructure/    Respuestas y mapeadores de TMDB
  presentation/      Componentes y hooks de interfaz
  config/            Utilidades de configuración
  global.css         Estilos globales de NativeWind
assets/              Iconos e imágenes
```

### Capa domain: ejemplo básico

`domain/entities` define los datos que necesita la app: `Movie`, `CompleteMovie` y `Cast`. Son interfaces de TypeScript sin dependencias de React, Expo, Axios ni TMDB.

- `infrastructure/interfaces` describe las respuestas de TMDB (por ejemplo, `overview` y `poster_path`).
- `infrastructure/mappers` transforma esas respuestas en entidades del dominio (como `description` y `poster`).
- `core/actions` consulta la API y devuelve las entidades transformadas.
- `presentation` usa esas entidades para mostrar la información.

Por ejemplo: TMDB devuelve `overview`, el `MovieMapper` lo convierte en `Movie.description` y la interfaz muestra la descripción. Así se separa el formato externo del modelo que usa la app.

## 🔐 Clave de TMDB

La clave se configura en `.env`, que está excluido de Git. No publiques ese archivo ni incluyas tu clave en capturas o commits. Usa `.env.template` como referencia para la configuración.

## 📜 Comandos

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Inicia Expo para Android |
| `npm run ios` | Inicia Expo para iOS |
| `npm run web` | Inicia la versión web |
| `npm run lint` | Revisa el código con ESLint |

## 👨‍💻 Autor

Creado por [@albinrk10](https://github.com/albinrk10).
