<<<<<<< HEAD
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {};
=======
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artiefy-upload.s3.us-east-2.amazonaws.com',
        pathname: '/**', // Permite todos los archivos del bucket
      },
    ],
  },
};
>>>>>>> origin/main

export default config;
