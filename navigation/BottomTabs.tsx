import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';
import MapScreen from '../screens/MapScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF', // 선택된 탭 색
        tabBarInactiveTintColor: '#999', // 비활성 탭 색
        tabBarLabelStyle: { fontSize: 12 },
        
      }}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="피드" component={FeedScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
