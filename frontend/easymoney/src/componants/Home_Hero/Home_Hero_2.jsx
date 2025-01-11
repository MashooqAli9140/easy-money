import React from 'react'
import './Home_hero_2.css';
import returns from "/images/returns.gif"

const Home_Hero_2 = () => {
  return (
       <div id='home-hero-2'>
       <div id='home-hero-left-2'>
        <div style={{ padding:"2px 10px 10px 2px", margin:"0 auto 0", maxWidth:"300px"}}>
        <img id='return-img' style={{ width:"100%"}} src= {returns} alt="grow_icon" />
        <h1 style={{ fontSize:"65px"}}> Simplified data for Amazingg returns </h1>
        </div>
       </div>

       <div id='home-hero-right-2'>
        <div style={{ width:"400px",objectFit:"contain"}}>
        <img style={{ width:"100%"}} src= {returns} alt="grow_icon" />
        </div>
       </div>
    </div>

  )
}

export default Home_Hero_2
