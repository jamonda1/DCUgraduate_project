import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import api from '../api'; // ✅ 아까 만든 API 모듈 사용
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState(''); // yyyy-mm-dd

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm || !nickname || !birthDate) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
  
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호 오류', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
  
    try {
      const response = await api.post('/api/user/signup', {
        email,
        password,
        passwordConfirm,
        nickname,
        birthDate,
      });
  
      const token = response.data?.token;
  
      if (token) {
        await AsyncStorage.setItem('token', token);
      }
  
      Alert.alert('회원가입 성공!', '로그인 화면으로 이동합니다.');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error(error);
      Alert.alert('회원가입 실패', error.response?.data?.message || '오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor="#999"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        placeholderTextColor="#999"
        value={nickname}
        onChangeText={setNickname}
      />

      <TextInput
        style={styles.input}
        placeholder="생년월일 (YYYY-MM-DD)"
        placeholderTextColor="#999"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginLink}>이미 계정이 있으신가요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FF6F61', marginBottom: 30 },
  input: { width: '80%', borderColor: '#ddd', borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  signupButton: { backgroundColor: '#28a745', width: '80%', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  signupText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  loginLink: { fontSize: 14, color: '#007BFF', marginTop: 10 },
});

export default SignupScreen;
