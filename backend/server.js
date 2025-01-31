require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const signup_data = require('./model/signup_data.js')
const Stocks_data = require('./model/stocks_schema.js')
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const JWT_SECRET = process.env.JWT_SECRET
const helmet = require('helmet');
const path = require("path");
const verifyToken = require('./middleware/verifyJWT.js'); // Import the middleware

//DATABCE CONNECTED
connectDB();

//body parser use for destructor the data from url
app.use( bodyparser.json());


app.use( cors( {
    origin: [
        'https://easy-money-by-mashooq-ali.onrender.com', //for deployed
    ],
    methods:[ 'GET', 'PUT' , 'POST' , 'DELETE'],
    credentials:true, //Allow cookie if needed
}))

// Serve static files from the `dist` directory
app.use(express.static(path.join(__dirname, "dist" )));

//helmet use for cdnjs fonts and icon from font awesome
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'", // Allow API calls to the same origin
          "https://api.mfapi.in", // Allow your frontend to call the external mutual fund API
        ], // Restricts default sources
        fontSrc: [
          "'self'",
          "https://fonts.googleapis.com", // For Google Fonts
          "https://fonts.gstatic.com", // For Google Fonts
          "https://cdnjs.cloudflare.com", // For Font Awesome fonts
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Needed for inline styles in some cases
          "https://fonts.googleapis.com", // For Google Fonts styles
          "https://cdnjs.cloudflare.com", // For Font Awesome CSS
        ],
      },
    })
  );



//1ststep to change pw is to create nodemailer congi  
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.EMAIL_USER, //these details are coming from .env file
    pass: process.env.EMAIL_PASS,
},
secure: true, // Use secure connection (SSL)
port: 465, // Port for SSL
tls: {
  rejectUnauthorized: false, // Allow self-signed certificates
},
debug: true, // Log SMTP connection info
logger: true,
});

//HANDLE CHANGE PW REQ
app.post("/change-password" , async (req , res ) => {
    const { email } = req.body;
    if( !email ) return res.status(400).json({msge: "PLEASE PROVIDE EMAIL"});
    try {
          //2nd step to change pw is to find the correct user  
        const foundUser = await signup_data.findOne( { email:email });
        if( !foundUser ) return res.status(404).json({ msge: " User not found Maybe not registered or email is incorrct "});
        
          //3rd step to change pw is to create jwt token for validation   
          const token = jwt.sign( { email:email } , process.env.JWT_SECRET , { expiresIn:"20min" })

          // 4th Step to Send Email with Reset Link
            const resetLink = `https://easy-money-by-mashooq-ali.onrender.com/reset-password/${token}`;
            const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        };
            await transporter.sendMail(mailOptions);
            res.status(200).json({success: "true" , msge:"Password reset email sent" , token })

    } catch (error) {
        console.log( error,"error while sending reset password link");
        res.status(500).json({success: "false" , msge:"error while sending reset password link" , error });
    }
})

//CHANGE THE PREV PASS AND STORE NEW PASSWORD IN DB
app.put("/update-new-password" , async (req , res ) => {
    const { jwttoken , password } = req.body;
     
    if( !jwttoken ) return res.status(400).json({msge: "token is expired"});
    if( !password ) return res.status(400).json({msge: "new password not coming"});

    try {
         //step 1 to verify the user using jwt token
        const decoded = jwt.verify( jwttoken , process.env.JWT_SECRET );

        const Founduser = await signup_data.findOne( { email:decoded.email } )// finding the user with email 

        if (!Founduser) return res.status(404).json({ message: "Invalid token" });
        
        //if user is found then change the new password with old one
        const HashedPW = await Bcrypt.hash( password , 10 );
        Founduser.password = HashedPW;
        await Founduser.save();
        console.log( "new pass word updated" )
        res.status(200).json({success: "true" , msge:"Password reset Success" })

    } catch (error) {
        console.log( error,"error while reseting the pw");
        res.status(500).json({success: "false" , msge:"error while reset password" , error });
    }
})


//SIGN UP REQ
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


//profile update req
app.put("/profile-edit-req", async( req , res ) => {
    const { id , editedNumber , editedEmail } = req.body;
    if( !id || !editedNumber || !editedEmail ) return res.status(401).json( {"msge" : "updated details are missing"});

    try {
        //finding the user
        const FoundUser = await signup_data.findById(id);
        //if not found then
        if( !FoundUser ) return res.status(404).json({"msge":"user not found"});

        //now user is found then change previous details
        FoundUser.email = editedEmail;
        FoundUser.mobile_num =editedNumber;
        //saving the updated data
        await FoundUser.save()
        console.log("user data updated -->", FoundUser );
        return res.status(200).json({ "msge" : "user profile data updated" , FoundUser  });      
    } catch (error) {
        console.error("err while updating the data");
        return res.status(500).json({ "msge":"error while updating the data", error });
    }
})

//Handle login req
app.post('/user-login-req', async( req , res ) => {
    const { email , password } = req.body;
    if( !email || !password ) return res.status(401),json( {'msge':'email or password is missing'});

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
     return res.status(200).json({ 'msge': 'login req success', userDetails: FoundUser , token })
        
    } catch (error) {
      return res.status(500).json({ 'msge': 'Internal server error', error });    }

}) 


//HNADLE GET USER DATA FOR LOGIN USER
app.get("/get-user-data/:id", verifyToken,  async ( req , res ) => {
    const { id } = req.params;
    if( !id ) return res.status(404).json({"msge":"id is missing"});
    const { user } = req; // This comes from the decoded JWT (user info stored in the middleware)
    if (user.id !== id) {
      return res.status(403).json({ msge: 'Access denied. You can only view your own data.' });
    }

    //if id matches with token id then return userdata
    try {
        const userdata = await signup_data.findOne( { _id : id})
        if( !userdata ) return res.status(401).json({"msge":"id is mismatch or data is not loading"});
        return res.status(200).json( {"msge" :"user data access done", userdata: userdata } )

    } catch (error) {
        return res.status(401).json({"msge":"error while getting user data" , error })
    }
})


//Handle New sip req
app.post("/new-sip-req", async( req , res ) => {
    const { id , selectedFundName , selectedNav , selectedScheme , sip_amount , sip_date } = req.body;
    if( !id || !selectedFundName || !selectedNav || !selectedScheme  || !sip_amount || !sip_date ) return res.status(400).json({"msge":"some details not coming"});

    try {
    //now data is ok then find user to store new sip data
    const FoundUser = await signup_data.findById(id);
    if( !FoundUser ) return res.status(404).json({"msge":"user not found to store sip data"});

    //now user found then add new sip details to user database
    FoundUser.sip_fund_Details.push({ 
        fundName:selectedFundName,
        FundNav: selectedNav,
        FundScheme: selectedScheme,
        sip_amount:sip_amount,
        sip_date:sip_date
     });
     await FoundUser.save();
     return res.status(200).json({"msge":"new sip investment success"})
    } catch (error) {
      console.log( error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})


//Handle New One time MF req
app.post("/new-mf-onetime-investment", async( req , res ) => {
    const { id , oneTimeAmount , selectedFundName , selectedNav , selectedScheme } = req.body;
    if( !id || !oneTimeAmount || !selectedFundName || !selectedNav || !selectedScheme  ) return res.status(400).json({"msge":"id or amount or something else not get"});

    try {
    //now data is ok then find user to store new one time data
    const FoundUser = await signup_data.findById(id);
    if( !FoundUser ) return res.status(404).json({"msge":"user not found to store sip data"});

    //now user found then add new sip details to user database
    FoundUser.mf_onetime.push({ 
        fundName:selectedFundName,
        FundNav: selectedNav,
        FundScheme: selectedScheme,
        invested_amount:oneTimeAmount
     });
     await FoundUser.save();
     return res.status(200).json({"msge":"New mf one time investment success"})
    } catch (error) {
      console.log( error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})




//Handle New Stock investment
app.post("/new-stock-invest", async( req , res ) => {
    const { id , c_name , high , low , close_val , stockAmount } = req.body;
    if( !id || !c_name || !high || !low || !close_val , !stockAmount  ) return res.status(400).json({"msge":"id or some data is not coming"});

    try {
    //now data is ok then find user to store New stock investment
    const FoundUser = await signup_data.findById(id);
    if( !FoundUser ) return res.status(404).json({"msge":"user not found to store stock data"});

    //now user found then add new sip details to user database
    FoundUser.stocks_investments.push({ 
        company:c_name,
        high: high,
        low: low,
        investedAt:close_val,
        invested_amount:stockAmount
     });
     await FoundUser.save();
     return res.status(200).json({"msge":"New stock investment success"})
    } catch (error) {
      console.log( error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})
//Handle stocks get req
app.get("/get-stock-data", async( req , res ) => {
    try {
    // Fetch all stock data from the database
    const getData = await Stocks_data.find();

    // If no data is found, return a 404 response
    if (!getData || getData.length === 0) {
      return res.status(404).json({ msg: "No stock data found" });
    }
    // Return the fetched data with a success message
    return res.status(200).json({
        msg: "All stocks fetched successfully",
        data: getData
      });
      
    } catch (error) {
      console.log( error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
})


// sending index.html file for all routes
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});


const PORT = process.env.PORT || 4500;
app.listen( PORT , ()=> {
    console.log( `server running on PORT ${PORT} `)
})