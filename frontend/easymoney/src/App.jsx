import React from 'react';
import { BrowserRouter , Routes , Route, Router } from 'react-router-dom';
import Home_hero from './componants/Home_Hero/Home_hero.jsx';
import Signup_page from './Pages/Signup_page/Signup_page.jsx';
import Dashboard from './Pages/User_Dashboard/Dashboard.jsx';
import { GlobleProvider } from './componants/GlobleContext/GlobleContext.jsx';
import Mutual_fund from './Pages/Mutual_fund_page/Mutual_fund.jsx';
import Stocks_page from './Pages/Stocks_page/Stocks_page.jsx';
import User_profile from './Pages/User_Profile/User_profile.jsx';

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
        </Routes>
 
    </BrowserRouter>
</GlobleProvider>
 
    </>
  )
}

export default App