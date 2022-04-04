import './App.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from './components/Login';
import { Register } from './components/Register';
import { Profiles } from './components/SelectProfiles';
import { useState } from 'react';
import { Content } from './components/Content';


//App View

function App() {
  const [user, setUser] = useState({});

  const userLogInSuccess = (user) => {
    console.log(user);
    setUser(user);
  }


  return (
    <Tabs variant='soft-rounded' colorScheme='green' isLazy={true}>
      <TabList mb='1em'>
        <Tab>Login</Tab>
        <Tab >Register</Tab>
        <Tab>Select Profiles</Tab>
        <Tab>Movies And Series</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login onSuccess={userLogInSuccess} />
        </TabPanel>
        <TabPanel>
          <Register onSuccess={userLogInSuccess} />
        </TabPanel>
        <TabPanel >
          <Profiles user={user} />
        </TabPanel>
          <Content/>
        <TabPanel>

        </TabPanel>

      </TabPanels>
    </Tabs>
  );
}

export default App;
