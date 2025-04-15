import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

const PostWriteScreen = ({ route, navigation }) => {
  // 이전 화면에서 전달받은 데이터
  const { image, date, weather, keywords, writingStyle } = route.params;
  
  // 상태 관리
  const [content, setContent] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);

  // AI 초안 생성
  const generateAIContent = () => {
    setIsAIWriting(true);
    // TODO: AI API 연동
    // 임시로 예시 텍스트 생성
    setTimeout(() => {
      const exampleContent = `안녕하세요! ${date.toLocaleDateString()}에 다녀온 여행 이야기를 들려드릴게요.
      
${writingStyle} 스타일로 작성해볼게요.
${keywords} 키워드를 중심으로 이야기를 풀어나가겠습니다.
${weather} 날씨 속에서의 여행은 정말 특별했어요.`;

      setContent(exampleContent);
      setIsAIWriting(false);
    }, 2000);
  };

  // 게시하기
  const handleSubmit = () => {
    // TODO: 게시 로직 구현
    console.log('게시 완료:', {
      image,
      date,
      weather,
      keywords,
      writingStyle,
      content,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 선택된 정보 표시 */}
      <View style={styles.infoContainer}>
        <Image source={{ uri: image }} style={styles.thumbnail} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>날짜: {date.toLocaleDateString()}</Text>
          <Text style={styles.infoText}>날씨: {weather}</Text>
          <Text style={styles.infoText}>키워드: {keywords}</Text>
          <Text style={styles.infoText}>작성 스타일: {writingStyle}</Text>
        </View>
      </View>

      {/* 내용 작성 영역 */}
      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.label}>내용 작성</Text>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={generateAIContent}
            disabled={isAIWriting}
          >
            <Text style={styles.aiButtonText}>
              {isAIWriting ? 'AI 작성 중...' : 'AI 초안 받기'}
            </Text>
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

      {/* 게시 버튼 */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>게시하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  contentContainer: {
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiButtonText: {
    color: '#fff',
  },
  contentInput: {
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostWriteScreen; 