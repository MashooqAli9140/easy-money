import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobleContext } from '../../componants/GlobleContext/GlobleContext';
import './Dashboard.css';

const Dashboard = () => {
  const { id } = useParams();
  const { login , setLogin } = useGlobleContext();
  if( id ){
    setLogin(true)
  };
  
  return (
    <div id='dashboard-hero'> 
          <div id='dashboard-hero-content'>
                 <div>
                    <h1> hello User nice to meet you! </h1>
                    <p>Welcome aboard. Start investing or upload your external wealth to get started.</p>
                 </div>
                 <div style={{marginTop:'20px', flexGrow:"grow",display:"flex", gap:'10px', backgroundColor:"red", padding:"20px 0px 20px 0px"}}>
                         <div style={{ backgroundColor:"green" , width:'100%'}} >
                            <h3> left </h3>
                         </div>
                         <div style={{ backgroundColor:"blue", width:'100%'}} >
                             <h3> right </h3>
                         </div>
                 </div>
          </div>
    </div>
  )
}

export default Dashboard
