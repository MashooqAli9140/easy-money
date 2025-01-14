import React from 'react'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const { id } = useParams();

  return (
    <div>
         <div> 
            <h1> Welcome to Dashboard {id} </h1>
         </div>
    </div>
  )
}

export default Dashboard
