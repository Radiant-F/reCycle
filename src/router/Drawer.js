import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Nasabah from '../screens/nasabah/Home';
import Pengurus1 from '../screens/pengurus1/Home';
import Pengurus2 from '../screens/pengurus2/Home';
import Content from '../screens/Drawer';

const Slide = createDrawerNavigator();

const Drawer = () => {
  return (
    <Slide.Navigator drawerContent={(props) => <Content {...props} />}>
      <Slide.Screen name="Nasabah" component={Nasabah} />
      <Slide.Screen name="Pengurus1" component={Pengurus1} />
      <Slide.Screen name="Pengurus2" component={Pengurus2} />
    </Slide.Navigator>
  );
};

export default Drawer;
