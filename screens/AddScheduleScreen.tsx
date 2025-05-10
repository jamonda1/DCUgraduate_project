import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSchedule } from '../screens/ScheduleContext';

type ScheduleItem = {
  title: string;
  startTime: string;
  endTime: string;
};

const AddScheduleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { addSchedule } = useSchedule();

  // 선택한 날짜: 없으면 오늘 날짜
  const selectedDate =
    route.params?.selectedDate || new Date().toISOString().split('T')[0];

  // RecommendScreen에서 넘어온 추천 일정 (없으면 빈 배열)
  const externalRecommendations: ScheduleItem[] =
    route.params?.aiRecommendations || [];

  // 사용자가 직접 입력하는 일정
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 현재 추천 일정 목록
  const [aiRecommendations, setAIRecommendations] = useState<ScheduleItem[]>([]);

  // 외부에서 넘어온 추천 일정 있으면 자동으로 적용
  useEffect(() => {
    if (externalRecommendations.length > 0) {
      setAIRecommendations(externalRecommendations);
    }
  }, [externalRecommendations]);

  // 직접 입력 일정 추가
  const handleAddManualSchedule = () => {
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

  // AI 추천 일정 받기 버튼 → RecommendScreen 이동
  const handleGoToRecommend = () => {
    navigation.navigate('Recommend', { selectedDate });
  };

  // 추천 일정 모두 추가
  const handleAddAllRecommendations = () => {
    aiRecommendations.forEach((schedule) => {
      const newSchedule = {
        date: selectedDate,
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      };
      addSchedule(selectedDate, newSchedule);
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.dateText}>📅 {selectedDate}</Text>

        {/* 직접 입력 영역 */}
        <Text style={styles.label}>무엇을 하나요?</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 기차 타기"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>시작 시간</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 09:00"
          value={startTime}
          onChangeText={setStartTime}
        />

        <Text style={styles.label}>종료 시간</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 10:00"
          value={endTime}
          onChangeText={setEndTime}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddManualSchedule}
        >
          <Text style={styles.addButtonText}>일정 추가</Text>
        </TouchableOpacity>

        {/* AI 추천 일정 받기 버튼 */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: '#6FA8DC' }]}
          onPress={handleGoToRecommend}
        >
          <Text style={styles.addButtonText}>AI 추천 일정 받기</Text>
        </TouchableOpacity>

        {/* 추천 일정이 있으면 리스트로 표시 */}
        {aiRecommendations.length > 0 && (
          <>
            <Text style={styles.label}>AI 추천 일정</Text>
            <FlatList
              data={aiRecommendations}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.recommendItem}>
                  <Text style={styles.recommendText}>
                    {item.startTime} - {item.endTime} : {item.title}
                  </Text>
                </View>
              )}
              scrollEnabled={false} // ScrollView 안이라 스크롤 비활성화
            />
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: '#28A745' }]}
              onPress={handleAddAllRecommendations}
            >
              <Text style={styles.addButtonText}>추천 일정 모두 추가</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
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
    alignSelf: 'center',
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
  addButton: {
    marginTop: 20,
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
  recommendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recommendText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddScheduleScreen;