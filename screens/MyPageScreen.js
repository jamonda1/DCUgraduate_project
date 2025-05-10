import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/100',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('사용자 데이터 로딩 실패:', error);
    }
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
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>내 여행 기록</Text>
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>저장한 여행</Text>
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>좋아요한 여행</Text>
          <Text style={styles.menuArrow}>?</Text>
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
  editProfileText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 5,
  },
});

export default MyPageScreen; 