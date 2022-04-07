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


  }, [user, location, navigate]);

  const userLogInSuccess = (user, token = '') => {
    setUser(user);

    localStorage.setItem('token', JSON.stringify(token)); // Save the token on the local storage
    navigate('/profiles', { replace: true }); // Navigate to the profiles
  }

  /**
   * Select an user on the system
   * @param {number} profileCode 
   */
  const profileSelected = (profileCode) => {
    localStorage.setItem('profileCode', profileCode);
    setUser({
      ...user,
      profileCode
    });
  }

  return (
    <Routes>
      <Route path='/' element={<Login onSuccess={userLogInSuccess} />}></Route>
      <Route path='/profiles' element={<Profiles user={user} onProfileSelect={profileSelected} />}></Route>
      <Route path='/register' element={<Register onSuccess={userLogInSuccess} />}></Route>
      <Route path='/movies' element={<Movies />}></Route>
      <Route path='/series' element={<Series />}></Route>
      <Route path='/search' element={<Search />}></Route>
    </Routes>
  );
}

export default App;
