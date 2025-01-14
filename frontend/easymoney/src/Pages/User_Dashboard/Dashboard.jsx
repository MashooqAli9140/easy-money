import React from "react";
import { useParams } from "react-router-dom";
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import "./Dashboard.css";
import Portfolio from "./Portfolio";

const Dashboard = () => {
  const { id } = useParams();
  const { login, setLogin , login_user , setlogin_user , login_user_data } = useGlobleContext();
  if (id) {
    setLogin(true);
    setlogin_user(id)
  }

if( !login_user_data)
{
  return(
    <div style={{ backgroundColor:"red", padding:"20px 20px 20px 20px"}}>
      <h1> Loading.... </h1>
    </div>
  )
}

  return (
    <div id="dashboard-hero">

      <div id="dashboard-hero-header">
           <h1 style={{ fontWeight:"100"}}> <b> { login_user_data && login_user_data.name } </b> nice to meet you! </h1>
           <br />
          <p>
            Welcome aboard. Start investing or upload your external wealth to
            get started.
          </p>

        <div id="hero-card-box" style={{ marginTop: "20px",padding: "20px 0px 20px 0px" }} >

          {/* //left part */}
          <div id="dashboard-hero-left" style={{width: "100%" }}>
          <div style={{ padding:"10px 10px 10px 10px" , borderRadius:"25px",border:"1px solid lightgrey"}}>
          <div style={{ padding:"10px 10px 10px 10px"}}>
            <h1 style={{ fontWeight:"500"}}> Start investing </h1>
            <p> Invest in the right funds that's personalised for you </p>
          </div>

            <div style={{ padding:"10px 10px 10px 10px"}}><a href="">
              <button id="continue-btn"> Continue </button>
              </a>
            </div>
            </div>
          </div>

       {/* //right part */}
      <div id="dashboard-hero-left" style={{width: "100%" }}>
        <div style={{ padding:"10px 10px 10px 10px" , borderRadius:"25px",border:"1px solid lightgrey"}}>
          <div style={{ padding:"10px 10px 10px 10px"}}>
            <h1 style={{ fontWeight:"500"}} > Start an SIP </h1>
            <p> Invest in the right funds that's personalised for you </p>
          </div>

            <div style={{ padding:"10px 10px 10px 10px"}}><a href="">
              <button id="continue-btn"> Start SIP  </button>
              </a>
            </div>
        </div>
      </div>
        {/* //right part */}
        </div>
      </div>

      <div style= {{height: '1px' , backgroundColor: 'grey', opacity: '0.5', margin: '30px auto 30px', maxWidth:"1200px"}} ></div><Portfolio />
    
    </div>
  );
};

export default Dashboard;
