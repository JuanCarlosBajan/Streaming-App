import './App.css';
import { Register } from './components/pages/Register';
import Login from './components/pages/Login';
import { Movies } from './components/pages/Movies'
import { Profiles } from './components/pages/SelectProfiles';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, getCurrentUserRole, lockProfile, unlockProfile } from './services/user';
import Search from './components/pages/Search';
import { Series } from './components/pages/Series';
import ManageContent from './components/pages/ManageContent';
import ContentReproduction from './components/pages/ContentReproduction';
import UserConfig from './components/pages/userConfig';
import NavMenu from './components/NavMenu';
import { useToast } from '@chakra-ui/react';
import Reports from './components/pages/Reports';
import Simulation from './components/pages/Simulation';

//App View

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    const profileCode = localStorage.getItem('profileCode');
    if (!currentUser && (location.pathname !== '/' && location.pathname !== '/register')) {
      navigate('/')
    } else if (Object.keys(user).length === 0 && currentUser) {
      const currentUserObj = profileCode ? { ...currentUser, profileCode } : { ...currentUser };
      setUser(currentUserObj);
    }

    if (((location.pathname === '/' || location.pathname === '/register') && currentUser)) {
      navigate('/profiles', { replace: true }); // Navigate to the profiles
    } else if (((location.pathname !== '/profiles') && !profileCode && currentUser)) {
      navigate('/profiles', { replace: true }); // Navigate to the profiles
    }


    if (location.pathname === '/manageContent' && getCurrentUserRole().role !== 'admin') {
      console.log('nope')
      navigate('/');
    }


  }, [user, location, navigate]);

  const userLogInSuccess = (user, token = '') => {
    setUser(user);
    localStorage.setItem('token', JSON.stringify(token)); // Save the token on the local storage
    navigate('/profiles', { replace: true }); // Navigate to the profiles
  }

  /**
   * Select an user on the system
   * @param {*} profile 
   */
  const profileSelected = async (profile) => {
    const currentProfile = localStorage.getItem('profileCode');
    if (currentProfile) {
      unlockProfile(currentProfile);  // Unlock the profile that was previously selected
    }
    if (!profile.signedIn || profile.profileCode === currentProfile) {
      localStorage.setItem('profileCode', profile.profileCode);
      lockProfile(profile.profileCode)
      setUser({
        ...user,
        profileCode: profile.profileCode
      });
      navigate('/movies');
    } else {
      toast({
        title: 'El perfil ya est?? viendo contenido.',
        position: 'top',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Login onSuccess={userLogInSuccess} />}></Route>
      <Route path='/profiles' element={<Profiles user={user} onProfileSelect={profileSelected} />}></Route>
      <Route path='/register' element={<Register onSuccess={userLogInSuccess} />}></Route>
      <Route path='/movies' element={
        <>
          <NavMenu />
          <Movies />
        </>
      }></Route>
      <Route path='/series' element={<>
        <NavMenu />
        <Series />
      </>}></Route>
      <Route path='/search' element={<>
        <NavMenu />
        <Search />
      </>}></Route>
      <Route path='/watch' element={
        <>
          <NavMenu />
          <ContentReproduction />
        </>
      }></Route>
      <Route path='/cuenta' element={
        <>
          <NavMenu />
          <UserConfig user={user} />
        </>
      }>
      </Route>
      <Route path='/manageContent' element={
        <>
          <NavMenu />
          <ManageContent />
        </>
      }></Route>
      <Route path='/reports' element={
        <>
          <NavMenu />
          <Reports />
        </>
      }></Route>
      <Route path="/simulation" element={
        <>
          <NavMenu />
          <Simulation />
        </>
      }></Route>
    </Routes >
  );
}

export default App;
