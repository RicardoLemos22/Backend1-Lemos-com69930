import mongoose from "mongoose"

// Configuración del string de conexión a mi BD llamada: pflemos
// hay que reemplazar "<user>:<password>" con las credenciales 
// provistas en el comentario de la entrega de la plataforma.

export const conectarMongoDB = async() => {
    try {
        mongoose.connect("mongodb+srv://<user>:<password>@cluster0.c17bgbx.mongodb.net/pflemos")
        console.log("Servidor local conectado al servicio MongoDB");

    } catch (error) {
        
        // muestro el objeto Error completo para entender que puede fallar
        console.log(`Error: ${error}`);

    }
}