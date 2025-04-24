import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPageScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MyPage" 
        component={MyPageScreen}
        options={{ title: '����������' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: '����' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 