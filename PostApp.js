import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PostNavigator from './navigation/PostNavigator';

const PostApp = () => {
  return (
    <NavigationContainer>
      <PostNavigator />
    </NavigationContainer>
  );
};

export default PostApp; 