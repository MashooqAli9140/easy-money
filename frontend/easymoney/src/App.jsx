import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './componants/Navbar/Navbar.jsx';

function App() {


  return (
    <> 
    <BrowserRouter>
        <Navbar />

    </BrowserRouter>
 
    </>
  )
}

export default App
