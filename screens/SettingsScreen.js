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
  // ���� ���� ����
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  // �α׾ƿ� ó��
  const handleLogout = () => {
    Alert.alert(
      '�α׾ƿ�',
      '���� �α׾ƿ� �Ͻðڽ��ϱ�?',
      [
        {
          text: '���',
          style: 'cancel',
        },
        {
          text: '�α׾ƿ�',
          style: 'destructive',
          onPress: () => {
            // TODO: �α׾ƿ� ���� ����
            console.log('�α׾ƿ�');
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* �˸� ���� */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>�˸�</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Ǫ�� �˸�</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* ��ġ ���� ���� */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>��ġ</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>��ġ ����</Text>
          <Switch
            value={locationServices}
            onValueChange={setLocationServices}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={locationServices ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* ��Ÿ ���� */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>��Ÿ</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>��������</Text>
          <Text style={styles.settingArrow}>?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>������</Text>
          <Text style={styles.settingArrow}>?</Text>
        </TouchableOpacity>
      </View>

      {/* �α׾ƿ� ��ư */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>�α׾ƿ�</Text>
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