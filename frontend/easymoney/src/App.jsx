import React from 'react';
import { BrowserRouter , Routes , Route, Router } from 'react-router-dom';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';
import Signup_page from './Pages/Signup_page/Signup_page.jsx';
import Dashboard from './Pages/User_Dashboard/Dashboard.jsx';
import { GlobleProvider } from './componants/GlobleContext/GlobleContext.jsx';
import Mutual_fund from './Pages/Mutual_fund_page/Mutual_fund.jsx';
import Stocks_page from './Pages/Stocks_page/Stocks_page.jsx';
import User_profile from './Pages/User_Profile/User_profile.jsx';
import Sip_calculator from './Pages/Sip_Calciltor_page/Sip_calculator.jsx';
import Footer from './componants/footer/Footer.jsx';
import ResetPW from './Pages/Reset-password/ResetPW.jsx';


function App() {

  return (
    <> 
<GlobleProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/'  element={ <Home_hero/> } />
          <Route path='/signup'  element={ <Signup_page/> } />
          <Route path='/dashboard/:id'  element={ <Dashboard/> } />
          <Route path='/dashboard/mutualfunds/:id'  element={ <Mutual_fund/> } />
          <Route path='/dashboard/stocks/:id'  element={ <Stocks_page/> } />
          <Route path='/dashboard/userprofile/:id'  element={ <User_profile/> } />
          <Route path='/dashboard/sip-calculator/:id'  element={ <Sip_calculator/> } />
          <Route path='/reset-password/:token'  element={ <ResetPW/> } />
        </Routes>
      <Footer />
    </BrowserRouter>
</GlobleProvider>
 
    </>
  )
}

export default App