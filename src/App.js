import './App.css';
import { Register } from './components/pages/Register';
import Login from './components/pages/Login';
import Movies from './components/pages/Movies'
import { Profiles } from './components/pages/SelectProfiles';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//App View

function App() {
  const [user, setUser] = useState({});

  const userLogInSuccess = (user, token = '') => {
    setUser(user);
    localStorage.setItem('token', token); // Save the token on the local storage
  }


  return (
    <Routes>
      <Route path='/' element={<Login onSuccess={userLogInSuccess} />}></Route>
      <Route path='/profiles' element={<Profiles user={user} />}></Route>
      <Route path='/register' element={<Register onSuccess={userLogInSuccess} />}></Route>
      <Route path='/movies' element={<Movies />}></Route>
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
