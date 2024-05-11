// Importación de módulos necesarios
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Configuración de variables de entorno

// Conexión a la base de datos
const { connect } = require("./src/utils/db");
connect();

// Configuración de Cloudinary para manejo de archivos
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

const PORT = process.env.PORT;

// Creación del servidor Express
const app = express();

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// Configuración de limitaciones en el tamaño de las solicitudes
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

// Definición de rutas para diferentes recursos
const UserRoutes = require("./src/api/routes/User.routes");
const CityRoutes = require("./src/api/routes/City.routes");
const EstablishmentRoutes = require("./src/api/routes/Establishment.routes");
const EventRoutes = require("./src/api/routes/Event.routes");
const OrganizationRoutes = require("./src/api/routes/Organization.routes");

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/cities", CityRoutes);
app.use("/api/v1/establishments", EstablishmentRoutes);
app.use("/api/v1/events", EventRoutes);
app.use("/api/v1/organizations", OrganizationRoutes);

// Middleware para manejar rutas no encontradas
app.use("*", (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  return next(error);
});

// Middleware para manejar errores
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Error inesperado");
});

// Deshabilitar la revelación de tecnologías en las cabeceras
app.disable("x-powered-by");

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
