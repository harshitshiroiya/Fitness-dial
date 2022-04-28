import { Routes, Route } from 'react-router-dom';
import './App.scss';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './containers/home-page/home-page';
import { LandingPage } from './containers/landing-page/landing-page';
// import {theme} from './theme'
import { Profile } from './components/profile/profile';
import Navbar from './components/navbar/navbar';
import { CustomerTabs, ProfessionalTabs } from './models/tabs';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import store from './store';
import { SubscriptionPlans } from './components/subscription-plan/subscription-plan';
import { Messages } from './components/messages/messages';
import { Notifications } from './components/notifications/Notifications';


function App() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState();
  const location = useLocation();


  useEffect(() => {
    const user = store.getState().userDetails;
    if (Object.keys(user).length > 0) {
      setTabs(user.user_type === 'Customer' ? CustomerTabs : ProfessionalTabs);
    }
    else {
      if (location.pathname.includes('createPass')) {
        return;
      }
      navigate('/login')

    }
  },[])



  store.subscribe(() => {
    const user = store.getState().userDetails;
    if (Object.keys(user).length > 0) {
      setTabs(user.user_type === 'Customer' ? CustomerTabs : ProfessionalTabs);
      navigate('/dashboard');
    }
    else {
      setTabs('');
    }

  });




  return (
    // <ThemeProvider theme={theme}>
    <div className="App" style={{ display: 'flex' }}>

      {tabs && <Navbar tabs={tabs}></Navbar>}
      <div className="app-right-pane" style={{ width: '100%' }}>
        <Routes>
          <Route path='*' element={<LandingPage></LandingPage>}></Route>
          <Route path='dashboard' element={<Home></Home>}></Route>
          <Route path='profile' element={<Profile></Profile>}></Route>
          <Route path='messages' element={<Messages />}></Route>
          <Route path="plan" element={<SubscriptionPlans/>}></Route>
          <Route path="notifications" element={<Notifications/>}></Route>
          <Route element={<div>Not found</div>}></Route>
        </Routes>
      </div>

    </div>
    // </ThemeProvider>
  );
}

export default App;
