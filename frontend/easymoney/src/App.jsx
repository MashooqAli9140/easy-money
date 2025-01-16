import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
// import Navbar from './componants/Navbar/Navbar.jsx';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';
import Home_Hero_2 from './componants/Home_Hero/Home_Hero_2.jsx';
import Signup from './componants/signup/Signup.jsx';
import Footer from './componants/footer/Footer.jsx';
import Signup_page from './Pages/Signup_page/Signup_page.jsx';
import Dashboard from './Pages/User_Dashboard/Dashboard.jsx';
import { GlobleProvider } from './componants/GlobleContext/GlobleContext.jsx';
import Mutual_fund from './Pages/Mutual_fund_page/Mutual_fund.jsx';
import Stocks_page from './Pages/Stocks_page/Stocks_page.jsx';

function App() {

  return (
    <> 
<GlobleProvider>
    <BrowserRouter>

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
        <Routes>
          <Route path='/signup'  element={ <Signup_page/> } />
        </Routes>
        <Routes>
          <Route path='/dashboard/:id'  element={ <Dashboard/> } />
        </Routes>
        <Routes>
          <Route path='/dashboard/mutualfunds/:id'  element={ <Mutual_fund/> } />
        </Routes>
        <Routes>
          <Route path='/dashboard/stocks/:id'  element={ <Stocks_page/> } />
        </Routes>
        
    </BrowserRouter>
</GlobleProvider>
 
    </>
  )
}

export default App