import React from 'react'
import { useState , useEffect } from 'react';
import { data, useParams } from 'react-router-dom'
import Navbar from '../../componants/Navbar/Navbar';
import './Mutual_fund.css'
import axios from 'axios';

const Mutual_fund = () => {
      const { id } = useParams();
      const [isLoading, setIsLoading] = useState(true);
      const [ fundData , setfundData ] = useState([]);
      const [error, setError] = useState(null);
      
      const mutualFundIds = [ '148382','148459','148702','114984','148662']
      useEffect(() => {
        const fetchMutualFundData = async () => {
          try {

            const requests = mutualFundIds.map( (id) => axios.get( `https://api.mfapi.in/mf/${id}/latest`, {

            }))
            const responses = await Promise.all(requests) //getting all the data by promise.all and convert it into array of responses
            const data = responses.map( (response) => response.data )//map the data from responses
            setfundData( data ); //storing data into fundData array
            setIsLoading(false);
          } catch (err) {
            setError(`Failed to fetch mutual fund data: ${err.message}`);
            setIsLoading(false);
          }
        };
    
        fetchMutualFundData();
      }, []);

      if( fundData ) console.log("final data-->", fundData )

      if( isLoading ) return(
        <div style={{ textAlign:"center",color:"white", maxWidth:"300px", backgroundColor:"green", borderRadius:"50px",margin:"20px auto 20px"}}>
            <h1> loading... </h1>
        </div>
      )


      async function startInvesting( e , fund_id ){
        e.preventDefault();
        console.log( "index is this-->", fund_id )
      }
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
                    <div style={{  width:"100%"}} ><h4> Scheme caregory </h4> </div>
                    <div style={{  width:"100%"}} ><h4> NAV </h4> </div>
                    <div style={{  width:"100%"}} ><h4> Start Invest </h4>  </div>
              </div>

{/* //mutual funds main content */}
    { fundData.map( (data , index ) => ( 
        <div id='mutual-funds-main-content' index={index }>
              <div style={{ padding:"10px 0px 10px 0px", fontWeight:"100",width:"100%"}}>
              <h6 id='mutual-fund-h6-words'> Fund Name </h6>  
              <h4> { data.meta.fund_house } </h4> 
              </div>

              <div style={{ padding:"10px 0px 10px 0px", width:"100%"}} >
              <h6 id='mutual-fund-h6-words' > Scheme category </h6>
              <h4> { data.meta.scheme_category } </h4>
              </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} >
                  <h6 id='mutual-fund-h6-words' > NAV  </h6>
                  <h4> { data.data[0].nav } </h4> 
                  </div>

              <div style={{ padding:"10px 0px 10px 0px",  width:"100%"}} > 
                  <a href=""> 
                  <button onClick={ (e) => startInvesting( e , data.meta.scheme_code )} id='mutual-fund-invest-btn'> Invest Now </button>
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

    </>

  )
}

export default Mutual_fund
