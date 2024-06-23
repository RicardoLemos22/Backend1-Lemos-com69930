import mongoose from "mongoose"

export const connectMongoDB = async() => {
    try {
        mongoose.connect("mongodb+srv://richard:3729@cluster0.c17bgbx.mongodb.net/pflemos")

        console.log("Servidor local conectado al servicio MongoDB");

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}