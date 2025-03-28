import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import CustomTabBar from './screens/CustomTabBar';
import { useNavigationState } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen'; // 홈 화면
import FeedScreen from './screens/FeedScreen'; // 피드 화면 추가
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '모행', headerTitleAlign: 'left', headerTitleStyle: {
          fontSize: 24, fontWeight: 'bold', color: '#FF6F61', },
          headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => console.log('검색 버튼 클릭')}>
            <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/622/622669.png' }} 
            style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          ), headerLeft: () => null, }} />
        <Stack.Screen name="Feed" component={FeedScreen} options={{ title: '피드' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: '맵' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <ConditionalTabBar />
    </NavigationContainer>
  );
};
const ConditionalTabBar: React.FC = () => {
  const routeName = useNavigationState((state) => {
    if (!state || !state.routes || state.routes.length === 0) {
      return null;
    }
    const route = state.routes[state.index];
    return route.name;
  });

  if (routeName === 'Login' || routeName === 'Signup') {
    return null;
  }

  return <CustomTabBar />;
};


export default App;
