require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');





const PORT = process.env.PORT || 4500;
app.listen( PORT , ()=> {
    console.log( `server running on PORT${PORT} `)
})