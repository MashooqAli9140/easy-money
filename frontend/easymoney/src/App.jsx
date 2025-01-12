import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './componants/Navbar/Navbar.jsx';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';
import Home_Hero_2 from './componants/Home_Hero/Home_Hero_2.jsx';
import Signup from './componants/signup/Signup.jsx';
import Footer from './componants/footer/Footer.jsx';

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
        <Routes>
          <Route path='/'  element={ <Signup/> } />
        </Routes>
        <Routes>
          <Route path='/'  element={ <Footer/> } />
        </Routes>

    </BrowserRouter>
 
    </>
  )
}

export default App
