import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MyPage: undefined;
  EditProfile: undefined;
  Settings: undefined;
  TravelHistory: undefined;
  SavedTravel: undefined;
  LikedTravel: undefined;
};

type MyPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;

interface MyPageScreenProps {
  navigation: MyPageScreenNavigationProp;
}

interface UserData {
  name: string;
  email: string;
  profileImage: string;
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {
  // 임시 사용자 데이터
  const userData: UserData = {
    name: '홍길동',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/100',
  };

  return (
    <ScrollView style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: userData.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 메뉴 섹션 */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>설정</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('TravelHistory')}
        >
          <Text style={styles.menuText}>내 여행 기록</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('SavedTravel')}
        >
          <Text style={styles.menuText}>저장한 여행</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('LikedTravel')}
        >
          <Text style={styles.menuText}>좋아요한 여행</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 20,
    color: '#999',
  },
});

export default MyPageScreen; 