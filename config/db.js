const mongoose = require('mongoose')

const connectDB = async(mongourl) => {
    try{
        await mongoose.connect(mongourl)
            .then(() => console.log("MONGODB Connection Succesfull ;)"))
    } catch (err){
        console.error("Error setting up the connection", err);
        process.exit(1);
    }
}

module.exports = connectDB;