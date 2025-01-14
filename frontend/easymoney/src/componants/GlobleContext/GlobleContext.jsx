import React, { useEffect } from 'react'
import { createContext , useContext , useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const GlobleContext = createContext();

export const GlobleProvider = ( {children} ) => {
       const [ login , setLogin ] = useState(false);
       const [ login_user , setlogin_user ] = useState( {} )
       const [ login_user_data , setlogin_user_data ] = useState({})


       //create function for getting user data from backend
       useEffect( () => {
        async function GetUserData( ) {
            try {
               const response = await axios.get(`http://localhost:3000/get-user-data/${login_user}`,{

               })
               setlogin_user_data( response.data.userdata )
            } catch (error) {
               console.log(error.msge , "error while getting the data")
            }
      }
      if(login_user) GetUserData();
    },[login_user])


       
    return(
        <GlobleContext.Provider value={{ login , setLogin , login_user , setlogin_user}}>
            { children }
        </GlobleContext.Provider>
    )
}

export const useGlobleContext = () => {
    return useContext(GlobleContext);
}
