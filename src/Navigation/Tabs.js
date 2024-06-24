import React from 'react';
import {Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import Api from '../Axios/API';
const MyTabs = () => {
  return (
    <Tab.Navigator
      shifting="true"
      activeColor="purple"
      sceneAnimationType="shifting"
      barStyle={{backgroundColor: 'pink'}}>
      <Tab.Screen
        name="Indian News"
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../Images/india-flag-icon.png')}
              style={{
                width: 28,
                height: 22,
              }}
            />
          ),
        }}>
        {() => <Api country="in" />}
      </Tab.Screen>
      <Tab.Screen
        name="US News"
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../Images/united-states-flag-icon.png')}
              style={{
                width: 28,
                height: 22,
              }}
            />
          ),
        }}>
        {() => <Api country="us" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default MyTabs;
