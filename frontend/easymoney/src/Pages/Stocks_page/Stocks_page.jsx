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
      const [stockAmount ,setstockAmount ] = useState("");
      const [c_name, setc_Name] = useState("");
      const [high, sethigh] = useState("");
      const [low, setlow] = useState("");
      const [close_val, setclose_val] = useState("");
      const [ showInvestCard , setshowInvestCard ] = useState(false)
      const [ investDone , setinvestDone ] = useState(false);

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
      if (loading) return <div style={{ textAlign:"center",margin:"50px"}}> <h1>Loading data for top 50 companies...</h1> </div> 
      if (error) return <h1>Error: {error}</h1>;
      console.log( "data is this-->", CompanyData );

      function startInvesting( e , company_name , high , low , close  ){
        e.preventDefault();
        setshowInvestCard(true);
        setc_Name(company_name);
        sethigh(high);
        setlow(low)
        setclose_val(close);
      }

      function CloseInvestCard(e){
        e.preventDefault();
        setshowInvestCard(false);
       }
       async function MakeNewStockInvesting(e){
             e.preventDefault();
             const stockData = {
              id,
              c_name,
              high,
              low,
              close_val,
              stockAmount
            }
            if( !id ) return alert("user id not get");
            if( !c_name || !high || !stockAmount  || !low || !close_val  ) return alert("please fill details")
            if( stockAmount < 500 || stockAmount > 10000  ){
              return alert("please enter between 500 to 10k")
            }
            try {
                const response  = await axios.post("http://localhost:3000/new-stock-invest",stockData,{
                  headers:{ 'Content-type' : 'application/json'}
                })
                alert("data saved success");
                setshowInvestCard(false),setinvestDone(true),setstockAmount("");
                return response.status;
              } catch (error) {
                console.log( error.message ,"error while send new Stock investment");
                alert("please check frontend code");
              }
       }
       if( investDone ){
        const closeinvest = setTimeout(() => {
              setinvestDone(false);
        },2000 );
       }



  return (
 <>
 <Navbar />
 <div>
       <div id='stocks-fund-header'>
         <div id='stocks-fund-01'>
            <h4 style={{ fontWeight:"100",color:"#00B852"}}> Dashboard </h4>
            <h6 style={{ fontWeight:"100",color:"#00B852"}}>  {">"} </h6>
            <h4 style={{ fontWeight:"400",color:"light-grey"}}> Stocks </h4>
         </div>
       </div>

{/* //main heading */}
       <div id='stocks-fund-hero'>
         <div id='stocks-fund-02'>
              <div>
                   <h1 style={{ color:"#212426"}}> Top<span style={{ color:"#00B852"}}> 30 Stocks </span>  to Invest </h1>
              </div>

{/* //head of the table */}
              <div id='stocks-funds-details-head'>
                    <div style={{ fontWeight:"100",width:"100%"}}> <h4> Company </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D High </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D Low </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 1D Close </h4>  </div>
                    <div style={{  width:"100%"}} ><h4> 1D Invest </h4>  </div>
              </div>

{/* //stocks funds main content */}
    { CompanyData.stocks.map( (data , index ) => ( 
        <div id='stocks-funds-main-content' key={index }>
              <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
              <h6 id='stocks-fund-h6-words'> Company Name </h6>  
              <h4> { data.symbol.split('.')[0] } </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
              <h6 id='stocks-fund-h6-words' > 1D High </h6>
              <h4> ₹{data.high }  </h4>
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h6 id='stocks-fund-h6-words' > 1D Low  </h6>
                  <h4> ₹{ data.low }  </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h6 id='stocks-fund-h6-words' > 1D Close  </h6>
                  <h4> ₹{ data.close }  </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <a href=""> 
                  <button onClick={ (e) => startInvesting( e, data.symbol, data.high, data.low, data.close )} id='stocks-fund-invest-btn'> Invest now </button>
                  </a>
              </div>
        </div>
          ))}
{/* //stocks funds main content */}

         </div>
        </div>
       <div>
    </div>
</div>


{/* //INVESTCARD STARTS HERE// */}
<div id='invest-card-outer' style={{ display: showInvestCard ? "block" : "none"}}>
      <div id='invest-card-inner' >

        <div id='invest-card-fund-details'>
        <div id='stocks-funds-main-content'>
              <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
              <h5 style={{ fontWeight:"100"}}> Company Name </h5>  
              <h3> { c_name.split('.')[0] } </h3> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
              <h5 style={{ fontWeight:"100"}} > High </h5>
              <h3> {high}  </h3>
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h5 style={{ fontWeight:"100"}} > Low  </h5>
                  <h3> {low} </h3> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h5 style={{ fontWeight:"100"}} > Close  </h5>
                  <h3> {close_val} </h3> 
              </div>
        </div>
        </div>

{/* //ONE TIME INVESTMENT FORM START */}
        <div id='stock-form'>
            <div style={{ width:"100%",textAlign:"center", padding:'10px 10px 10px 10px', borderRadius:"12px"}}>
                <h4 style={{ fontWeight:"100", color: !stockAmount ? "red":"#212426"}}>Enter amount { '>' } = 500 </h4>
                <input value={stockAmount} onChange={ (e) => setstockAmount(e.target.value)} style={{ margin:"10px 10px 10px 10px", borderRadius:"5px", padding:"10px 5px 10px 5px", border:'2px solid #212426',outline:"none"}} type="number" placeholder='ENTER AMOUNT(1k-10k)' />
            </div>

            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => MakeNewStockInvesting(e)} style={{width:"100%"}} id='stock-invest'> Invest now </button>
            </div>
            <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <button onClick={ (e) => CloseInvestCard(e) } style={{width:"100%"}} id='stocks-fund-cancel-btn'> Cancel </button>
            </div>
        </div>{/* //ONE TIME INVESTMENT FORM END */}
      </div>
</div>

 {/* //after successfull investment */}
 <div id='invest-done' style={{ textAlign:"center", display: investDone ? "block" : "none" }}>
             <h2 style={{ color:'green'}}> Investment Done <i class="fa-solid fa-check"></i> </h2>
 </div>{/* //ONE TIME INVESTMENT FORM END */}

</>

  )
}

export default Stocks_page
