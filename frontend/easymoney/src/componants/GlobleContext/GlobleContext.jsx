import React from 'react'
import { createContext , useContext , useState } from "react";
import { useParams } from 'react-router-dom';

const GlobleContext = createContext();

export const GlobleProvider = ( {children} ) => {
       const [ login , setLogin ] = useState(false);
       const [ login_user , setlogin_user ] = useState({})
       
    return(
        <GlobleContext.Provider value={{ login , setLogin }}>
            { children }
        </GlobleContext.Provider>
    )
}

export const useGlobleContext = () => {
    return useContext(GlobleContext);
}
