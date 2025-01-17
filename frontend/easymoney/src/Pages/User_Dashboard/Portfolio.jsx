import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import { useParams } from "react-router-dom";

const Portfolio = () => {
  const { setLogin , setlogin_user, login_user_data } = useGlobleContext();
  const { id } = useParams();
  const today = new Date();
  const date = today.getDate(); //// Get todays date
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);// Get the full month name
  let [ totalStockVal , settotalStockVal ] = useState(0);
  let [ totalmutual , settotalmutual ] = useState(0);

  //please asign this id if you want fetch user data in any componants
  if (id) {
    setLogin(true);
    setlogin_user(id)
  }

  // a useEffect to avoid infinite re-renders
  //getting total stock value
  useEffect(() => {
 if( Array.isArray(login_user_data.stocks_investments) ) {
       const totalstock = login_user_data.stocks_investments.reduce((acc, data) => acc + Number( data.invested_amount ) , 0)
       const totalmutual = login_user_data.mf_onetime.reduce((acc, data) => acc + Number( data.invested_amount ), 0)
       settotalStockVal( totalstock );
       settotalmutual( totalmutual );
 }
}, [login_user_data.stocks_investments]);

  return (
    <div style={ {padding:"10px 10px 10px 10px"}}>

     <div id='portfolio-header'>
        <div style={{ borderRadius:"25px", textAlign:"left",padding: "10px 20px 10px 20px",backgroundColor:"#00B852" }}>
            <h1> My Wealth </h1>
        </div>
        
        <div id='portfolio-h2'>
           <div style={{ width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}}>
              <h4 style={{ fontWeight:"100"}}> Mutual funds</h4>
               <h3> ₹{totalmutual} </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h4 style={{ fontWeight:"100"}}> Stocks </h4>
              <h3> ₹{totalStockVal} </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h4 style={{ fontWeight:"100"}}> NPS </h4>
              <h3> ₹ 0 </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div style={{ display:"flex", justifyContent:"space-between", alignContent:"center",alignItems:'center'}} >
              <h4 style={{ fontWeight:"100"}}> Fix Deposites </h4>
              <h3> ₹ 0 </h3>
            </div>
           </div>
        </div>

        </div>
        <br />

  {/* //start// */}
    <div id='portfolio-header'>
        <div style={{ borderRadius:"25px", textAlign:"left",padding: "10px 20px 10px 20px",backgroundColor:"#00B852" }}>
            <h1> My Sip's </h1>
        </div>
     { Array.isArray(login_user_data.sip_fund_Details) && login_user_data.sip_fund_Details.map( (data,index) => (

      <div id='portfolio-h2' key={index}>
           <div style={{ width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div>
              <h4 style={{ fontWeight:"100",marginBottom:"5px"}}> Fund name </h4>
              <h3> {data.fundName} </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div >
              <h4 style={{ fontWeight:"100",marginBottom:"5px"}}> Amount </h4>
              <h3> ₹{data.sip_amount} </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div>
              <h4 style={{ fontWeight:"100",marginBottom:"5px" }}> Date </h4>
              <h3> {data.sip_date} {monthName} </h3>
            </div>
           </div>
      </div>
      
 )) } 
  </div>
{/* //End sip details// */}


  {/* //start// */}
    <div id='portfolio-header'>
        <div style={{ borderRadius:"25px", textAlign:"left",padding: "10px 20px 10px 20px",backgroundColor:"#00B852" }}>
            <h1> My Stocks </h1>
        </div>
     { Array.isArray(login_user_data.stocks_investments) && login_user_data.stocks_investments.map( (data,index) => (

      <div id='portfolio-h2' key={index}>
           <div style={{ width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div>
              <h4 style={{ fontWeight:"100",marginBottom:"5px"}}> Company name </h4>
              <h3> { data.company.split('.')[0] } </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div >
              <h4 style={{ fontWeight:"100",marginBottom:"5px"}}> Amount </h4>
              <h3> ₹{data.invested_amount} </h3>
            </div>
           </div>

           <div style={{  width:"100%", padding:"20px 20px 20px 20px", border:"1px solid lightgrey", borderRadius:"25px" }}>  
            <div>
              <h4 style={{ fontWeight:"100",marginBottom:"5px" }}> At price </h4>
              <h3> {data.investedAt}  </h3>
            </div>
           </div>
      </div>
      
 )) } 
  </div>
{/* //End stock details// */}

    </div>
  )
}

export default Portfolio
