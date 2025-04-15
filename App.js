import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PostNavigator from './src/navigation/PostNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PostNavigator />
    </NavigationContainer>
  );
};

export default App;
