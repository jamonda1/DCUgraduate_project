import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSchedule } from './ScheduleContext';
import axios from 'axios';

type ScheduleItem = {
  title: string;
  startTime: string;
  endTime: string;
  selected?: boolean;
};

const RecommendScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  const [query, setQuery] = useState('');
  const [recommendedSchedules, setRecommendedSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { addSchedule } = useSchedule();

  const fetchRecommendations = async () => {
    if (!query.trim()) {
      Alert.alert('장소를 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/ai-schedule?query=${encodeURIComponent(query.trim())}`
      );
      const data = response.data;

      const schedules: ScheduleItem[] = [
        { title: data.places.name, startTime: '09:00', endTime: '11:00', selected: false },
        { title: data.foods.name, startTime: '12:00', endTime: '13:30', selected: false },
        { title: data.etc.name, startTime: '15:00', endTime: '16:00', selected: false },
      ];

      setRecommendedSchedules(schedules);
    } catch (error) {
      console.error('추천 요청 실패:', error);
      Alert.alert('오류', '추천 일정을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (index: number) => {
    const updated = [...recommendedSchedules];
    updated[index].selected = !updated[index].selected;
    setRecommendedSchedules(updated);
  };

  const handleDelete = (index: number) => {
    Alert.alert('일정 삭제', '이 일정을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          const newSchedules = [...recommendedSchedules];
          newSchedules.splice(index, 1);
          setRecommendedSchedules(newSchedules);
        },
      },
    ]);
  };

  const handleAddSchedules = () => {
    const selected = recommendedSchedules.filter((s) => s.selected);
    if (selected.length === 0) {
      Alert.alert('선택된 일정이 없습니다.');
      return;
    }

    for (const schedule of selected) {
      addSchedule(selectedDate, {
        date: selectedDate,
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      });
    }

    Alert.alert('일정 추가 완료', '선택한 일정이 추가되었습니다.', [
      { text: '확인', onPress: () => navigation.navigate('Calendar') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI 추천 일정 ({selectedDate})</Text>

      <Text style={styles.label}>어디 주변 일정을 추천받고 싶나요?</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 오사카, 교토, 도쿄..."
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity
        style={styles.recommendButton}
        onPress={fetchRecommendations}
        disabled={!query.trim() || loading}
      >
        <Text style={styles.recommendButtonText}>
          {loading ? 'AI 추천 중...' : 'AI 추천 일정 받기'}
        </Text>
      </TouchableOpacity>

      {recommendedSchedules.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.itemContainer,
            item.selected && { backgroundColor: '#C7F4C2' },
          ]}
          onPress={() => toggleSelection(index)}
          onLongPress={() => handleDelete(index)}
        >
          <Text style={styles.itemText}>
            {item.startTime} - {item.endTime} : {item.title}
          </Text>
          <Text style={styles.deleteText}>터치하면 선택, 길게 누르면 삭제</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddSchedules}
        disabled={recommendedSchedules.filter((s) => s.selected).length === 0}
      >
        <Text style={styles.addButtonText}>선택 일정 추가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  recommendButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  itemText: { fontSize: 16, color: '#333' },
  deleteText: {
    fontSize: 12,
    color: '#FF6F61',
    marginTop: 4,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
