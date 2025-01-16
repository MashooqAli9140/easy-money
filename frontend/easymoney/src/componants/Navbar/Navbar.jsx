import React from 'react'
import Logo from "/images/Logo.png"
import './Navbar.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useGlobleContext } from '../../componants/GlobleContext/GlobleContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
      const [ openmenu , setopenmenu ] = useState(false);
      const { id } = useParams();
      const navigate = useNavigate();

  return (
    <div>
      
    <div id='nav-main-box' style={{ padding:"10px 20px 10px 20px", width:'100%' , backgroundColor:"#212426"}}>
      <div id='navleft' style={ { width:"250px", maxwidth:"250px"}}>
        <a href= { id ? `/dashboard/${id}`:"/" }>
        <img style={{ width:'100%' ,height:"auto"}} src= {Logo} alt="Logo" />
        </a>
      </div>

      <div id='nav-mid'>
            <a href= { id ? `/dashboard/mutualfunds/${id}`:"/signup" }> Mutual Funds </a>
            <a href={ id ? `/dashboard/stocks/${id}`:"/signup" }> Stocks </a>
            <a href={ id ? `/dashboard/NPS/${id}`:"/signup" }> NPS </a>
            <a href={ id ? `/dashboard/sip-calculator/${id}`:"/signup" }> SIP Calculator </a>
      </div>

      <div id='navright' style={{ display: id ? "none" : "flex"}} >
        <a href="/signup"> <button id='login-btn'> Login </button> </a>
        <a href="/signup"> <button id='signup-btn' > SignUp </button> </a>

        <div id='nav-right-menu'>
         <i class="fa-solid fa-bars fa-2x" onClick={ () => setopenmenu( !openmenu ) } style={{  display: openmenu ? "none" : "block" , color:"white"}}> </i>
         <i class="fa-solid fa-x fa-2x" onClick={ () => setopenmenu( !openmenu ) } style={{ display: openmenu ? "block" : "none" , color:"white"}} ></i>
         </div>
      </div>

    </div>

    <div id='menu-items' className= { openmenu ? 'show':'hide' }style={{ display: openmenu ? "block" : "none" }} >

      <div style={{ textAlign:"center", padding:"10px 10px 10px 10px", margin:"0 auto 0", width:"250px"}}>
        <div style={{ margin:"10px 0px 10px 0px", borderRadius:"25px", border:"1px solid #BAFF2F " }}>
           <a style={{ margin:"12px 0px 12px 0px", fontSize:"20px", fontWeight:"700", display:"block"}} href="/"> Mutual Funds </a> 
        </div>
        <div style={{ margin:"10px 0px 10px 0px", borderRadius:"25px", border:"1px solid #BAFF2F " }}>
           <a style={{ margin:"12px 0px 12px 0px", fontSize:"20px", fontWeight:"700", display:"block"}} href="/">Stocks </a> 
        </div>
        <div style={{ margin:"10px 0px 10px 0px", borderRadius:"25px", border:"1px solid #BAFF2F " }}>
           <a style={{ margin:"12px 0px 12px 0px", fontSize:"20px", fontWeight:"700", display:"block"}} href="/"> NPS </a> 
        </div>
        <div style={{ margin:"10px 0px 10px 0px", borderRadius:"25px", border:"1px solid #BAFF2F " }}>
           <a style={{ margin:"12px 0px 12px 0px", fontSize:"20px", fontWeight:"700", display:"block"}} href="/"> SIP Calculator </a> 
        </div>
      </div>
      
    </div>

    </div>

  )
}

export default Navbar
