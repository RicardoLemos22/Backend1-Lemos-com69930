import express from "express";
import rutas from "./routes/index.routes.js";
import __dirname from "./dirname.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import productManager from "./productManager.js";

const PORT = 8081;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//2da entrega
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//mis Rutas
app.use("/api", rutas);


//mis Vistas
app.use("/", viewsRoutes);


const httpServer = app.listen(PORT, () => {
  console.log(`El servidor ahora esta escuchando en el puerto ${PORT}.`);
});


//configuro el Socket
export const io = new Server(httpServer);

io.on("connection", async socket => {
  console.log("Un nuevo usuario se ha conectado al servidor.");
  const products = await productManager.getProducts();
  io.emit("products", products );
});