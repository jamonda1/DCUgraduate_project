import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const MyPageScreen = ({ navigation }) => {
  // �ӽ� ����� ������
  const userData = {
    name: 'ȫ�浿',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/100',
  };

  return (
    <ScrollView style={styles.container}>
      {/* ������ ���� */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: userData.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
      </View>

      {/* �޴� ���� */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>����</Text>
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>�� ���� ���</Text>
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>������ ����</Text>
          <Text style={styles.menuArrow}>?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>���ƿ��� ����</Text>
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
});

export default MyPageScreen; 