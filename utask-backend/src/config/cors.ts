import type { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    // Permitir Postman en desarrollo
    if (process.env.NODE_ENV === "development" && !origin) {
      return callback(null, true);
    }

    const whitelist = [process.env.WEB_CLIENT];

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
