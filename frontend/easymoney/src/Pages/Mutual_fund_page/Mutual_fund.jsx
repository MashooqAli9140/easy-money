import React from "react";
import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import Navbar from "../../componants/Navbar/Navbar";
import "./Mutual_fund.css";
import axios from "axios";

const Mutual_fund = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [fundData, setfundData] = useState([]);
  const [error, setError] = useState(null);
  const [showInvestCard, setshowInvestCard] = useState(false);
  const [isSIPformActive, setisSIPformActive] = useState(true);
  const [selectedFundName, setselectedFundName] = useState("");
  const [selectedScheme, setselectedScheme] = useState("");
  const [selectedNav, setselectednav] = useState("");
  const mutualFundIds = ["148382", "148459", "148702", "114984", "148662"];
  const [sip_amount, setSipAmount] = useState("");
  const [sip_date, setSipDate] = useState("");
  const [oneTimeAmount, setoneTimeAmount] = useState("");
  const [investDone, setinvestDone] = useState(false);

  useEffect(() => {
    const fetchMutualFundData = async () => {
      try {
        const requests = mutualFundIds.map((id) =>
          axios.get(`https://api.mfapi.in/mf/${id}/latest`, {})
        );
        const responses = await Promise.all(requests); //getting all the data by promise.all and convert it into array of responses
        const data = responses.map((response) => response.data); //map the data from responses
        setfundData(data); //storing data into fundData array
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to fetch mutual fund data: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchMutualFundData();
  }, []);

  function startInvesting(e, fund_name, fund_category, fund_NAV) {
    e.preventDefault();
    setselectedFundName(fund_name);
    setselectedScheme(fund_category);
    setselectednav(fund_NAV);
    setshowInvestCard(true);
  }

  function CloseInvestCard(e) {
    e.preventDefault();
    setselectedFundName(""),
      setselectedScheme(""),
      setselectednav(""),
      setshowInvestCard(false);
  }

  if (isLoading)
    return (
      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "300px",
          backgroundColor: "green",
          borderRadius: "50px",
          margin: "20px auto 20px",
        }}
      >
        <h1> loading... </h1>
      </div>
    );

  async function MakeNewSip(e) {
    e.preventDefault();
    const sipdata = {
      id,
      selectedFundName,
      selectedScheme,
      selectedNav,
      sip_amount,
      sip_date,
    };

    if (!id) return alert("user id not get");
    if (
      !selectedFundName ||
      !selectedNav ||
      !selectedScheme ||
      !sip_amount ||
      !sip_date
    )
      return alert("please fill details");
    if (sip_amount < 500 || sip_amount > 100000)
      return alert("please enter sip from 500 to 100k");
    if (sip_date < 1 || sip_date > 25)
      return alert("please select date from 1 to 25");

    try {
      const response = await axios.post(
        "https://easy-money-by-mashooq-ali.onrender.com/new-sip-req",
        sipdata,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      alert("data saved success");
      setshowInvestCard(false),
        setinvestDone(true),
        setSipAmount(""),
        setselectedFundName(""),
        setselectedScheme(""),
        setselectednav(""),
        setSipDate("");
      return response.status;
    } catch (error) {
      console.log(error.message, "error while send new SIP");
      alert("please check frontend code");
    }
  }

  async function MakeNewMFOnetime(e) {
    e.preventDefault();
    const OnetimeData = {
      id,
      selectedFundName,
      selectedNav,
      selectedScheme,
      oneTimeAmount,
    };

    if (!id) return alert("user id not get");
    if (!oneTimeAmount) return alert("Amount not get");
    if (oneTimeAmount < 1000 || oneTimeAmount > 100000)
      return alert("please enter amount betwen 1k to 100k");

    try {
      const response = await axios.post(
        "https://easy-money-by-mashooq-ali.onrender.com/new-mf-onetime-investment",
        OnetimeData,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      alert("data saved success");
      setshowInvestCard(false), setinvestDone(true), setoneTimeAmount("");
      return response.status;
    } catch (error) {
      console.log(error.message, "error while send new one time investment");
      alert("please check frontend code");
    }
  }

  if (investDone) {
    const closeinvest = setTimeout(() => {
      setinvestDone(false);
    }, 2000);
  }

  return (
    <>
      <Navbar />
      <div>
        <div id="mutual-fund-header">
          <div id="stocks-fund-01">
            <div
              style={{
                padding: "5px 5px 5px 5px",
                display: "flex",
                gap: "5px",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a href={`/dashboard/${id}`} style={{ cursor: "pointer" }}>
                {" "}
                <h4 style={{ fontWeight: "100", color: "#00B852" }}>
                  {" "}
                  Dashboard{" "}
                </h4>{" "}
              </a>
              <h6 style={{ fontWeight: "100", color: "#00B852" }}> {">"} </h6>
              <h4 style={{ fontWeight: "400", color: "light-grey" }}>
                {" "}
                Mutual Funds{" "}
              </h4>
            </div>

            <div id="stock-mid-links">
              <div
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  padding: "10px 10px 10px 10px",
                  backgroundColor: "#00B752",
                }}
              >
                <a href={id ? `/dashboard/mutualfunds/${id}` : "/signup"}>
                  {" "}
                  MF{" "}
                </a>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  padding: "10px 10px 10px 10px",
                  backgroundColor: "#212426",
                }}
              >
                <a href={id ? `/dashboard/stocks/${id}` : "/signup"}>
                  {" "}
                  Stocks{" "}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* //main heading */}
        <div id="mutual-fund-hero">
          <div id="mutual-fund-02">
            <div>
              <h1 style={{ color: "#212426" }}> Top Mutual funds to Invest </h1>
            </div>

            {/* //head of the table */}
            <div id="mutual-funds-details-head">
              <div style={{ fontWeight: "100", width: "100%" }}>
                {" "}
                <h4> Fund name </h4>{" "}
              </div>
              <div style={{ width: "100%" }}>
                <h4> Scheme caregory </h4>{" "}
              </div>
              <div style={{ width: "100%" }}>
                <h4> NAV </h4>{" "}
              </div>
              <div style={{ width: "100%" }}>
                <h4> Start Invest </h4>{" "}
              </div>
            </div>

            {/* //mutual funds main content */}
            {fundData.map((data, index) => (
              <div id="mutual-funds-main-content" index={index}>
                <div
                  style={{
                    padding: "10px 0px 10px 0px",
                    fontWeight: "100",
                    width: "100%",
                  }}
                >
                  <h6 id="mutual-fund-h6-words"> Fund Name </h6>
                  <h4> {data.meta.fund_house} </h4>
                </div>

                <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
                  <h6 id="mutual-fund-h6-words"> Scheme category </h6>
                  <h4> {data.meta.scheme_category} </h4>
                </div>

                <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
                  <h6 id="mutual-fund-h6-words"> NAV </h6>
                  <h4> {data.data[0].nav} </h4>
                </div>

                <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
                  <a href="">
                    <button
                      onClick={(e) =>
                        startInvesting(
                          e,
                          data.meta.fund_house,
                          data.meta.scheme_category,
                          data.data[0].nav
                        )
                      }
                      id="mutual-fund-invest-btn"
                    >
                      {" "}
                      Invest Now{" "}
                    </button>
                  </a>
                </div>
              </div>
            ))}
            {/* //mutual funds main content */}
          </div>
        </div>
        <div></div>
      </div>

      {/* //INVESTCARD STARTS HERE// */}
      <div
        id="invest-card-outer"
        style={{ display: showInvestCard ? "block" : "none" }}
      >
        <div id="invest-card-inner">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "5px",
              alignContent: "center",
              alignItems: "center",
              padding: "10px 10px 10px 10px",
              borderRadius: "12px",
              backgroundColor: "#212426",
            }}
          >
            <button
              onClick={() => setisSIPformActive(true)}
              id="invest-sip-btn"
              style={{ background: isSIPformActive ? "#00B752" : "none" }}
            >
              {" "}
              SIP{" "}
            </button>
            <button
              onClick={() => setisSIPformActive(false)}
              id="invest-onetime-btn"
              style={{ background: !isSIPformActive ? "#00B752" : "none" }}
            >
              {" "}
              One Time{" "}
            </button>
          </div>

          <div id="invest-card-fund-details">
            <div id="mutual-funds-main-content">
              <div
                style={{
                  padding: "10px 0px 10px 0px",
                  fontWeight: "100",
                  width: "100%",
                }}
              >
                <h5> Fund Name </h5>
                <h3> {selectedFundName} </h3>
              </div>

              <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
                <h5> Scheme category </h5>
                <h3> {selectedScheme} </h3>
              </div>

              <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
                <h5> NAV </h5>
                <h3> {selectedNav} </h3>
              </div>
            </div>
          </div>

          {/* //SIP FORM START */}
          <div
            id="sip-form"
            style={{ display: isSIPformActive ? "block" : "none" }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                display: "inline-block",
                padding: "10px 10px 10px 10px",
                borderRadius: "12px",
              }}
            >
              <input
                value={sip_amount}
                onChange={(e) => setSipAmount(e.target.value)}
                style={{
                  margin: "10px 10px 10px 10px",
                  borderRadius: "5px",
                  padding: "10px 5px 10px 5px",
                  border: "2px solid #212426",
                  outline: "none",
                }}
                type="number"
                placeholder="SIP AMOUNT (500-100K) "
              />

              <input
                value={sip_date}
                onChange={(e) => setSipDate(e.target.value)}
                style={{
                  margin: "10px 10px 10px 10px",
                  border: "2px solid #212426",
                  borderRadius: "5px",
                  padding: "10px 5px 10px 5px",
                  outline: "none",
                }}
                type="number"
                placeholder="ENTER DATE (1-25)"   
            />
            </div>
            <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
              <button
                onClick={(e) => MakeNewSip(e)}
                style={{ width: "100%" }}
                id="mutual-fund-invest-btn"
              >
                {" "}
                Start SIP{" "}
              </button>
            </div>
            <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
              <button
                onClick={(e) => CloseInvestCard(e)}
                style={{ width: "100%" }}
                id="mutual-fund-cancel-btn"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
          {/* //SIP FORM END */}

          {/* //ONE TIME INVESTMENT FORM START */}
          <div
            id="sip-form"
            style={{ display: !isSIPformActive ? "block" : "none" }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                display: "inline-block",
                padding: "10px 10px 10px 10px",
                borderRadius: "12px",
              }}
            >
              <input
                value={oneTimeAmount}
                onChange={(e) => setoneTimeAmount(e.target.value)}
                style={{
                  margin: "10px 10px 10px 10px",
                  borderRadius: "5px",
                  padding: "10px 5px 10px 5px",
                  border: "2px solid #212426",
                  outline: "none",
                }}
                type="number"
                placeholder="ENTER AMOUNT(1k-10k)"
              />
            </div>
            <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
              <button
                onClick={(e) => MakeNewMFOnetime(e)}
                style={{ width: "100%" }}
                id="mutual-fund-invest-btn"
              >
                {" "}
                Make One Time{" "}
              </button>
            </div>
            <div style={{ padding: "10px 0px 10px 0px", width: "100%" }}>
              <button
                onClick={(e) => CloseInvestCard(e)}
                style={{ width: "100%" }}
                id="mutual-fund-cancel-btn"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
          {/* //ONE TIME INVESTMENT FORM END */}
        </div>
      </div>

      {/* //after successfull investment */}
      <div
        id="invest-done"
        style={{ textAlign: "center", display: investDone ? "block" : "none" }}
      >
        <h2 style={{ color: "green" }}>
          {" "}
          Investment Done <i class="fa-solid fa-check"></i>{" "}
        </h2>
      </div>
      {/* //ONE TIME INVESTMENT FORM END */}
    </>
  );
};

export default Mutual_fund;
