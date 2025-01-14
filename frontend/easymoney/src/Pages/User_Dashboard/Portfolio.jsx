import React from 'react'
import './Dashboard.css';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";


const Portfolio = () => {
  
  return (
    <div style={ {padding:"10px 10px 10px 10px"}}>
     <div id='portfolio-header'>
        <div id='portfolio-header'>
            <h1> My Wealth </h1>
        </div>
        
        <div id='portfolio-h2'>
           <div style={{ width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}}>
              <h3 style={{ fontWeight:"100"}}> Mutual funds</h3>
               <h2> ₹ 0 </h2>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h3 style={{ fontWeight:"100"}}> Stocks </h3>
              <h2> ₹ 0 </h2>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h3 style={{ fontWeight:"100"}}> NPS </h3>
              <h2> ₹ 0 </h2>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h3 style={{ fontWeight:"100"}}> Fix Deposites </h3>
              <h2> ₹ 0 </h2>
            </div>
           </div>
        </div>

        </div>
    </div>
  )
}

export default Portfolio
