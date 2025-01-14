import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobleContext } from '../../componants/GlobleContext/GlobleContext';

const Dashboard = () => {
  const { id } = useParams();
  const { login , setLogin } = useGlobleContext();
  if( id ) setLogin(true);
  
  return (
    <div>
         <div> 
            <h1> Welcome to Dashboard {id} and id from context { id } </h1>
         </div>
    </div>
  )
}

export default Dashboard
