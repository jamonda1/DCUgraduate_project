import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostSetupScreen from '../screens/PostSetupScreen';
import PostWriteScreen from '../screens/PostWriteScreen';

// Stack Navigator 생성
const Stack = createStackNavigator();

const PostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PostSetup"
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
        name="PostSetup" 
        component={PostSetupScreen}
        options={{ title: '여행 기록 설정' }}
      />
      <Stack.Screen 
        name="PostWrite" 
        component={PostWriteScreen}
        options={{ title: '여행 기록 작성' }}
      />
    </Stack.Navigator>
  );
};

export default PostNavigator; 