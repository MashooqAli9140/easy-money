import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobleContext } from "../../componants/GlobleContext/GlobleContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../componants/Navbar/Navbar';

const User_profile = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [editModeOn, seteditModeOn] = useState(false); // State to toggle edit mode
  const { setLogin, setlogin_user, login_user_data } = useGlobleContext(); // Global context to manage login state and user data
  const [editedEmail, seteditedEmail] = useState(""); // State for storing edited email
  const [editedNumber, seteditedNumber] = useState(""); // State for storing edited mobile number
  const [isprofileupdated, setisprofileupdated] = useState(false); // State to display success message after profile update
  const navigate = useNavigate(); // Hook for navigation

  // Set login and user data when the component is mounted
  if (id) {
    setLogin(true);
    setlogin_user(id);
  }

  // Function to enable edit mode
  function EditProfileData(e) {
    seteditModeOn(true);
  }

  // Function to handle profile update
  async function confirmEdit(e, editedEmail, editedNumber) {
    e.preventDefault();

    // Object containing edited data
    const editedData = {
      id,
      editedEmail,
      editedNumber,
    };

    // Validation checks for inputs
    if (!id || !editedEmail || !editedNumber)
      return alert("Values not found, please fill all the details");
    if (editedNumber.length < 10 || editedNumber.length > 10)
      return alert("Number should be 10 digits");

    try {
      // API call to update profile data
      const response = await axios.put(
        "https://easy-money-by-mashooq.onrender.com/profile-edit-req",
        editedData,
        {
          headers: { 'Content-type': 'application/json' }, // Specify the content type
        }
      );

      alert("Data saved successfully!");
      seteditModeOn(false); // Exit edit mode
      setisprofileupdated(true); // Show success message
      window.location.reload();
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Automatically hide the success message after 3 seconds
  if (isprofileupdated) {
    const updateTimeout = setTimeout(() => {
      setisprofileupdated(false);
    }, 3000);
  }

  // Show loading screen if user data is not yet available
  if (!login_user_data) {
    return (
      <div style={{ backgroundColor: "red", padding: "20px 20px 20px 20px" }}>
        <h1> Loading.... </h1>
      </div>
    );
  }

  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Success Message Display */}
      <div
        style={{
          display: isprofileupdated ? "block" : "none",
          backgroundColor: "#00B852",
          color: "white",
          padding: '10px 10px 10px 10px',
          textAlign: "center"
        }}
      >
        <h2> Profile Updated Successfully </h2>
      </div>

      {/* Profile Form Section */}
      <div style={{ padding: "20px 20px 20px 20px", height: "100vh", overflow: "hidden" }}>
        <div
          style={{
            boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.3)",
            maxWidth: "600px",
            backgroundColor: "white",
            padding: "30px 10px 30px 10px",
            borderRadius: "25px",
            margin: "0 auto 0"
          }}
        >
          {/* Header Section */}
          <div
            style={{
              boxShadow: "1px 4px px rgba(0,0,0,0.5)",
              backgroundColor: "#212426",
              borderRadius: "25px",
              maxWidth: "200px",
              margin: "0 auto 0",
              padding: "10px 15px 10px 15px"
            }}
          >
            <h2 style={{ textAlign: 'center', color: "white", fontWeight: "400" }}> MY PROFILE </h2>
          </div>

          {/* Input Fields Section */}
          {/* Name Section (Non-editable) */}
          <div style={{ padding: "2px 10px 2px 10px", fontWeight: "100", color: "#212426" }}>
            <h4 style={{ fontWeight: '100' }}> Name </h4>
          </div>
          <div
            style={{
              margin: "10px 0px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#212426",
              alignContent: 'center',
              alignItems: 'center',
              padding: "13px 16px 10px 16px",
              color: "white",
              borderRadius: "25px"
            }}
          >
            <input
              disabled
              value={login_user_data && login_user_data.name}
              style={{
                color: "white",
                padding: "10px 14px 10px 14px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "15px"
              }}
              type="text"
              placeholder='Name'
            />
          </div>

          {/* Email Section */}
          <div style={{ padding: "2px 10px 2px 10px", fontWeight: "100", color: "#212426" }}>
            <h4 style={{ fontWeight: '100' }}> Email </h4>
          </div>
          <div
            style={{
              margin: "10px 0px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#212426",
              alignContent: 'center',
              alignItems: 'center',
              padding: "13px 16px 10px 16px",
              color: "white",
              borderRadius: "25px"
            }}
          >
            <input
              onChange={(e) => seteditedEmail(e.target.value)}
              style={{
                display: editModeOn ? "block" : "none",
                padding: "10px 14px 10px 14px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "15px"
              }}
              type="text"
              placeholder='Enter new email'
            />
            <input
              disabled
              value={login_user_data && login_user_data.email}
              style={{
                display: editModeOn ? "none" : "block",
                color: "white",
                padding: "10px 14px 10px 14px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "15px"
              }}
              type="text"
              placeholder='Email'
            />
          </div>

          {/* Mobile Number Section */}
          <div style={{ padding: "2px 10px 2px 10px", fontWeight: "100", color: "#212426" }}>
            <h4 style={{ fontWeight: '100' }}> Mobile Number </h4>
          </div>
          <div
            style={{
              margin: "10px 0px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#212426",
              alignContent: 'center',
              alignItems: 'center',
              padding: "13px 16px 10px 16px",
              color: "white",
              borderRadius: "25px"
            }}
          >
            <input
              onChange={(e) => seteditedNumber(e.target.value)}
              style={{
                display: editModeOn ? "block" : "none",
                padding: "10px 14px 10px 14px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "15px"
              }}
              type="number"
              minLength={"10"}
              placeholder='Enter new mobile number'
            />
            <input
              disabled
              value={login_user_data && login_user_data.mobile_num}
              style={{
                display: editModeOn ? "none" : "block",
                color: "white",
                padding: "10px 14px 10px 14px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "15px"
              }}
              type="text"
              placeholder='Mobile Number'
            />
          </div>

          {/* Buttons Section */}
          <div
            style={{
              padding: "10px 10px 10px 10px",
              display: editModeOn ? "block" : "none"
            }}
          >
            <button
              onClick={(e) => confirmEdit(e, editedEmail, editedNumber)}
              style={{
                cursor: "pointer",
                backgroundColor: "#00B852",
                padding: "10px 5px 10px 5px",
                fontWeight: "100",
                borderRadius: "10px",
                color: "white",
                width: "100%",
                border: "none"
              }}
            >
              Save Profile
            </button>
          </div>
          <div
            style={{
              padding: "10px 10px 10px 10px",
              display: editModeOn ? "none" : "block"
            }}
          >
            <button
              onClick={EditProfileData}
              style={{
                cursor: "pointer",
                backgroundColor: "#00B852",
                padding: "10px 5px 10px 5px",
                fontWeight: "100",
                borderRadius: "10px",
                color: "white",
                width: "100%",
                border: "none"
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_profile;
