import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './componants/Navbar/Navbar.jsx';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';
import Home_Hero_2 from './componants/Home_Hero/Home_Hero_2.jsx';

function App() {


  return (
    <> 
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'  element={ <Home_hero/> } />
        </Routes>
        <Routes>
          <Route path='/'  element={ <Home_Hero_2/> } />
        </Routes>

    </BrowserRouter>
 
    </>
  )
}

export default App
