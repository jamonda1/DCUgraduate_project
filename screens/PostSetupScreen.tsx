// PostSetupScreen.tsx

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

const weatherOptions = ['맑음 ☀️', '흐림 ☁️', '비 🌧️', '눈 ❄️', '안개 🌫️'];
const writingStyles = ['일기 형식', '여행 가이드', '감성 에세이', '사진 중심', '정보 공유'];

const PostSetupScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedWritingStyle, setSelectedWritingStyle] = useState(writingStyles[0]);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleNext = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    navigation.navigate('PostWrite', {
      image: selectedImage,
      date: selectedDate,
      weather: selectedWeather,
      title,
      keywords,
      writingStyle: selectedWritingStyle,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text style={styles.imagePickerText}>사진 선택하기 📷</Text>
        )}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="여행 제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>날짜: {selectedDate.toLocaleDateString()}</Text>
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
        <Picker selectedValue={selectedWeather} onValueChange={setSelectedWeather} style={styles.picker}>
          {weatherOptions.map((weather) => (
            <Picker.Item key={weather} label={weather} value={weather} />
          ))}
        </Picker>
      </View>

      <View style={styles.keywordsContainer}>
        <Text style={styles.label}>여행 키워드</Text>
        <TextInput
          style={styles.keywordsInput}
          placeholder="쉼표로 구분 (예: 감성, 도쿄, 맛집)"
          value={keywords}
          onChangeText={setKeywords}
          multiline
        />
      </View>

      <View style={styles.writingStyleContainer}>
        <Text style={styles.label}>작성 스타일</Text>
        <Picker selectedValue={selectedWritingStyle} onValueChange={setSelectedWritingStyle} style={styles.picker}>
          {writingStyles.map((style) => (
            <Picker.Item key={style} label={style} value={style} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 16, paddingBottom: 50 },
  imagePickerButton: {
    height: 200, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 16,
  },
  selectedImage: { width: '100%', height: '100%', borderRadius: 8 },
  imagePickerText: { fontSize: 16, color: '#666' },
  titleContainer: { marginBottom: 16 },
  titleInput: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12, fontSize: 16 },
  datePickerButton: { padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 16 },
  dateText: { fontSize: 16 },
  weatherContainer: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  picker: { backgroundColor: '#f0f0f0', borderRadius: 8 },
  keywordsContainer: { marginBottom: 16 },
  keywordsInput: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12, minHeight: 80, textAlignVertical: 'top' },
  writingStyleContainer: { marginBottom: 16 },
  nextButton: {
    backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16,
  },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PostSetupScreen;
