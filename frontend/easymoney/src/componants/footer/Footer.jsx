import React from 'react';
import './Footer.css'; // Importing the CSS file for styling
import Logo from "/images/Logo.png"; // Importing the logo image

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#212426", padding: "30px 10px 30px 10px" }}>
      {/* Footer Section 1: Top Searched Schemes */}
      <div id='footer-content-1'>
        <div>
          <b> <p> Top Searched Schemes: </p> </b>
        </div>
        <div>
          <p>Quant Small Cap Fund | Quant Infrastructure Fund | Quant ELSS Tax Saver Fund | Axis Small Cap Fund | Quant Mid Cap Fund | Nippon India Small Cap Fund</p>
        </div>
      </div>

      {/* Footer Section 2: Duplicate Content for Demo/Structure */}
      <div id='footer-content-1'>
        <div>
          <b> <p> Top Searched Schemes: </p> </b>
        </div>
        <div>
          <p>Quant Small Cap Fund | Quant Infrastructure Fund | Quant ELSS Tax Saver Fund | Axis Small Cap Fund | Quant Mid Cap Fund | Nippon India Small Cap Fund</p>
        </div>
      </div>

      {/* Footer Section 3: Duplicate Content for Demo/Structure */}
      <div id='footer-content-1'>
        <div>
          <b> <p> Top Searched Schemes: </p> </b>
        </div>
        <div>
          <p>Quant Small Cap Fund | Quant Infrastructure Fund | Quant ELSS Tax Saver Fund | Axis Small Cap Fund | Quant Mid Cap Fund | Nippon India Small Cap Fund</p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div id='footer-bottom'>
        {/* Left Section: Logo and Address */}
        <div id='footer-bottom-left'>
          <div id='footer-b-l-content' style={{ width: "250px", maxwidth: "250px" }}>
            <a href="/">
              <img style={{ width: '100%', height: "auto" }} src={Logo} alt="Logo" /> {/* Logo Image */}
            </a>
          </div>
          <div style={{ width: "250px", maxwidth: "250px", color: "white", marginTop: "10px" }}>
            <p style={{ fontWeight: "100" }}>
              784 Crescent Ridge Lane, Lumina Heights, Veloria 89210 {/* Address */}
            </p>
          </div>
        </div>

        {/* Right Section: Product and Easy Wealth Links */}
        <div id='footer-bottom-right'>
          {/* Products List */}
          <div style={{ padding: '15px 20px 15px 20px' }}>
            <div style={{ padding: '20px 0px 20px 0px', fontWeight: '300' }}>
              <h4 style={{ fontWeight: '100' }}> PRODUCTS </h4> {/* Heading */}
            </div>
            <h5> Stocks </h5>
            <h5> Mutual Funds </h5>
            <h5> Nps </h5>
            <h5> Future & options </h5>
            <h5> Credit Cards </h5>
            <h5> Sip calculator </h5>
          </div>

          {/* Easy Wealth Links */}
          <div style={{ padding: '15px 20px 15px 20px' }}>
            <div style={{ padding: '20px 0px 20px 0px', fontWeight: '300' }}>
              <h4 style={{ fontWeight: '100' }}> EASY WEALTH </h4> {/* Heading */}
            </div>
            <h5> About us </h5>
            <h5> Blogs </h5>
            <h5> Careers </h5>
            <h5> Pricing </h5>
            <h5> Trust and safety </h5>
            <h5> Help and support </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
