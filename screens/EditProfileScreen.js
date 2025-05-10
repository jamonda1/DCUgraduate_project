import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setUserData(prev => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Alert.alert('오류', '이미지를 선택하는데 실패했습니다.');
    }
  };

  const handleSave = async () => {
    if (!userData.name.trim()) {
      Alert.alert('오류', '이름을 입력해주세요.');
      return;
    }

    if (!userData.email.trim()) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('성공', '프로필이 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('오류', '프로필 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              userData.profileImage
                ? { uri: userData.profileImage }
                : require('../assets/default-profile.png')
            }
            style={styles.profileImage}
          />
          <View style={styles.editImageButton}>
            <Text style={styles.editImageText}>사진 변경</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
            placeholder="이름을 입력하세요"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(text) => setUserData(prev => ({ ...prev, email: text }))}
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>저장하기</Text>
          )}
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
  profileImageSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  editImageText: {
    color: '#fff',
    fontSize: 12,
  },
  formSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen; 