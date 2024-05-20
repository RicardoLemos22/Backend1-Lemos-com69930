import fs from "fs";
const pathFile = "./src/data/carrito.json";
let carro = [];


const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    const cartsPars = JSON.parse(cartsJson);
    carro = cartsPars || [];
};


const createCart = async () => {
    await getCarts();
    const newCart = {
        id: carro.length + 1,
        products: [],
    };

    carro.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carro));
    return newCart;
};


const getCartById = async (cid) => {
    await getCarts();
    const cart = carro.find((c) => c.id === cid);
    return cart;
};


const addProductToCart = async (cid, pid) => {
    await getCarts();
    const product = {
        product: pid,
        quantity: 1,
        };

    const index = carro.findIndex((cart) => cart.id === cid);
    carro[index].products.push(product);

    await fs.promises.writeFile(pathFile, JSON.stringify(carro));

    return carro[index];
};


export default {
    getCarts,
    getCartById,
    addProductToCart,
    createCart,
};
