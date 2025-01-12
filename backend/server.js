require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const signup_data = require('./model/signup_data.js')
const Bcrypt = require('bcrypt');



//DATABCE CONNECTED
connectDB();



app.post('/user-signup-data', async( req,res ) => {
    const { name , email , password , mobile_num } = req.body;
    if( !name || !email || !password || !mobile_num ) return res.status(401).json( {"msge" : "sign up data missing"});

    try {
        //check if email is already registered or not
        const email_exist = await signup_data.findOne({ email: email });
        if( email_exist ) return res.status(509).json({"msge":"email already registered please use new email"});

        //now check if mobile number is already registered or not
        const number_exist = await signup_data.findOne({ email: email });
        if( number_exist ) return res.status(509).json({"msge":"mobile number already registered please use new number"});

        //now if email and number is unique then hash the Password
        const HashedPW = await Bcrypt.hash( password , 10 );

        const SaveUserData = await signup_data.create({
            name:name,
            email:email,
            password:HashedPW,
            mobile_num: mobile_num
        })
       console.log("user data created -->", SaveUserData );
       return res.status(201).msge({ "msge" : "user sign up success" , SaveUserData });      
    } catch (error) {
        console.log("error while saving the data");
        return res.status(400).json({ "msge":"error while saving the data"});
    }
})




const PORT = process.env.PORT || 4500;
app.listen( PORT , ()=> {
    console.log( `server running on PORT${PORT} `)
})