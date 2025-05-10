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
    name: 'ȫ�浿',
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
        console.log('����ڰ� �̹��� ������ ����߽��ϴ�');
      } else if (response.errorCode) {
        Alert.alert('����', '�̹����� �����ϴµ� �����߽��ϴ�.');
      } else if (response.assets?.[0]?.uri) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.assets![0].uri!,
        }));
      }
    });
  };

  const handleSave = () => {
    // TODO: ���� API ���� ����
    Alert.alert(
      '����',
      '�������� ���������� �����Ǿ����ϴ�.',
      [
        {
          text: 'Ȯ��',
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
            <Text style={styles.editImageText}>���� ����</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>�̸�</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
            placeholder="�̸��� �Է��ϼ���"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>�̸���</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(text) => setUserData(prev => ({ ...prev, email: text }))}
            placeholder="�̸����� �Է��ϼ���"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>�����ϱ�</Text>
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