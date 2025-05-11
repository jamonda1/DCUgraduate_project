import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSchedule } from './ScheduleContext';

type RouteParams = {
  params: {
    date: string;
    index: number;
  };
};

const EditScheduleScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { date, index } = route.params;

  const { schedules, updateSchedule, deleteSchedule } = useSchedule();

  // ✅ 일정이 존재하는지 먼저 체크
  const scheduleList = schedules[date];
  const original = scheduleList?.[index];

  if (!original) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 16 }}>
          ❌ 해당 일정이 존재하지 않습니다.
        </Text>
      </View>
    );
  }

  const [title, setTitle] = useState(original.title);
  const [startTime, setStartTime] = useState(original.startTime);
  const [endTime, setEndTime] = useState(original.endTime);

  const handleUpdate = () => {
    updateSchedule(date, index, { date, title, startTime, endTime });
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteSchedule(date, index);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>일정 제목</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>시작 시간</Text>
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
      />

      <Text style={styles.label}>종료 시간</Text>
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>일정 수정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>일정 삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  updateButton: {
    backgroundColor: '#FF6F61',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: '#B0B0B0', // ✅ 회색 (은은한 중간 회색)
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
