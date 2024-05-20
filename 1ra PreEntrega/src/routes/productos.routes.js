import { Router } from "express";
import productManager from "../productManager.js";
import {verif_InfoProducto} from "../middlewares/verif_InfoProducto.middleware.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).json({ status: "OK", products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.post("/", verif_InfoProducto, async (req, res) => {
    try {
        const body = req.body;
        const product = await productManager.addProduct(body);

        res.status(201).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body
        const product = await productManager.updateProduct(Number(pid), body);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.delete("/:pid", async (req, res) => {
    try {
        const {pid} = req.params;
        const product = await productManager.deleteProduct(Number(pid));
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", msg: `El producto con el ID ${pid} ha sido eliminado` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


export default router;
