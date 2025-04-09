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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const weatherOptions = [
  '맑음 ☀️',
  '흐림 ☁️',
  '비 🌧',
  '눈 🌨',
  '안개 🌫',
];

// 선택 가능한 여행 키워드들
const tripKeywords = [
  '힐링여행',
  '맛집투어',
  '문화탐방',
  '자연탐험',
  '도시여행',
  '쇼핑여행',
];

const CreatePostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 저장
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜 저장
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부
  const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]); // 선택한 날씨
  const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드들
  const [content, setContent] = useState(''); // 작성된 게시글 내용
  const [isAIWriting, setIsAIWriting] = useState(false); // AI 글쓰기 진행 상태

  // 이미지 선택 핸들러
  const handleImagePick = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }, (response) => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.assets[0].uri); // 선택한 이미지의 uri 저장
      }
    });
  };

  // 키워드 선택/해제 핸들러
  const toggleKeyword = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      // 이미 선택된 키워드라면 제거
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      // 선택되지 않은 키워드라면 추가
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  // AI 글쓰기 요청 핸들러
  const generateAIContent = () => {
    setIsAIWriting(true);
    // 실제 AI API 호출 로직을 나중에 여기에 추가
    console.log('AI 글쓰기 요청됨');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text style={styles.imagePickerText}>사진 선택 📸</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          날짜: {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date); // 날짜 선택 시 상태 업데이트
          }}
        />
      )}

      <View style={styles.weatherContainer}>
        <Text style={styles.label}>날씨 선택</Text>
        <Picker
          selectedValue={selectedWeather}
          onValueChange={(value) => setSelectedWeather(value)}
          style={styles.picker}
        >
          {weatherOptions.map((weather) => (
            <Picker.Item key={weather} label={weather} value={weather} />
          ))}
        </Picker>
      </View>

      <View style={styles.keywordsContainer}>
        <Text style={styles.label}>여행 키워드 선택</Text>
        <View style={styles.keywordsList}>
          {tripKeywords.map((keyword) => (
            <TouchableOpacity
              key={keyword}
              style={[
                styles.keywordButton,
                selectedKeywords.includes(keyword) && styles.selectedKeyword, // 선택 시 스타일
              ]}
              onPress={() => toggleKeyword(keyword)} // 키워드 선택/해제
            >
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.label}>내용 작성</Text>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={generateAIContent}
            disabled={isAIWriting} // AI 요청 중엔 비활성화
          >
            <Text style={styles.aiButtonText}>
              {isAIWriting ? 'AI 작성 중...' : 'AI 작성 요청'}
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

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>게시하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imagePickerButton: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#666',
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
  },
  weatherContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  keywordsContainer: {
    marginBottom: 16,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedKeyword: {
    backgroundColor: '#007AFF',
  },
  keywordText: {
    color: '#333',
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
    height: 200,
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

export default CreatePostScreen;
