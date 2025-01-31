import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import { useParams } from "react-router-dom";


const Portfolio = () => {
  const { setLogin , setlogin_user, login_user_data } = useGlobleContext(); // Access global context
  const { id } = useParams(); // Get `id` parameter from the URL
  const today = new Date();
  const date = today.getDate(); // Get today's date
  today.setDate(1) // Set to the first day of the month to avoid overflow
  today.setMonth(today.getMonth() + 1); // Move to next month
  const nextMonth = today.toLocaleString('default', { month: 'long' }); //get month in string format
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today); // Get full month name
  
  // State variables for tracking total investments and counts
  let [ totalStockVal , settotalStockVal ] = useState(0);
  let [ totalmutual , settotalmutual ] = useState(0);
  const [ sipArraylength , setsipArraylength ] = useState(0);
  const [ StockArraylength , setstockArraylength ] = useState(0);

  // Assign login user `id` if present
  if (id) {
    setLogin(true); // Set user as logged in
    setlogin_user(id); // Store user ID globally
  }

  // useEffect to calculate total investment values and array lengths
  useEffect(() => {
    // Calculate total stock investment value
    if (Array.isArray(login_user_data.stocks_investments)) {
      const totalstock = login_user_data.stocks_investments.reduce((acc, data) => acc + Number(data.invested_amount), 0);
      settotalStockVal(totalstock); // Update total stock value
      setstockArraylength(login_user_data.stocks_investments.length); // Update stock array length
    }

    // Calculate total mutual fund investment value
    if (Array.isArray(login_user_data.sip_fund_Details)) {
      const totalmutual = login_user_data.mf_onetime.reduce((acc, data) => acc + Number(data.invested_amount), 0);
      settotalmutual(totalmutual); // Update total mutual fund value
      setsipArraylength(login_user_data.sip_fund_Details.length); // Update SIP array length
    }
  }, [login_user_data.stocks_investments, login_user_data.sip_fund_Details]); // Dependencies to watch for changes

  return (
    <>
    <div style={{ padding: "10px 10px 10px 10px" }}>
      {/* Portfolio Header */}
      <div id='portfolio-header'>
        <div style={{ borderRadius: "25px", textAlign: "left", padding: "10px 20px 10px 20px", backgroundColor: "#00B852" }}>
          <h1> My Wealth </h1>
        </div>

        {/* Investment Overview */}
        <div id='portfolio-h2'>
          {/* Mutual Funds */}
          <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: 'center' }}>
              <h4 style={{ fontWeight: "100" }}> Mutual funds</h4>
              <h3> ₹{totalmutual} </h3>
            </div>
          </div>

          {/* Stocks */}
          <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: 'center' }}>
              <h4 style={{ fontWeight: "100" }}> Stocks </h4>
              <h3> ₹{totalStockVal} </h3>
            </div>
          </div>

          {/* NPS */}
          <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: 'center' }}>
              <h4 style={{ fontWeight: "100" }}> NPS </h4>
              <h3> ₹ 0 </h3>
            </div>
          </div>

          {/* Fixed Deposits */}
          <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: 'center' }}>
              <h4 style={{ fontWeight: "100" }}> Fix Deposites </h4>
              <h3> ₹ 0 </h3>
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* SIP Section */}
      <div id='portfolio-header' style={{ display: sipArraylength === 0 ? "none" : "block" }}>
        <div style={{ borderRadius: "25px", textAlign: "left", padding: "10px 20px 10px 20px", backgroundColor: "#00B852" }}>
          <h1> My Sip's </h1>
        </div>
        {/* Render each SIP fund */}
        {Array.isArray(login_user_data.sip_fund_Details) && login_user_data.sip_fund_Details.map((data, index) => (
          <div id='portfolio-h2' key={index}>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> Fund name </h4>
                <h3> {data.fundName} </h3>
              </div>
            </div>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> Amount </h4>
                <h3> ₹{data.sip_amount} </h3>
              </div>
            </div>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> Date </h4>
                <h3> {data.sip_date} {nextMonth} </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Section */}
      <div id='portfolio-header' style={{ display: StockArraylength === 0 ? "none" : "block" }}>
        <div style={{ borderRadius: "25px", textAlign: "left", padding: "10px 20px 10px 20px", backgroundColor: "#00B852" }}>
          <h1> My Stocks </h1>
        </div>
        {/* Render each stock */}
        {Array.isArray(login_user_data.stocks_investments) && login_user_data.stocks_investments.map((data, index) => (
          <div id='portfolio-h2' key={index}>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> Company name </h4>
                <h3> {data.company.split('.')[0]} </h3>
              </div>
            </div>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> Amount </h4>
                <h3> ₹{data.invested_amount} </h3>
              </div>
            </div>
            <div style={{ width: "100%", padding: "20px 20px 20px 20px", border: "1px solid lightgrey", borderRadius: "25px" }}>
              <div>
                <h4 style={{ fontWeight: "100", marginBottom: "5px" }}> At price </h4>
                <h3> {data.investedAt} </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div> 
</>
  )
}

export default Portfolio
