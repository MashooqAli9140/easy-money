require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const signup_data = require('./model/signup_data.js')
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


//DATABCE CONNECTED
connectDB();

//body parser use for destructor the data from url
app.use( bodyparser.json());


app.use( cors( {
    origin: [
        'http://localhost:5173', //for development
    ],
    methods:[ 'GET', 'PUT' , 'POST' , 'DELETE'],
    credentials:true, //Allow cookie if needed
}))



app.post("/user-signup-data", async( req , res ) => {
    const { name , email , password , mobile_num } = req.body;
    if( !name || !email || !password || !mobile_num ) return res.status(401).json( {"msge" : "sign up data missing"});

    try {
        //check if email is already registered or not
        const email_exist = await signup_data.findOne({ email });
        if( email_exist ) return res.status(509).json({"msge":"email already registered please use new email"});

        //now check if mobile number is already registered or not
        const number_exist = await signup_data.findOne({ mobile_num });
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
       return res.status(201).json({ "msge" : "user sign up success" , SaveUserData });      
    } catch (error) {
        console.log("error while saving the data");
        return res.status(400).json({ "msge":"error while saving the data"});
    }
})

//Handle login req
app.post('/user-login-req', async( req , res ) => {
    const { email , password } = req.body;
    if( !email , !password ) return res.status(401),json( {'msge':'email or password is missing'});

    try {
     //check if email is registered or not
     const FoundUser =  await signup_data.findOne({ email });
     if( !FoundUser ) return res.status(404).json({'msge':'email not registered'});
 
     //now check if PW is correct or not and check with bcrypt
     const MatchedPW = await Bcrypt.compare( password , FoundUser.password);
     if( !MatchedPW ) return res.status(404).json( {'msge':'password not matched' })
 
     //now email and password is matched then assign jwt token to new login req
     const token = jwt.sign(
         { id: FoundUser._id , email:FoundUser.email },
         JWT_SECRET,
         { expiresIn: "1h"}
     )
     return res.status(200).json({ 'msge': 'login req success', userDetails: FoundUser , token: token })
        
    } catch (error) {
      console.log(error)
      return res.status(401).json({'msge':'error while login from server', error })
    }

}) 




const PORT = process.env.PORT || 4500;
app.listen( PORT , ()=> {
    console.log( `server running on PORT ${PORT} `)
})