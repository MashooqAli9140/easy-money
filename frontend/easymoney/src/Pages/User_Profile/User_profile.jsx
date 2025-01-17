import React, { useState , useEffect } from 'react'
import Navbar from "../../componants/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User_profile = () => {
    const { id } = useParams();
    const [ editModeOn , seteditModeOn ] =useState(false);
    const { setLogin , setlogin_user , login_user_data } = useGlobleContext();
    const [ editedEmail, seteditedEmail ] = useState("");
    const [ editedNumber, seteditedNumber ] = useState("");
    const [ isprofileupdated , setisprofileupdated ] = useState(false);
    const navigate = useNavigate();

    if (id) {
      setLogin(true);
      setlogin_user(id)
    }
  
   function EditProfileData(e){
      seteditModeOn(true);
   }
  async function confirmEdit(e ,editedEmail , editedNumber ){
      e.preventDefault();
      const editedData = {
         id,
         editedEmail,
         editedNumber
      }
      if( !id || !editedEmail, !editedNumber ) return alert("values not found please fill all the details")
      if(editedNumber.length < 10 || editedNumber.length > 10 ) return alert("number should be 10 digits")  
      try {
         const response  = await axios.put("http://localhost:3000/profile-edit-req",editedData,{
            headers:{ 'Content-type' : 'application/json'}
          })
          alert("data saved success");
          seteditModeOn(false),setisprofileupdated(true);
          return response.status;
      } catch (error) {
         console.log(error.message);
         return error.message;
      } 
   }

if( isprofileupdated )
{
   const updateTimeout = setTimeout(() => {
         setisprofileupdated(false);
   }, 3000); 
}
   
   if( !login_user_data )
      {
        return(
          <div style={{ backgroundColor:"red", padding:"20px 20px 20px 20px"}}>
            <h1> Loading.... </h1>
          </div>
        )
      }

  return (
    <>
    <Navbar />
    <div style={{ display: isprofileupdated ? "block" : "none", backgroundColor:"#00B852", color:"white",padding:'10px 10px 10px 10px',textAlign:"center"}}>
      <h2> Profile Update success </h2>
    </div>

    <div style={{ padding:"20px 20px 20px 20px", height:"100vh", overflow:"hidden"}}>

      <div style={{ boxShadow:"0px 2px 5px 5px rgba(0,0,0,0.3)", maxWidth:"600px", backgroundColor:"white", padding:"30px 10px 30px 10px",  borderRadius:"25px", margin:"0 auto 0"}}>
             
             <div style={{ boxShadow:"1px 4px px rgba(0,0,0,0.5)", backgroundColor:"#212426",borderRadius:"25px", maxWidth:"200px",margin:"0 auto 0",padding:"10px 15px 10px 15px"}}>
                <h2 style={{ textAlign:'center',color:"white"}}> MY PROFILE </h2>
             </div>


{/* //INPUTS PART */}
           {/* //NAME SECTION */}
           <div style={{ padding:"2px 10px 2px 10px", fontWeight:"100", color:"#212426"}}>
               <h4> Name </h4>
            </div>
            <div style={{ margin:"10px 0px 10px 0px", display:"flex", justifyContent:"space-between", backgroundColor:"#212426", alignContent:'center',alignItems:'center', padding:"13px 16px 10px 16px", color:"white", borderRadius:"25px"}}> 
               {/* //CAN NOT EDIT THE NAME */}
                <input disabled value= { login_user_data && login_user_data.name } style={{ color:"white", padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Name' />

            </div>
 {/* //EMAIL SECTION */}
            <div style={{ padding:"2px 10px 2px 10px", fontWeight:"100", color:"#212426"}}>
               <h4> Email </h4>
            </div>
            <div style={{ margin:"10px 0px 10px 0px", display:"flex", justifyContent:"space-between", backgroundColor:"#212426", alignContent:'center',alignItems:'center', padding:"13px 16px 10px 16px", color:"white", borderRadius:"25px"}}> 

                <input onChange={ (e)=> seteditedEmail(e.target.value) }  style={{ display:editModeOn ? "block" : "none" , padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Enter new email' />
                <input disabled value= { login_user_data && login_user_data.email } style={{ display:editModeOn ? "none" : "block" ,color:"white", padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Email' />

            </div>

 {/* //MOBILE NUMBER SECTION */}
            <div style={{ padding:"2px 10px 2px 10px", fontWeight:"100", color:"#212426"}}>
               <h4> Mobile Number </h4>
            </div>
            <div style={{ margin:"10px 0px 10px 0px", display:"flex", justifyContent:"space-between", backgroundColor:"#212426", alignContent:'center',alignItems:'center', padding:"13px 16px 10px 16px", color:"white", borderRadius:"25px"}}> 

                <input onChange={ (e)=> seteditedNumber(e.target.value) } style={{ display:editModeOn ? "block" : "none" , padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="number" minLength={"10"} placeholder='Enter new mobile number' />
                <input disabled value= { login_user_data && login_user_data.mobile_num } style={{ display:editModeOn ? "none" : "block" ,color:"white", padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Mobile Number' />
                <div>

                </div>

            </div>

{/* //BUTTONS PARTS */}
            <div style={{ padding:"10px 10px 10px 10px",display:editModeOn ? "block" : "none" }} >
                <button onClick={ (e) => confirmEdit(e, editedEmail, editedNumber ) } style={{ cursor:"pointer", width:"100%", background:"#00B852",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Update </button>
                <br />
                <button onClick={ () => seteditModeOn(false) } style={{ marginTop:"20px", cursor:"pointer", width:"100%", background:"#212426",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Cancel </button>
            </div>
            <div style={{ padding:"10px 10px 10px 10px", display: editModeOn ? "none" : "block" }} >
                <button onClick={ (e) => EditProfileData(e) } style={{ cursor:"pointer", width:"100%", background:"#00B852",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Edit </button>
            </div>
           <div>  
               <div style={{ padding:"10px 10px 10px 10px"}}>
                <button onClick={ () => navigate(`/dashboard/${id}`)} style={{ cursor:"pointer", width:'100%', background:"red",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Go back </button>
               </div>
            </div>

    </div>
    </div>
    </>
  )
}

export default User_profile
