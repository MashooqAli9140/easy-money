import React, { useState } from "react";
import Logo from "/public/images/Logo.png";
import "./Signup_page.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import Navbar from "../../componants/Navbar/Navbar";

const Signup_page = () => {
  const [openlogin, setopenLogin] = useState("none");
  const [opensignup, setopensignup] = useState("block");
  const [openreset, setopenreset] = useState("none");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_num, setMobile_num] = useState("");
  const [openerror, setOpenError] = useState("none");
  const navigate = useNavigate();
  const { login, setLogin, login_user, setlogin_user } = useGlobleContext();

  function openloginform(e) {
    e.preventDefault();
    setopenLogin("block");
    setopensignup("none");
    setopenreset("none");
  }
  function opensignupform(e) {
    e.preventDefault();
    setopenLogin("none");
    setopenreset("none");
    setopensignup("block");
  }
  function openresetform(e) {
    e.preventDefault();
    setopenreset("block"), setopensignup("none"), setopenLogin("none");
  }

  //SIGN UP REQ FUNCTION
  async function SendUserSignup(e) {
    e.preventDefault();
    const user_data = {
      name,
      email,
      password,
      mobile_num,
    };
    if (!name || !email || !password || !mobile_num)
      return alert("please fill all the details");

    try {
      const response = await axios.post(
        "https://easy-money-by-mashooq-ali.onrender.com/user-signup-data",
        user_data,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      alert("signup success");
      setopenLogin("block");
      setopensignup("none");
      setName(""), setEmail(""), setPassword(""), setMobile_num("");
      return response.status;
    } catch (error) {
      console.log("error while creating account", error.message);
      if (error.message === "Request failed with status code 509")
        return alert("email or number is already registered");
    }
  }

  //LOGIN REQ FUNCTION CREATED
  async function SendLoginReq(e) {
    e.preventDefault();

    const user_data = {
      email,
      password,
    };

    if (!email || !password) return alert("please fill all the details");

    try {
      const response = await axios.post(
        "https://easy-money-by-mashooq-ali.onrender.com/user-login-req",
        user_data,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      alert("login success");
      setLogin(true);
      const token = response.data.token; //getting the jwt token
      localStorage.setItem("token", token); //saving the jwt token to user's localstorage
      setlogin_user(response.data.userDetails);
      navigate(`/dashboard/${response.data.userDetails._id}`);
      setEmail("");
      setPassword("");
      setOpenError("none");
      return response.status;
    } catch (error) {
      alert("error while login");
      if (error.msge === "email not registered" || "password not matched") {
        setEmail("");
        setPassword("");
        setOpenError("block");
      }
      console.log(error.msge);
    }
  }

  //Handle Password Change req
  async function HandlePasswordChange(e) {
    e.preventDefault();
    const data = {
      email,
    };

    try {
      const response = await axios.post(
        "https://easy-money-by-mashooq-ali.onrender.com/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("reset req sent to you registered email");
      return response.status;
    } catch (error) {
      console.log(error);
      alert("error while sending reset req", error.message);
    }
  }

  //when passowrd or email is icorrect then show error for 5 SECONDS
  if (openerror === "block") {
    const errorTimeout = setTimeout(() => {
      setOpenError("none");
    }, 5000);
  }

  return (
    <>
      <Navbar />
      <div
      id="signup-main-bg"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px 40px 20px",
        }}
      >
        {/* //SIGN FORM  */}
        <div id="signup_form" style={{ display: opensignup }}>
          {/* //form logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              objectFit: "fit",
            }}
          >
            <img
              style={{ width: "75%", borderRadius: "12px" }}
              src={Logo}
              alt="Logo"
            />
          </div>
          {/* //signup or login form inputs */}
          <div id="form-inputs">
            <form onSubmit={(e) => SendUserSignup(e)}>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  min={4}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="name-input"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>

              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  minLength={10}
                  value={mobile_num}
                  onChange={(e) => setMobile_num(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
                <button type="submit" id="signup-form-btn">
                  {" "}
                  Sign up{" "}
                </button>
              </div>
            </form>

            <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
              <div
                style={{
                  fontWeight: "100",
                  display: "flex",
                  flexGrow: "grow",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <p>Already have an account?</p>
                <button
                  onClick={(e) => openloginform(e)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {" "}
                  Login
                </button>
              </div>
              <br />
              <div
                style={{
                  fontWeight: "100",
                  display: "flex",
                  flexGrow: "grow",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <p>Forgot password?</p>
                <button
                  onClick={(e) => openresetform(e)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {" "}
                  Reset{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* //SIGN FORM END */}

        <div id="login_form" style={{ display: openlogin }}>
          {/* //form logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              objectFit: "fit",
            }}
          >
            <img
              style={{ width: "75%", borderRadius: "12px" }}
              src={Logo}
              alt="Logo"
            />
          </div>
          {/* //signup or login form inputs */}
          <div id="form-inputs">
            <form onSubmit={(e) => SendLoginReq(e)}>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="name-input"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div
                style={{
                  display: openerror,
                  textAlign: "center",
                  padding: "5px 5px 5px 5px",
                }}
              >
                <p style={{ color: "red" }}> email or password is incorrect </p>
              </div>
              <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
                <button type="submit" id="signup-form-btn">
                  {" "}
                  Login{" "}
                </button>
              </div>
            </form>
            <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
              <div
                style={{
                  fontWeight: "100",
                  display: "flex",
                  flexGrow: "grow",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <p>Don't have an account?</p>
                <button
                  onClick={(e) => opensignupform(e)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {" "}
                  Signup
                </button>
              </div>
              <br />
              <div
                style={{
                  fontWeight: "100",
                  display: "flex",
                  flexGrow: "grow",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <p>Forgot password?</p>
                <button
                  onClick={(e) => openresetform(e)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {" "}
                  Reset{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="login_form" style={{ display: openreset }}>
          {/* //form logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              objectFit: "fit",
            }}
          >
            <img
              style={{ width: "75%", borderRadius: "12px" }}
              src={Logo}
              alt="Logo"
            />
          </div>
          {/* //signup or login form inputs */}
          <div id="form-inputs">
            <form onSubmit={(e) => HandlePasswordChange(e)}>
              <div style={{ padding: "5px 5px 5px 5px" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
                <button type="submit" id="signup-form-btn">
                  {" "}
                  Reset{" "}
                </button>
              </div>
            </form>
            <div style={{ padding: "5px 5px 5px 5px", marginTop: "10px" }}>
              <div
                style={{
                  fontWeight: "100",
                  display: "flex",
                  flexGrow: "grow",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <p>Don't have an account?</p>
                <button
                  onClick={(e) => opensignupform(e)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  {" "}
                  Signup
                </button>
              </div>
            </div>
            <div
              style={{
                fontWeight: "100",
                display: "flex",
                flexGrow: "grow",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <p>Already have an account?</p>
              <button
                onClick={(e) => openloginform(e)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: "18px",
                  color: "blue",
                }}
              >
                {" "}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup_page;
