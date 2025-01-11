import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './componants/Navbar/Navbar.jsx';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';

function App() {


  return (
    <> 
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'  element={ <Home_hero/> } />
        </Routes>

    </BrowserRouter>
 
    </>
  )
}

export default App
