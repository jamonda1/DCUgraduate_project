import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostSetupScreen from '../screens/PostSetupScreen';
import PostWriteScreen from '../screens/PostWriteScreen';

// Stack Navigator ����
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
        options={{ title: '���� ��� ����' }}
      />
      <Stack.Screen 
        name="PostWrite" 
        component={PostWriteScreen}
        options={{ title: '���� ��� �ۼ�' }}
      />
    </Stack.Navigator>
  );
};

export default PostNavigator; 