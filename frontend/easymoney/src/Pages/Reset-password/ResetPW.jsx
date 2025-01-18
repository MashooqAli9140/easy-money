import React from 'react';
import Navbar from '../../componants/Navbar/Navbar';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '/public/images/Logo.png';
import axios from 'axios';

const ResetPW = () => {
  // State to store the new password entered by the user
  const [password, setPassword] = useState("");
  
  // State to manage the loading state during the request
  const [loading, setLoading] = useState(false);
  
  // Get the token parameter from the URL using useParams hook
  const token = useParams();
  const jwttoken = `${token.token}`;
  
  // useNavigate hook to navigate to other routes programmatically
  const navigate = useNavigate();

  /**
   * Function to handle password change request
   * @param {Event} e - Form submit event
   */
  async function changePW(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true to indicate the request is in progress

    const data = {
      jwttoken, // Token to verify the user
      password, // New password
    };

    try {
      // Send the password update request to the server
      const response = await axios.put(
        "http://localhost:3000/update-new-password", // API endpoint for password update
        data, // Request body with token and new password
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
        }
      );

      // Notify the user of successful password update
      alert("New password is updated");
      navigate('/signup'); // Redirect to the signup page
      return response.status; // Return the response status (optional)
    } catch (error) {
      // Handle any errors that occur during the API call
      console.log(error.message); // Log the error message to the console
      alert("Error while updating the password"); // Show an alert to the user
    } finally {
      // Always set loading state to false after request completion
      setLoading(false);
    }
  }

  // Show a loading message while the request is in progress
  if (loading) {
    return (
      <div style={{ backgroundColor: "green", textAlign: "center" }}>
        <h2>Updating...</h2>
      </div>
    );
  }

  return (
    <>
      {/* Navbar component */}
      <Navbar />
      
      {/* Main container */}
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#4317A2", padding: "40px 20px" }}>
        {/* Password reset form */}
        <div id="login_form">
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", textAlign: 'center', width: "100%" }}>
            <img style={{ width: "75%", borderRadius: "12px" }} src={Logo} alt="Logo" />
          </div>

          {/* Form inputs */}
          <div id="form-inputs">
            <form onSubmit={(e) => changePW(e)}>
              {/* Password input field */}
              <div style={{ padding: "5px" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="name-input"
                  type="text"
                  placeholder="Enter new Password"
                />
              </div>

              {/* Submit button */}
              <div style={{ padding: "5px", marginTop: "10px" }}>
                <button type="submit" id="signup-form-btn">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPW;
