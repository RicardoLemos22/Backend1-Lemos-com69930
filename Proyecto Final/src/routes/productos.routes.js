import { Router } from "express";
import { verif_InfoProducto } from "../middlewares/verif_InfoProducto.middleware.js";
//FS: comento los q usan JSON
//import productManager from "../dao/fileSystem/productManager.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();


router.get("/", async(req, res) => {
    try {
        //const { limit } = req.query;
        //const products = await productManager.getProducts(limit);
        const products = await productDao.getAll();
        res.status(200).json({ status: "OK", products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.get("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        //const product = await productManager.getProductById(Number(pid));
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.post("/", verif_InfoProducto, async(req, res) => {
    try {
        const body = req.body;
        //const product = await productManager.addProduct(body);
        const product = await productDao.create(body)

        res.status(201).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.put("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body
        //const product = await productManager.updateProduct(Number(pid), body);
        const product = await productDao.update(pid, body);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


router.delete("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        //const product = await productManager.deleteProduct(Number(pid));
        const product = await productDao.deleteOne(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "OK", msg: `El producto con el ID ${pid} ha sido eliminado` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


export default router;