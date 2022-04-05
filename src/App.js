import './App.css';
import { Register } from './components/pages/Register';
import Login from './components/pages/Login';
import { Movies } from './components/pages/Movies'
import { Profiles } from './components/pages/SelectProfiles';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from './services/user';
import Search from './components/pages/Search';
import { Series } from './components/pages/Series';

//App View

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser && (location.pathname !== '/' && location.pathname !== '/register')) {
      navigate('/')
    } else if (Object.keys(user).length === 0 && currentUser) {
      setUser(currentUser);
    }
    if ((location.pathname === '/' || location.pathname === '/register') && currentUser) {
      navigate('/profiles', { replace: true }); // Navigate to the profiles
    }

  }, [user, location, navigate]);

  const userLogInSuccess = (user, token = '') => {
    setUser(user);
    localStorage.setItem('token', JSON.stringify(token)); // Save the token on the local storage
    navigate('/profiles', { replace: true }); // Navigate to the profiles
  }


  return (
    <Routes>
      <Route path='/' element={<Login onSuccess={userLogInSuccess} />}></Route>
      <Route path='/profiles' element={<Profiles user={user} />}></Route>
      <Route path='/register' element={<Register onSuccess={userLogInSuccess} />}></Route>
      <Route path='/movies' element={<Movies />}></Route>
      <Route path='/series' element={<Series />}></Route>
      <Route path='/search' element={<Search />}></Route>
    </Routes>
    // <Tabs variant='soft-rounded' colorScheme='green' isLazy={true}>
    //   <TabList mb='1em'>
    //     <Tab>Login</Tab>
    //     <Tab >Register</Tab>
    //     <Tab>Select Profiles</Tab>
    //   </TabList>
    //   <TabPanels>
    //     <TabPanel>
    //       <Login onSuccess={userLogInSuccess} />
    //     </TabPanel>
    //     <TabPanel>
    //       <Register onSuccess={userLogInSuccess} />
    //     </TabPanel>
    //     <TabPanel >
    //       <Profiles user={user} />
    //     </TabPanel>
    //   </TabPanels>
    // </Tabs>
  );
}

export default App;
