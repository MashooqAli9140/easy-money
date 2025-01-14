import React, { useState } from 'react'
import Logo from '/public/images/Logo.png'
import './Signup_page.css'
import axios from 'axios';

const Signup_page = () => {
    const [openlogin , setopenLogin] = useState("none")
    const [opensignup , setopensignup] = useState("block")
    const [ name , setName ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ mobile_num , setMobile_num ] = useState("");


    
    function openloginform(e){
        e.preventDefault();
        setopenLogin("block");
        setopensignup("none");
    }
    function opensignupform(e){
        e.preventDefault();
        setopenLogin("none");
        setopensignup("block");
    } 

    async function SendUserSignup(e){
           e.preventDefault();
           const user_data = {
            name,
            email,
            password,
            mobile_num
           }
           try {
                const response  = await axios.post('http://localhost:3000/user-signup-data', user_data,{
                   headers:{ "Content-type": "application/json" },
                } )
            alert("signup success");
            return response.status; 
           } catch (error) {
              console.log("error while creating accoung" , error.msge );
              alert("error while sending");
           }
    }




  return (
    <div style={{display:'flex',justifyContent:'center', backgroundColor:"white", padding:"40px 20px 40px 20px"}}>

{/* //SIGN FORM  */}
        <div id='signup_form' style={{ display:opensignup }}>
            {/* //form logo */}
            <div style={{ display:"flex",justifyContent:"center", textAlign:'center', width:"100%",objectFit:"fit"}}> 
                <img style={{ width:"75%", borderRadius:"12px"}}  src={Logo} alt="Logo" />
            </div>
            {/* //signup or login form inputs */}
            <div id='form-inputs'>
                <form onSubmit={ (e) => SendUserSignup(e)}>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input onChange={ (e) => setName(e.target.value) } id='name-input' type="text" placeholder='Enter Your Name' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input onChange={ (e) => setEmail(e.target.value) } id='name-input' type="text" placeholder='Enter Email' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input onChange={ (e) => setPassword(e.target.value) } id='name-input' type="text" placeholder='Enter Password' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input onChange={ (e) => setMobile_num(e.target.value) } id='name-input' type="text" placeholder='Enter Mobile Number' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px", marginTop:"10px"}}>
                        <button type='submit' id='signup-form-btn'> Sign up </button>
                    </div>
                    </form>

                    <div style={{ padding:"5px 5px 5px 5px", marginTop:"10px"}}>
                        <div style={{ fontWeight:"100", display:'flex',flexGrow:"grow", justifyContent:"center", gap:"5px"}}>
                            <p>Already have an account?</p>
                            <button onClick={ (e) => openloginform(e) } style={{ cursor:"pointer", background:'none', border:'none',outline:'none',fontSize:"18px",color:"blue"}}> Login</button>
                        </div>
                        <br />
                        <div style={{ fontWeight:"100", display:'flex',flexGrow:"grow", justifyContent:"center", gap:"5px"}}>
                            <p>Forgot password?</p>
                            <button style={{ cursor:"pointer", background:'none', border:'none',outline:'none',fontSize:"18px",color:"blue"}}> Reset </button>
                        </div>
                    </div>
            </div>
        </div>
{/* //SIGN FORM END */}
<div id='login_form' style={{ display: openlogin }}>
            {/* //form logo */}
            <div style={{ display:"flex",justifyContent:"center", textAlign:'center', width:"100%",objectFit:"fit"}}> 
                <img style={{ width:"75%", borderRadius:"12px"}}  src={Logo} alt="Logo" />
            </div>
            {/* //signup or login form inputs */}
            <div id='form-inputs'>
                <form>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input id='name-input' type="text" placeholder='Enter Email' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px"}}>
                       <input id='name-input' type="text" placeholder='Enter Password' />
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px", marginTop:"10px"}}>
                        <button id='signup-form-btn'> Login </button>
                    </div>
                    <div style={{ padding:"5px 5px 5px 5px", marginTop:"10px"}}>
                        <div style={{ fontWeight:"100", display:'flex',flexGrow:"grow", justifyContent:"center", gap:"5px"}}>
                            <p>Don't have an account?</p>
                            <button onClick={ (e) => opensignupform(e) } style={{ cursor:"pointer", background:'none', border:'none',outline:'none',fontSize:"18px",color:"blue"}}> Signup</button>
                        </div>
                        <br />
                        <div style={{ fontWeight:"100", display:'flex',flexGrow:"grow", justifyContent:"center", gap:"5px"}}>
                            <p>Forgot password?</p>
                            <button style={{ cursor:"pointer", background:'none', border:'none',outline:'none',fontSize:"18px",color:"blue"}}> Reset </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Signup_page
