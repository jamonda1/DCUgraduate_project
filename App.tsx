import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import CustomTabBar from './screens/CustomTabBar';
import { ScheduleProvider } from './screens/ScheduleContext';

// 화면 컴포넌트 임포트
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import CalendarScreen from './screens/CalendarScreen';
import AddScheduleScreen from './screens/AddScheduleScreen';
import EditScheduleScreen from './screens/EditScheduleScreen';
import MyPageScreen from './screens/MyPageScreen';
import PostSetupScreen from './screens/PostSetupScreen';
import PostWriteScreen from './screens/PostWriteScreen';
import SettingsScreen from './screens/SettingsScreen';
import RecommendScreen from './screens/RecommendScreen';
import EditProfileScreen from './screens/EditProfileScreen';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <ScheduleProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* 로그인 & 회원가입 */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '회원가입' }} />

          {/* 홈 화면 */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: '모행',
              headerTitleAlign: 'left',
              headerTitleStyle: { fontSize: 24, fontWeight: 'bold', color: '#FF6F61' },
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 15 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/622/622669.png' }} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747376.png' }} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              ),
              headerLeft: () => null,
            })}
          />

          {/* 피드 화면 */}
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={({ navigation }) => ({
              title: '피드',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('PostSetup')} style={{ marginRight: 15 }}>
                  <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747376.png' }} style={styles.icon} />
                </TouchableOpacity>
              ),
            })}
          />

          {/* 기타 화면 */}
          <Stack.Screen name="Map" component={MapScreen} options={{ title: '맵' }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: '일정' }} />
          <Stack.Screen name="AddSchedule" component={AddScheduleScreen} options={{ title: '일정 추가' }} />
          <Stack.Screen name="EditSchedule" component={EditScheduleScreen} options={{ title: '일정 수정' }} />
          <Stack.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이페이지' }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: '내정보 수정' }} />
          <Stack.Screen name="PostSetup" component={PostSetupScreen} options={{ title: '포스트 셋업' }} />
          <Stack.Screen name="PostWrite" component={PostWriteScreen} options={{ title: '글 작성' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
          <Stack.Screen name="Recommend" component={RecommendScreen} options={{ title: '설정' }} />
        </Stack.Navigator>
        <ConditionalTabBar />
      </NavigationContainer>
    </ScheduleProvider>
  );
};

const ConditionalTabBar: React.FC = () => {
  const routeName = useNavigationState((state) => {
    if (!state || !state.routes || state.routes.length === 0) return null;
    return state.routes[state.index].name;
  });

  if (routeName === 'Login' || routeName === 'Signup') return null;

  return <CustomTabBar />;
};

// ✅ 스타일 추가
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default App;
