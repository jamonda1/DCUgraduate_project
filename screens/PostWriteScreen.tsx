// PostWriteScreen.tsx

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Image, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const PostWriteScreen = ({ route, navigation }: any) => {
  const { image, date, weather, title, keywords, writingStyle } = route?.params || {};
  const [content, setContent] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);

  const generateAIContent = async () => {
    setIsAIWriting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.post(
        '/api/ai/generate-post',
        {
          title,
          keywords: keywords.split(',').map(k => k.trim()),
          writingStyle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data?.content) {
        setContent(response.data.content);
      } else {
        Alert.alert('AI 생성 실패', 'AI가 본문을 생성하지 못했습니다.');
      }
    } catch (err) {
      console.error('AI 요청 오류:', err);
      Alert.alert('오류', 'AI 요청 중 문제가 발생했습니다.');
    } finally {
      setIsAIWriting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      const keywordList = keywords.split(',').map(k => k.trim());
      const hashtagList = keywordList.map(k => `#${k}`);

      formData.append('title', title);
      formData.append('content', content);
      formData.append('keywords', JSON.stringify(keywordList));
      formData.append('style', writingStyle);
      formData.append('hashtags', JSON.stringify(hashtagList));
      formData.append('weather', weather);

      const response = await api.post('/api/posts/with-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('게시 성공!');
        navigation.navigate('Home');
      } else {
        Alert.alert('게시 실패', '서버 오류');
      }
    } catch (err) {
      console.error('요청 실패:', err);
      Alert.alert('게시 실패', '네트워크 오류');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text>이미지 없음</Text>
          </View>
        )}
        <View style={styles.infoTextContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.infoText}>날짜: {date?.toLocaleDateString()}</Text>
          <Text style={styles.infoText}>날씨: {weather}</Text>
          <Text style={styles.infoText}>키워드: {keywords}</Text>
          <Text style={styles.infoText}>스타일: {writingStyle}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.label}>내용 작성</Text>
          <TouchableOpacity style={styles.aiButton} onPress={generateAIContent} disabled={isAIWriting}>
            <Text style={styles.aiButtonText}>{isAIWriting ? 'AI 작성 중...' : 'AI 초안 받기'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.contentInput}
          multiline
          placeholder="여행 이야기를 들려주세요..."
          value={content}
          onChangeText={setContent}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>게시하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  infoContainer: {
    flexDirection: 'row', marginBottom: 16, backgroundColor: '#f0f0f0',
    borderRadius: 8, padding: 12,
  },
  thumbnail: { width: 80, height: 80, borderRadius: 4, marginRight: 12, backgroundColor: '#ddd' },
  infoTextContainer: { flex: 1 },
  titleText: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 14, marginBottom: 4 },
  contentContainer: { marginBottom: 16 },
  contentHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  label: { fontSize: 16, fontWeight: 'bold' },
  aiButton: {
    backgroundColor: '#4CAF50', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 8,
  },
  aiButtonText: { color: '#fff' },
  contentInput: {
    height: 300, backgroundColor: '#f0f0f0',
    borderRadius: 8, padding: 12, textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF', padding: 16,
    borderRadius: 8, alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PostWriteScreen;
