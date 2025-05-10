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
      <TouchableOpacity 
        style={styles.profileSection}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Image
          source={{ uri: userData.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.editProfileText}>프로필 수정하기</Text>
        </View>
      </TouchableOpacity>

      {/* 메뉴 섹션 */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>설정</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>내 여행 기록</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>저장한 여행</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
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
  editProfileText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 5,
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