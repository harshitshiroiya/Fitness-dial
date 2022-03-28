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
import { getUserDetails } from './services/user.service';
import { useNavigate } from 'react-router-dom';
import { Search } from './components/search/search';
import store from './store';
import { Messages } from './components/messages/messages';


function App() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<any>();

  useEffect(()=>{
    const user = store.getState().userDetails;
    if (Object.keys(user).length>0) {
      setTabs(user.user_type === 'Customer' ? CustomerTabs : ProfessionalTabs);
    }
    else {
      navigate('/login');
    }
  },[])

  
  store.subscribe(() => {
    const user = store.getState().userDetails;
    if (Object.keys(user).length>0) {
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
          <Route path='messages' element={<Messages/>}></Route>
          <Route element={<div>Not found</div>}></Route>
        </Routes>
      </div>

    </div>
    // </ThemeProvider>
  );
}

export default App;
