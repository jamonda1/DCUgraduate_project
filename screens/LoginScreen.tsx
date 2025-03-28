import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const LoginScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>모행</Text>

      {/* ✅ 아이디 (이메일) 입력 */}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* ✅ 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* ✅ 일반 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>


      {/* ✅ 카카오 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton} onPress={() => console.log('카카오 로그인')}>
        <Image source={require('../assets/kakao.png')} style={styles.icon} />
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>

     

      {/* ✅ 네이버 로그인 버튼 */}
      <TouchableOpacity style={styles.naverButton} onPress={() => console.log('네이버 로그인')}>
        <Image source={require('../assets/naver.png')} style={styles.icon} />
        <Text style={styles.buttonText}>네이버 로그인</Text>
      </TouchableOpacity>

      {/* ✅ 회원가입 링크 */}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  or: {
    marginVertical: 10,
    color: '#999',
    fontSize: 14,
  },
  kakaoButton: {
    flexDirection: 'row',
    backgroundColor: '#FEE500',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  naverButton: {
    flexDirection: 'row',
    backgroundColor: '#03C75A',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;
