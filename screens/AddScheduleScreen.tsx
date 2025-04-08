import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSchedule } from '../screens/ScheduleContext';

const HOURS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
];

const AddScheduleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addSchedule, updateMarkedDates } = useSchedule();

  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTimeSelect = (time: string) => {
    if (selecting === 'start') setStartTime(time);
    else if (selecting === 'end') setEndTime(time);
    setModalVisible(false);
  };

  const handleAddSchedule = () => {
    if (!title || !startTime || !endTime) return;
    const newSchedule = {
      date: selectedDate,
      title,
      startTime,
      endTime,
    };
    addSchedule(selectedDate, newSchedule);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>📅 {selectedDate}</Text>

      <Text style={styles.label}>무엇을 하나요?</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 기차 타기"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>시작 시간</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => {
          setSelecting('start');
          setModalVisible(true);
        }}>
        <Text>{startTime || '시간 선택'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>종료 시간</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => {
          setSelecting('end');
          setModalVisible(true);
        }}>
        <Text>{endTime || '시간 선택'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
        <Text style={styles.addButtonText}>일정 추가</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>시간 선택</Text>
            <FlatList
              data={HOURS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTimeSelect(item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}>
              <Text style={{ color: '#fff' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#FF6F61',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 8,
  },
});

export default AddScheduleScreen;
