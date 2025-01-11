import React from 'react'
import Logo from "/images/Logo.png"
import './Navbar.css';

const Navbar = () => {
  return (
    <div id='nav-main-box' style={{ padding:"0 100px 0 100px", width:'100%' ,backgroundColor:"#212426"}}>
      <div id='navleft' style={ { width:"250px" , backgroundColor:"#212426"}}>
          <img style={{ width:'100%'}} src= {Logo} alt="Logo" />
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
      </div>
    </div>
  )
}

export default Navbar
