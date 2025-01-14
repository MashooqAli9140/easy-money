import React, { useEffect } from 'react'
import { createContext , useContext , useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const GlobleContext = createContext();

export const GlobleProvider = ( {children} ) => {
       const [ login , setLogin ] = useState(false);
       const [ login_user , setlogin_user ] = useState({})


       //create function for getting user data from backend
       useEffect( () => {
        async function GetUserData( ) {
            try {
               const response = await axios.get(`http://localhost:3000/get-user-data/${login_user}`,{

               })
               return response.status(200).json({'msge':"user data get success"})
            } catch (error) {
               console.log(error.msge , "error while getting the data")
               alert("user data not get");
            }
      }
      GetUserData()
    },login_user)


       
    return(
        <GlobleContext.Provider value={{ login , setLogin , login_user , setlogin_user}}>
            { children }
        </GlobleContext.Provider>
    )
}

export const useGlobleContext = () => {
    return useContext(GlobleContext);
}
