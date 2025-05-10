import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MyPage: undefined;
  EditProfile: undefined;
};

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

interface EditProfileScreenProps {
  navigation: EditProfileScreenNavigationProp;
}

interface UserData {
  name: string;
  email: string;
  profileImage: string;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '홍길동',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/100',
  });

  const pickImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: false,
    }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('사용자가 이미지 선택을 취소했습니다');
      } else if (response.errorCode) {
        Alert.alert('오류', '이미지를 선택하는데 실패했습니다.');
      } else if (response.assets?.[0]?.uri) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.assets![0].uri!,
        }));
      }
    });
  };

  const handleSave = () => {
    // TODO: 실제 API 연동 구현
    Alert.alert(
      '성공',
      '프로필이 성공적으로 수정되었습니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: userData.profileImage }}
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
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
    marginTop: 10,
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  editImageText: {
    color: '#fff',
    fontSize: 14,
  },
  formSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: '600',
  },
});

export default EditProfileScreen; 