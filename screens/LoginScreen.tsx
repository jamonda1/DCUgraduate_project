import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
     /* Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.'); */
      navigation.navigate('Home');
      return;
    }
/*
    try {
      const response = await axios.post('http://서버주소/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);

      Alert.alert('로그인 성공!');
      navigation.navigate('Home'); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 틀렸습니다.');
    } */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>모행</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={() => console.log('카카오 로그인')}>
        <Image source={require('../assets/kakao.png')} style={styles.icon} />
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.naverButton} onPress={() => console.log('네이버 로그인')}>
        <Image source={require('../assets/naver.png')} style={styles.icon} />
        <Text style={styles.buttonText}>네이버 로그인</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        아직 회원이 아니신가요?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          회원가입
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#FF6F61', marginBottom: 30 },
  input: { width: '80%', borderColor: '#ddd', borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  loginButton: { backgroundColor: '#007BFF', width: '80%', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  loginText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  kakaoButton: { flexDirection: 'row', backgroundColor: '#FEE500', width: '80%', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  naverButton: { flexDirection: 'row', backgroundColor: '#03C75A', width: '80%', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  buttonText: { fontSize: 16, color: '#000', marginLeft: 8 },
  signupText: { marginTop: 20, fontSize: 14, color: '#666' },
  signupLink: { fontWeight: 'bold', color: '#007BFF' },
  icon: { width: 24, height: 24 },
});

export default LoginScreen;
