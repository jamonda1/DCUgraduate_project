import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 화면 import
import CreatePostScreen from './screens/CreatePostScreen'; // ✅ 방금 보내주신 파일
import LoginScreen from './screens/LoginScreen'; // 로그인 화면
import SignupScreen from './screens/SignupScreen'; // 회원가입 화면

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreatePost"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
