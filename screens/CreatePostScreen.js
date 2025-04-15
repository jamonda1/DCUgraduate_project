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
  '맑음 ??',
  '흐림 ??',
  '비 ?',
  '눈 ?',
  '안개 ?',
];

const writingStyles = [
  '일기 형식',
  '여행 가이드',
  '감성 에세이',
  '사진 중심',
  '정보 공유',
];

const CreatePostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]);
  const [keywords, setKeywords] = useState('');
  const [selectedWritingStyle, setSelectedWritingStyle] = useState(writingStyles[0]);
  const [content, setContent] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);

  const handleImagePick = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }, (response) => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const generateAIContent = () => {
    // AI 글쓰기 로직 구현
    setIsAIWriting(true);
    // API 호출 및 결과 처리 로직 추가 필요
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text style={styles.imagePickerText}>사진 선택하기 ?</Text>
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
            if (date) setSelectedDate(date);
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
        <Text style={styles.label}>여행 키워드</Text>
        <TextInput
          style={styles.keywordsInput}
          placeholder="여행 키워드를 입력하세요 (쉼표로 구분)"
          value={keywords}
          onChangeText={setKeywords}
          multiline
        />
      </View>

      <View style={styles.writingStyleContainer}>
        <Text style={styles.label}>작성 스타일</Text>
        <Picker
          selectedValue={selectedWritingStyle}
          onValueChange={(value) => setSelectedWritingStyle(value)}
          style={styles.picker}
        >
          {writingStyles.map((style) => (
            <Picker.Item key={style} label={style} value={style} />
          ))}
        </Picker>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.label}>내용 작성</Text>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={generateAIContent}
            disabled={isAIWriting}
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
  keywordsInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  writingStyleContainer: {
    marginBottom: 16,
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