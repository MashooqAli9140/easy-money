import React from 'react'
import Navbar from "../../componants/Navbar/Navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stocks_page = () => {
      const [ CompanyData , setCompanyData ] = useState([])
      const [ loading ,setloading ] = useState(true);
      const [error , setError ] = useState(null);

      useEffect(() => {
        const fetchStocks = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/get-stock-data`)
            setCompanyData( response.data.data[0] );
            return response.status
          } catch (err) {
            console.error("Error fetching data:", err.message);
          }
          finally{
            setloading(false);
          }
        };
        fetchStocks();
      }, []);
      if (loading) return <h1>Loading data for top 50 companies...</h1>;
      if (error) return <h1>Error: {error}</h1>;
      console.log( "data is this-->", CompanyData );

  return (
 <>
 <Navbar />
    <div>
        <div>
            welcome to stock page
        </div>
    </div>

</>

  )
}

export default Stocks_page
