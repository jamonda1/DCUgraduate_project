import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  // 설정 상태 관리
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  // 로그아웃 처리
  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => {
            // TODO: 로그아웃 로직 구현
            console.log('로그아웃');
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 알림 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>푸시 알림</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* 위치 서비스 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>위치</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>위치 서비스</Text>
          <Switch
            value={locationServices}
            onValueChange={setLocationServices}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={locationServices ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* 기타 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기타</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>공지사항</Text>
          <Text style={styles.settingArrow}>?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>고객지원</Text>
          <Text style={styles.settingArrow}>?</Text>
        </TouchableOpacity>
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 15,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
  settingArrow: {
    fontSize: 20,
    color: '#999',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 