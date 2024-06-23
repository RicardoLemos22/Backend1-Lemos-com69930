import { request, response } from "express";
import productManager from "../dao/fileSystem/productManager.js";


export const verif_InfoProducto = async(req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category
        };

        const products = await productManager.getProducts();
        const productExists = products.find((p) => p.code === code);
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya se ha agregado.` });

        const checkData = Object.values(newProduct).includes(undefined);
        if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos del producto son de ingreso obligatorio." });

        next(); // continuo a la ejecución de mi endpoint

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
};