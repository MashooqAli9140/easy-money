import React, { useState , useEffect } from 'react'
import Navbar from "../../componants/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";

const User_profile = () => {
    const { id } = useParams();
    const [ editModeOn , seteditModeOn ] =useState(false);
    const { login, setLogin , login_user , setlogin_user , login_user_data } = useGlobleContext();

    if (id) {
      setLogin(true);
      setlogin_user(id)
    }
  
   function EditProfileData(e){
      seteditModeOn(true);
   }
   function confirmEdit(e){
      seteditModeOn(false);
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
    <div style={{ padding:"20px 20px 20px 20px", height:"100vh", overflow:"hidden"}}>

      <div style={{ boxShadow:"0px 2px 5px 5px rgba(0,0,0,0.3)", maxWidth:"600px", backgroundColor:"white", padding:"30px 10px 30px 10px",  borderRadius:"25px", margin:"0 auto 0"}}>
             
             <div>
                <h4 style={{ textAlign:'center'}}> MY PROFILE </h4>
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

                <input  style={{ display:editModeOn ? "block" : "none" , padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Name' />
                <input disabled value= { login_user_data && login_user_data.email } style={{ display:editModeOn ? "none" : "block" ,color:"white", padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Name' />

            </div>

 {/* //MOBILE NUMBER SECTION */}
            <div style={{ padding:"2px 10px 2px 10px", fontWeight:"100", color:"#212426"}}>
               <h4> Mobile Number </h4>
            </div>
            <div style={{ margin:"10px 0px 10px 0px", display:"flex", justifyContent:"space-between", backgroundColor:"#212426", alignContent:'center',alignItems:'center', padding:"13px 16px 10px 16px", color:"white", borderRadius:"25px"}}> 

                <input style={{ display:editModeOn ? "block" : "none" , padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Name' />
                <input disabled value= { login_user_data && login_user_data.mobile_num } style={{ display:editModeOn ? "none" : "block" ,color:"white", padding:"10px 14px 10px 14px" ,fontSize:"14px", width:"100%",borderRadius:"15px"}} type="text" placeholder='Name' />

            </div>

{/* //BUTTONS PARTS */}
            <div style={{ padding:"10px 10px 10px 10px",display:editModeOn ? "block" : "none" }} >
                <button onClick={ (e) => confirmEdit(e) } style={{ cursor:"pointer", width:"100%", background:"#00B852",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Confirm </button>
            </div>
            <div style={{ padding:"10px 10px 10px 10px"}} >
                <button onClick={ (e) => EditProfileData(e) } style={{ cursor:"pointer", width:"100%", background:"#00B852",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Edit </button>
            </div>
           <div>  
               <div style={{ padding:"10px 10px 10px 10px"}}>
                <button style={{ width:'100%', background:"red",color:"white", padding:"10px 15px 10px 15px",outline:"none",border:"none",borderRadius:"5px", fontSize:"16px"}}> Go back </button>
               </div>
            </div>

    </div>
    </div>
    </>
  )
}

export default User_profile
