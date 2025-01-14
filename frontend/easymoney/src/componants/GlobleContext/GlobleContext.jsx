import React from 'react'
import { createContext , useContext , useState } from "react";
import { useParams } from 'react-router-dom';

const GlobleContext = createContext();

export const GlobleProvider = ( {children} ) => {
       const { id } = useParams();


    return(
        <GlobleContext.Provider value={{ id }}>
            { children }
        </GlobleContext.Provider>
    )
}

export const useGlobleContext = () => {
    return useContext(GlobleContext);
}
