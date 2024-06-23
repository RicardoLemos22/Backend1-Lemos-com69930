import { Router } from "express";
//FS: comento los q usan JSON
//import cartManager from "../dao/fileSystem/cartManager.js";
//import productManager from "../dao/fileSystem/productManager.js";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();


router.post("/", async(req, res) => {
    try {
        //const cart = await cartManager.createCart();
        const cart = await cartDao.create();
        res.status(201).json({ status: "OK", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.get("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        //const cart = await cartManager.getCartById(Number(cid));
        const cart = await cartDao.getById(cid);

        if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado." });

        res.status(200).json({ status: "OK", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.post("/:cid/product/:pid", async(req, res) => {
    try {
        const { cid, pid } = req.params;
        //const product = await productManager.getProductById(Number(pid));
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado." });

        //const cart = await cartManager.addProductToCart(Number(cid), Number(pid));
        const cart = await cartDao.addProductToCart(Number(cid), Number(pid));
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado." });

        res.status(200).json({ status: "OK", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


export default router;