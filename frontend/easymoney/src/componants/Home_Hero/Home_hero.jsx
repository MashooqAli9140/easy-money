import React from "react";
import "./Home_hero.css";
import Grow from "/images/Grow.png";
import Navbar from "../Navbar/Navbar";
import Home_Hero_2 from "../Home_Hero/Home_Hero_2.jsx";
import Signup from "../signup/Signup.jsx";
import { useNavigate } from "react-router-dom";

const Home_hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div id="home-hero">
        <div id="home-hero-right">
          <div id="grow-icon-div">
            {/* <img style={{ width: "100%" }} src={Grow} alt="grow_icon" /> */}
          </div>
        </div>
        <div id="home-hero-left">
          <h1> Grow wealth. </h1>
          <h1> Achieve Goals. </h1>
          <h1> Invest in the best mutual funds. </h1>
          <div style={{ width: "60%", marginTop: "10px" }}>
            <h5 style={{ fontWeight: "100" }}>
              Wealth is not just about money. It's about what all you can do
              with it. It is having your own story of progress. And living it
              every single day. So go ahead, imagine a future you want to shape.
            </h5>
          </div>
          <div id="start-btn-div">
            <button
              onClick={() => navigate("/signup")}
              id="start-btn"
              style={{
                borderRadius: "25px",
                width: "100%",
                padding: "12px 8px 12px 8px",
                outline: "none",
              }}
            >
              {" "}
              <a> Start Your Journey </a>{" "}
            </button>
          </div>
        </div>
      </div>
      <Home_Hero_2 />
      <Signup />
    </>
  );
};

export default Home_hero;
