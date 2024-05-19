import express from "express";
import rutas from "./routes/index.routes.js";
// import __dirname from "./dirname.js"

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static",express.static("public"));

//mis Rutas
app.use("/api", rutas);


app.listen(PORT, () => {
  console.log(`El servidor ahora esta escuchando en el puerto ${PORT}`);
});
