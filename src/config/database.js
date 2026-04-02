const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namasteDev:9N4qrkNmGcBbADea@namastedev.lpqrpxa.mongodb.net/devTinder")
};

module.exports=connectDB