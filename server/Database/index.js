const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://camilodiazag17:Veganismo134!@proyect-db.soro8d5.mongodb.net/?retryWrites=true&w=majority&appName=Proyect-DB"

const db = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;