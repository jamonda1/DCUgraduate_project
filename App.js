import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyPageNavigator from './navigation/MyPageNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MyPageNavigator />
    </NavigationContainer>
  );
};

export default App; 