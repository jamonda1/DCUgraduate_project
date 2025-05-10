import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// ��ũ�� ����Ʈ
import MyPageScreen from '../screens/MyPageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const MyPageNavigator = () => {
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
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: '������ ����' }}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator; 