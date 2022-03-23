import './App.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profiles } from './components/SelectProfiles';

function App() {
  return (
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList mb='1em'>
        <Tab>Login</Tab>
        <Tab>Register</Tab>
        <Tab>Select Profiles</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Register />
        </TabPanel>
        <TabPanel>
          <Profiles />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
