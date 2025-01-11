import React from 'react'
import Logo from "/images/Logo.png"
import './Navbar.css';

const Navbar = () => {
  return (
    <div id='nav-main-box' style={{ padding:"10px 20px 10px 20px", width:'100%' ,backgroundColor:"#212426"}}>
      <div id='navleft' style={ { width:"250px", maxwidth:"250px"}}>
      {/* , backgroundColor:"#212426" */}
          <img style={{ width:'100%' ,height:"auto"}} src= {Logo} alt="Logo" />
      </div>
      <div id='nav-mid'>
            <a href="/"> Mutual Funds </a>
            <a href="/"> Stocks </a>
            <a href="/"> NPS </a>
            <a href="/"> SIP Calculator </a>
      </div>
      <div id='navright'>
          <button id='login-btn'> Login </button>
          <button id='signup-btn' > SignUp </button>
          <div id='nav-right-menu'>
           <i class="fa-solid fa-bars fa-2x" style={{ color:"white"}}> </i>
         </div>
      </div>

    </div>
  )
}

export default Navbar
