const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DATABASE_URI , {

        })
        console.log( "MONGODB CONNECTED" )
    } catch (error) {
        console.log("error while connecting the DB");
    }
}
module.exports = connectDB;

