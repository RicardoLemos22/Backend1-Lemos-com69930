import { Router } from "express";
import productManager from "../productManager.js";
//import { io } from "../app.js";

const router = Router();

// render Home
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


export default router;
