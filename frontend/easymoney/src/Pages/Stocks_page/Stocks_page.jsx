import React from 'react'
import Navbar from "../../componants/Navbar/Navbar";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Stocks_page.css';
import axios from 'axios';

const Stocks_page = () => {
      const [ CompanyData , setCompanyData ] = useState([])
      const [ loading ,setloading ] = useState(true);
      const [error , setError ] = useState(null);
      const { id } = useParams();
      const [isLoading, setIsLoading] = useState(true);
      const [ fundData , setfundData ] = useState([]);
      const [ showInvestCard , setshowInvestCard ] = useState(false)
      const [ isSIPformActive , setisSIPformActive ] = useState(true);
      const [selectedFundName , setselectedFundName ] = useState("");
      const [selectedScheme , setselectedScheme ] = useState("");
      const [selectedNav , setselectednav ] = useState("");
      const mutualFundIds = [ '148382','148459','148702','114984','148662']
      const [ sip_amount , setSipAmount ] = useState("");
      const [ sip_date ,   setSipDate ] = useState("");
      const[ oneTimeAmount , setoneTimeAmount ] = useState("")

      useEffect(() => {
        const fetchStocks = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/get-stock-data`)
            setCompanyData( response.data.data[0] );
            return response.status
          } catch (err) {
            console.error("Error fetching data:", err.message);
          }
          finally{
            setloading(false);
          }
        };
        fetchStocks();
      }, []);
      if (loading) return <h1>Loading data for top 50 companies...</h1>;
      if (error) return <h1>Error: {error}</h1>;
      console.log( "data is this-->", CompanyData );

  return (
 <>
 <Navbar />
 <div>
       <div id='mutual-fund-header'>
         <div id='mutual-fund-01'>
            <h4 style={{ fontWeight:"100",color:"#00B852"}}> Dashboard </h4>
            <h6 style={{ fontWeight:"100",color:"#00B852"}}>  {">"} </h6>
            <h4 style={{ fontWeight:"400",color:"light-grey"}}> Stocks </h4>
         </div>
       </div>

{/* //main heading */}
       <div id='mutual-fund-hero'>
         <div id='mutual-fund-02'>
              <div>
                   <h1 style={{ color:"#212426"}}> Top 30 Stocks to Invest </h1>
              </div>

{/* //head of the table */}
              <div id='mutual-funds-details-head'>
                    <div style={{ fontWeight:"100",width:"100%"}}> <h4> Company </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D High </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D Low </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D Close </h4>  </div>
                    <div style={{  width:"100%"}} ><h4> 1D Invest </h4>  </div>
              </div>

{/* //mutual funds main content */}
    { CompanyData.stocks.map( (data , index ) => ( 
        <div id='mutual-funds-main-content' key={index }>
              <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
              <h6 id='mutual-fund-h6-words'> Company Name </h6>  
              <h4> { data.symbol } </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
              <h6 id='mutual-fund-h6-words' > 1D High </h6>
              <h4> ₹{data.high }  </h4>
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h6 id='mutual-fund-h6-words' > 1D Low  </h6>
                  <h4> ₹{ data.low }  </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h6 id='mutual-fund-h6-words' > 1D Close  </h6>
                  <h4> ₹{ data.close }  </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <a href=""> 
                  <button onClick={ (e) => startInvesting( e)} id='mutual-fund-invest-btn'> Invest Now </button>
                  </a>
              </div>
        </div>
          ))}
{/* //mutual funds main content */}

         </div>
        </div>
       <div>
    </div>
</div>


{/* //INVESTCARD STARTS HERE// */}
<div id='invest-card-outer' style={{ display: showInvestCard ? "block" : "none"}}>
      <div id='invest-card-inner' >
          <div style={{ display:'flex', justifyContent:'space-evenly', gap:"5px", alignContent:'center',alignItems:'center', padding:'10px 10px 10px 10px', borderRadius:"12px", backgroundColor:"#212426"}} > 
            <button onClick={ () => setisSIPformActive(true) } id='invest-sip-btn' style={{ background: isSIPformActive ? "#00B752" : "none" }}> SIP </button>
            <button onClick={ () => setisSIPformActive(false) } id='invest-onetime-btn' style={{ background: !isSIPformActive ? "#00B752" : "none" }} > One Time </button>
          </div>
        
        <div id='invest-card-fund-details'>
        <div id='mutual-funds-main-content'>
              <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
              <h5> Fund Name </h5>  
              <h3> {selectedFundName} </h3> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
              <h5> Scheme category </h5>
              <h3> {selectedScheme} </h3>
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h5> NAV  </h5>
                  <h3> { selectedNav } </h3> 
                  </div>
        </div>
        </div>

{/* //SIP FORM START */}
        <div id='sip-form' style={{ display: isSIPformActive ? "block" : "none"}}>
            <div style={{ width:"100%",textAlign:"center",display:"inline-block", padding:'10px 10px 10px 10px', borderRadius:"12px"}}> 
                <input value={sip_amount} onChange={ (e) => setSipAmount(e.target.value) } style={{ margin:"10px 10px 10px 10px", borderRadius:"5px", padding:"10px 5px 10px 5px", border:'2px solid #212426',outline:"none"}} type="number" placeholder='SIP AMOUNT (500-100K) ' />
                <input value={sip_date}  onChange={ (e) => setSipDate(e.target.value) } style={{ margin:"10px 10px 10px 10px",  border:'2px solid #212426', borderRadius:"5px", padding:"10px 5px 10px 5px",outline:"none"}} type="number" placeholder='ENTER DATE (1-30)' />
            </div>
            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => MakeNewSip(e) } style={{width:"100%"}} id='mutual-fund-invest-btn'> Start SIP </button>
            </div>
            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => CloseInvestCard(e) } style={{width:"100%"}} id='mutual-fund-cancel-btn'> Cancel </button>
            </div>
        </div>{/* //SIP FORM END */}

{/* //ONE TIME INVESTMENT FORM START */}
        <div id='sip-form' style={{ display: !isSIPformActive ? "block" : "none"}}>
            <div style={{ width:"100%",textAlign:"center",display:"inline-block", padding:'10px 10px 10px 10px', borderRadius:"12px"}}> 
                <input value={oneTimeAmount} onChange={ (e) => setoneTimeAmount(e.target.value)} style={{ margin:"10px 10px 10px 10px", borderRadius:"5px", padding:"10px 5px 10px 5px", border:'2px solid #212426',outline:"none"}} type="number" placeholder='ENTER AMOUNT(1k-10k)' />

            </div>
            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => MakeNewMFOnetime(e)} style={{width:"100%"}} id='mutual-fund-invest-btn'> Make One Time </button>
            </div>
            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => CloseInvestCard(e) } style={{width:"100%"}} id='mutual-fund-cancel-btn'> Cancel </button>
            </div>
        </div>{/* //ONE TIME INVESTMENT FORM END */}


      </div>

</div>

</>

  )
}

export default Stocks_page
