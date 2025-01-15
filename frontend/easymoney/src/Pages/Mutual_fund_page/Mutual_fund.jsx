import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../componants/Navbar/Navbar';
import './Mutual_fund.css'

const Mutual_fund = () => {
      const { id } = useParams();
  return (
    <>
   <Navbar/>
    <div>

       <div id='mutual-fund-header'>
         <div id='mutual-fund-01'>
            <h4 style={{ fontWeight:"100",color:"#00B852"}}> Dashboard </h4>
            <h6 style={{ fontWeight:"100",color:"#00B852"}}>  {">"} </h6>
            <h4 style={{ fontWeight:"400",color:"light-grey"}}> Mutual funds </h4>
         </div>
       </div>

{/* //main heading */}
       <div id='mutual-fund-hero'>
         <div id='mutual-fund-02'>
              <div>
                   <h1 style={{ color:"#212426"}}> Top Mutual funds to Invest </h1>
              </div>

{/* //head of the table */}
              <div id='mutual-funds-details-head'>
                    <div style={{ fontWeight:"100",width:"100%"}}> <h4> Fund name </h4> </div>
                    <div style={{  width:"100%"}} ><h4>Fund size </h4> </div>
                    <div style={{  width:"100%"}} ><h4> 10 years returns </h4> </div>
                    <div style={{  width:"100%"}} ><h4> Start Invest </h4>  </div>
              </div>

{/* //mutual funds main content */}
              <div id='mutual-funds-main-content'>
                    <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
                    <h6 id='mutual-fund-h6-words'> Fund Name </h6>  
                    <h4> Nippon India Large Cap Fund </h4> 
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
                    <h6 id='mutual-fund-h6-words' > Fund Size </h6>
                    <h4> ₹36.01 cr </h4>
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                        <h6 id='mutual-fund-h6-words' > 10 years returns </h6>
                        <h4> +24.57% pa </h4> 
                        </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                        <a href=""> 
                        <button id='mutual-fund-invest-btn'> Invest Now </button>
                        </a>
                    </div>
              </div>
              <div id='mutual-funds-main-content'>
                    <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
                    <h6 id='mutual-fund-h6-words'> Fund Name </h6>  
                    <h4> Nippon India Large Cap Fund </h4> 
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
                    <h6 id='mutual-fund-h6-words' > Fund Size </h6>
                    <h4> ₹36.01 cr </h4>
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                        <h6 id='mutual-fund-h6-words' > 10 years returns </h6>
                        <h4> +24.57% pa </h4> 
                        </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                        <a href=""> 
                        <button id='mutual-fund-invest-btn'> Invest Now </button>
                        </a>
                    </div>
              </div>
              <div id='mutual-funds-main-content'>
                    <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
                    <h6 id='mutual-fund-h6-words'> Fund Name </h6>  
                    <h4> Nippon India Large Cap Fund </h4> 
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
                    <h6 id='mutual-fund-h6-words' > Fund Size </h6>
                    <h4> ₹36.01 cr </h4>
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                        <h6 id='mutual-fund-h6-words' > 10 years returns </h6>
                        <h4> +24.57% pa </h4> 
                        </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                        <a href=""> 
                        <button id='mutual-fund-invest-btn'> Invest Now </button>
                        </a>
                    </div>
              </div>
              <div id='mutual-funds-main-content'>
                    <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
                    <h6 id='mutual-fund-h6-words'> Fund Name </h6>  
                    <h4> Nippon India Large Cap Fund </h4> 
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
                    <h6 id='mutual-fund-h6-words' > Fund Size </h6>
                    <h4> ₹36.01 cr </h4>
                    </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                        <h6 id='mutual-fund-h6-words' > 10 years returns </h6>
                        <h4> +24.57% pa </h4> 
                        </div>

                    <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                        <a href=""> 
                        <button id='mutual-fund-invest-btn'> Invest Now </button>
                        </a>
                    </div>
              </div>
{/* //mutual funds main content */}


         </div>
       </div>

       <div>

       </div>


    </div>

    </>

  )
}

export default Mutual_fund
