import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Navbar component
import './Sip_calculator.css'; // CSS for styling the component

const Sip_calculator = () => {
  // State variables for SIP and Lumpsum calculations
  const [monthlyInvestment, setMonthlyInvestment] = useState(""); // SIP Monthly Investment
  const [lumpSumInvestment, setLumpSumInvestment] = useState(""); // Lumpsum Investment
  const [annualReturn, setAnnualReturn] = useState(""); // Annual Return Rate
  const [timePeriod, setTimePeriod] = useState(""); // Investment Time Period (Years)
  const [futureValue, setFutureValue] = useState(null); // Future Value of Investment
  const [totalInvest, setTotalInvest] = useState(""); // Total Investment Amount
  const [sipFormActive, setSipFormActive] = useState(true); // Toggle for SIP form
  const [lumpFormActive, setLumpFormActive] = useState(false); // Toggle for Lumpsum form

  // Function to calculate SIP future value
  const calculateSIP = () => {
    const P = Number(monthlyInvestment); // Monthly investment
    const r = Number(annualReturn) / 12 / 100; // Monthly rate of return
    const n = Number(timePeriod) * 12; // Total number of months

    // Validate input fields
    if (!P || !r || !n) {
      alert("Please enter valid inputs for all fields!");
      return;
    }

    // SIP Future Value Formula
    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    // Update future value and total investment
    setFutureValue(FV.toFixed(2)); // Round to 2 decimal places
    setTotalInvest((timePeriod * 12) * monthlyInvestment);
  };

  // Function to calculate Lumpsum future value
  const calculateLumpSum = () => {
    const P = Number(lumpSumInvestment); // Principal amount
    const r = Number(annualReturn) / 100; // Annual rate of return
    const n = Number(timePeriod); // Time period in years

    // Validate input fields
    if (!P || !r || !n) {
      alert("Please enter valid inputs for all fields!");
      return;
    }

    // Lumpsum Future Value Formula
    const FV = P * Math.pow(1 + r, n);

    // Update future value and total investment
    setFutureValue(FV.toFixed(2)); // Round to 2 decimal places
    setTotalInvest(FV - lumpSumInvestment);
  };

  return (
    <>
      <Navbar />
      <div id='sip-cal-main' style={{ padding: '20px 10px' }}>
        {/* Header Section */}
        <div style={{ color: "#212426", maxWidth: '600px', margin: "0 auto", padding: "20px 10px" }}>
          <h1>SIP Calculator</h1>
        </div>

        {/* Main Card */}
        <div style={{ borderRadius: "25px", boxShadow: "1px 2px 15px rgba(0,0,0,0.5)", maxWidth: '600px', margin: "0 auto", padding: "20px 15px" }}>
          {/* Toggle Buttons for SIP and Lumpsum */}
          <div style={{ padding: "20px 10px", backgroundColor: "white", display: "flex", gap: "20px", alignItems: "center" }}>
            <button 
              onClick={() => {
                setFutureValue("");
                setTotalInvest("");
                setTimePeriod("");
                setAnnualReturn("");
                setLumpSumInvestment("");
                setMonthlyInvestment("");
                setSipFormActive(true);
                setLumpFormActive(false);
              }} 
              id='sip-cal-btn' 
              style={{ background: sipFormActive ? "#00B852" : "#212426" }}
            >
              SIP
            </button>
            <button 
              onClick={() => {
                setFutureValue("");
                setTotalInvest("");
                setTimePeriod("");
                setAnnualReturn("");
                setLumpSumInvestment("");
                setMonthlyInvestment("");
                setSipFormActive(false);
                setLumpFormActive(true);
              }} 
              id='lump-cal-btn' 
              style={{ background: lumpFormActive ? "#00B852" : "#212426" }}
            >
              Lumpsum
            </button>
          </div>

          {/* SIP Form */}
          {sipFormActive && (
            <div>
              {/* Monthly Investment Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Monthly Investment</h3>
                <input 
                  value={monthlyInvestment} 
                  onChange={(e) => setMonthlyInvestment(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='Amount' 
                />
              </div>

              {/* Expected Return Rate Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Expected return rate (p.a)</h3>
                <input 
                  value={annualReturn} 
                  onChange={(e) => setAnnualReturn(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='10%' 
                />
              </div>

              {/* Time Period Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Time period</h3>
                <input 
                  value={timePeriod} 
                  onChange={(e) => setTimePeriod(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='5 Yr' 
                />
              </div>

              {/* Calculate SIP Button */}
              <div style={{ padding: "10px" }}>
                <button onClick={calculateSIP} id='cal-sip-btn-bottom'>Calculate SIP</button>
              </div>
            </div>
          )}

          {/* Lumpsum Form */}
          {lumpFormActive && (
            <div>
              {/* Total Investment Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Total Investment</h3>
                <input 
                  value={lumpSumInvestment} 
                  onChange={(e) => setLumpSumInvestment(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='Amount' 
                />
              </div>

              {/* Expected Return Rate Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Expected return rate (p.a)</h3>
                <input 
                  value={annualReturn} 
                  onChange={(e) => setAnnualReturn(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='10%' 
                />
              </div>

              {/* Time Period Input */}
              <div style={{ margin: "10px 0", padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "200", color: "#212426" }}>Time period</h3>
                <input 
                  value={timePeriod} 
                  onChange={(e) => setTimePeriod(e.target.value)} 
                  style={{ padding: "10px", borderRadius: "8px", outline: "none", border: "1px solid #212426" }} 
                  type="text" 
                  placeholder='5 Yr' 
                />
              </div>

              {/* Calculate Lumpsum Button */}
              <div style={{ padding: "10px" }}>
                <button onClick={calculateLumpSum} id='cal-sip-btn-bottom'>Calculate Lumpsum</button>
              </div>
            </div>
          )}

          {/* Result Display Section */}
          <div>
            {/* Invested Amount */}
            <div style={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h5 style={{ fontWeight: "200", color: "#212426" }}>Invested amount</h5>
              <h4 style={{ color: "#212426" }}>
                ₹{sipFormActive ? (totalInvest || 0) : (lumpSumInvestment || 0)}
              </h4>
            </div>

            {/* Estimated Returns */}
            <div style={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h5 style={{ fontWeight: "200", color: "#212426" }}>Est. returns</h5>
              <h4 style={{ color: "#212426" }}>
                ₹{futureValue ? (futureValue - (sipFormActive ? totalInvest : lumpSumInvestment)).toFixed(2) : 0}
              </h4>
            </div>

            {/* Total Value */}
            <div style={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h5 style={{ fontWeight: "200", color: "#212426" }}>Total value</h5>
              <h4 style={{ color: "#212426" }}>
                ₹{futureValue || 0}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sip_calculator;