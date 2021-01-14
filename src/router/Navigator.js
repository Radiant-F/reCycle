import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../screens/Home';
import Splash from '../components/Splash';
import Intro from '../components/Intro';
import Drawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';
import Request from '../screens/nasabah/Request';
import ProfileEdit from '../screens/ProfileEdit';
import ConfrimRequest from '../screens/pengurus1/ConfrimRequest';
import Contact from '../screens/Contact';
import Recovery from '../auth/Recovery';
import AddSampah from '../screens/pengurus1/AddSampah';
import SellSampah from '../screens/pengurus2/SellSampah';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Request" component={Request} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="ConfirmRequest" component={ConfrimRequest} />
        <Stack.Screen name="Recovery" component={Recovery} />
        <Stack.Screen name="AddSampah" component={AddSampah} />
        <Stack.Screen name="SellSampah" component={SellSampah} />
        <Stack.Screen name="Nasabah" component={Drawer} />
        <Stack.Screen name="Pengurus1" component={Drawer} />
        <Stack.Screen name="Pengurus2" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
