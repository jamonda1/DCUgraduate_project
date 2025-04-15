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

// ���� �ɼ�
const weatherOptions = [
  '���� ??',
  '�帲 ??',
  '�� ?',
  '�� ?',
  '�Ȱ� ?',
];

// �ۼ� ��Ÿ�� �ɼ�
const writingStyles = [
  '�ϱ� ����',
  '���� ���̵�',
  '���� ������',
  '���� �߽�',
  '���� ����',
];

const PostSetupScreen = ({ navigation }) => {
  // ���� ����
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(weatherOptions[0]);
  const [keywords, setKeywords] = useState('');
  const [selectedWritingStyle, setSelectedWritingStyle] = useState(writingStyles[0]);

  // �̹��� ���� �ڵ鷯
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

  // ���� ȭ������ �̵�
  const handleNext = () => {
    navigation.navigate('PostWrite', {
      image: selectedImage,
      date: selectedDate,
      weather: selectedWeather,
      keywords: keywords,
      writingStyle: selectedWritingStyle,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* �̹��� ���� */}
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text style={styles.imagePickerText}>���� �����ϱ� ?</Text>
        )}
      </TouchableOpacity>

      {/* ��¥ ���� */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          ��¥: {selectedDate.toLocaleDateString()}
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

      {/* ���� ���� */}
      <View style={styles.weatherContainer}>
        <Text style={styles.label}>���� ����</Text>
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

      {/* Ű���� �Է� */}
      <View style={styles.keywordsContainer}>
        <Text style={styles.label}>���� Ű����</Text>
        <TextInput
          style={styles.keywordsInput}
          placeholder="���� Ű���带 �Է��ϼ��� (��ǥ�� ����)"
          value={keywords}
          onChangeText={setKeywords}
          multiline
        />
      </View>

      {/* �ۼ� ��Ÿ�� ���� */}
      <View style={styles.writingStyleContainer}>
        <Text style={styles.label}>�ۼ� ��Ÿ��</Text>
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

      {/* ���� ��ư */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>����</Text>
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
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostSetupScreen; 