import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm || !nickname || !birthdate) {
      Alert.alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
/*
    try {
      const res = await axios.post('http://5/api/auth/register', {
        email,
        password,
        nickname,
        birthdate,
      });

      Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      Alert.alert('회원가입 실패', message);
    }
  */
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
        keyboardType="email-address"
        autoCapitalize="none"
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
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  signupButton: { backgroundColor: '#FF6F61', padding: 15, borderRadius: 8, marginTop: 10 },
  signupButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default SignupScreen;
