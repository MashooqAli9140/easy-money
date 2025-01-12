require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');



//DATABCE CONNECTED
connectDB();






const PORT = process.env.PORT || 4500;
app.listen( PORT , ()=> {
    console.log( `server running on PORT${PORT} `)
})