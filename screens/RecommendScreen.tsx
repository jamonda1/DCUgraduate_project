import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// ✅ 추가된 부분
import axios from 'axios'; // 백엔드 요청용

type ScheduleItem = {
  title: string;
  startTime: string;
  endTime: string;
};

const RecommendScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  const [recommendedSchedules, setRecommendedSchedules] = useState<ScheduleItem[]>([
    { title: '오사카 성 가기', startTime: '09:00', endTime: '11:00' },
    { title: '맛집 투어', startTime: '12:00', endTime: '14:00' },
    { title: '관람차 타기', startTime: '17:00', endTime: '18:00' },
  ]);

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

  // ✅ 기존의 addSchedule 삭제하고 axios 요청으로 변경!
  const handleAddSchedules = async () => {
    if (recommendedSchedules.length === 0) {
      Alert.alert('일정 없음', '추가할 일정이 없습니다.');
      return;
    }

    try {
      // 일정들을 백엔드로 하나씩 추가
      for (const schedule of recommendedSchedules) {
        await axios.post('http://서버주소/schedules', {
          date: selectedDate,
          title: schedule.title,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        });
      }

      Alert.alert('일정 추가 완료', '추천 일정이 추가되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('Calendar'), // ✅ 추가 후 캘린더로 이동
        },
      ]);

    } catch (error) {
      console.error('일정 추가 실패:', error);
      Alert.alert('오류', '일정 추가 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI 추천 일정 ({selectedDate})</Text>

      {recommendedSchedules.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onLongPress={() => handleDelete(index)}
        >
          <Text style={styles.itemText}>
            {item.startTime} - {item.endTime} : {item.title}
          </Text>
          <Text style={styles.deleteText}>길게 누르면 삭제</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddSchedules}
      >
        <Text style={styles.addButtonText}>선택 일정 추가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
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

export default RecommendScreen;