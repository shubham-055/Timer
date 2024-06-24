import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ColorContext } from '../Theme/ThemeProvider';

import Home from '../screens/Home';
import Contact from '../screens/Contact';
import Trainees from '../screens/Trainees';
import Mentor from '../screens/MentorInfo';
import Tabs from './Tabs';
import FTimer from '../screens/TimerFunctionalBase';
import ToDoList from '../screens/Todo';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const { isDarkMode, setIsDarkMode, dynamicColors } = useContext(ColorContext);
  const navigation = useNavigation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const screenOptions = ({ navigation }) => ({
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
        <Text style={{ color: dynamicColors.textColor, paddingRight: 5 }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    ),
    headerStyle: {
      backgroundColor: dynamicColors.backgroundColor,
    },
    headerTintColor: dynamicColors.textColor,
  });

  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="Latest News" component={Tabs} />
      <Drawer.Screen name="Timer" component={FTimer} />
      <Drawer.Screen name="ToDoList" component={ToDoList} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
