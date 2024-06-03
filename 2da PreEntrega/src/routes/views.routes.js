import { Router } from "express";
import productManager from "../productManager.js";
//import { io } from "../app.js";

const router = Router();

// render del Home >> http://localhost:8080/
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});

//render de realtimeproducts >> http://localhost:8080/realtimeproducts
router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});

export default router;
