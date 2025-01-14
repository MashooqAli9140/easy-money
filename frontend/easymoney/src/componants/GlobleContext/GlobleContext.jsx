import {createContext } from "react";
import { useState } from "react";

const GlobleContext = createContext();

export const GlobleProvider = ( {children} ) => {
    

    

    return(
        <GlobleContext.Provider>
            { children }
        </GlobleContext.Provider>
    )
}

