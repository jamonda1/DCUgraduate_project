import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSchedule } from './ScheduleContext';
import axios from 'axios'; // ✅ 추가

// ✅ 기본 더미 피드 데이터
const dummyFeed = [
  { id: '1', image: 'https://via.placeholder.com/300x200', title: '피드 제목 1', desc: '여기는 피드 내용입니다.' },
  { id: '2', image: 'https://via.placeholder.com/300x200', title: '피드 제목 2', desc: '여기는 피드 내용입니다.' },
  { id: '3', image: 'https://via.placeholder.com/300x200', title: '피드 제목 3', desc: '여기는 피드 내용입니다.' },
  { id: '4', image: 'https://via.placeholder.com/300x200', title: '피드 제목 4', desc: '여기는 피드 내용입니다.' },
  { id: '5', image: 'https://via.placeholder.com/300x200', title: '피드 제목 5', desc: '여기는 피드 내용입니다.' },
  { id: '6', image: 'https://via.placeholder.com/300x200', title: '피드 제목 6', desc: '여기는 피드 내용입니다.' },
  { id: '7', image: 'https://via.placeholder.com/300x200', title: '피드 제목 7', desc: '여기는 피드 내용입니다.' },
  { id: '8', image: 'https://via.placeholder.com/300x200', title: '피드 제목 8', desc: '여기는 피드 내용입니다.' },
  { id: '9', image: 'https://via.placeholder.com/300x200', title: '피드 제목 9', desc: '여기는 피드 내용입니다.' },
  { id: '10', image: 'https://via.placeholder.com/300x200', title: '피드 제목 10', desc: '여기는 피드 내용입니다.' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { schedules } = useSchedule();

  // ✅ 오늘 날짜
  const today = new Date().toISOString().split('T')[0];
  const todaySchedules = schedules[today] || [];

  // ✅ 피드 데이터 상태
  const [feed, setFeed] = useState(dummyFeed);
  const [loading, setLoading] = useState(true);

  // ✅ 서버에서 피드 가져오기
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // ✅ 서버에 요청 (URL은 너네 서버 주소로 변경!)
        const response = await axios.get('http://서버주소/posts?limit=10');
        if (response.data && response.data.length > 0) {
          setFeed(response.data);
        } else {
          // 데이터가 없으면 더미 사용
          setFeed(dummyFeed);
        }
      } catch (error) {
        console.error('서버 연결 실패, 더미 데이터 사용:', error);
        setFeed(dummyFeed);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 일정 카드 */}
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.date}>{today}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.plusButton}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleList}>
          {todaySchedules.length > 0 ? (
            todaySchedules.map((item, index) => (
              <Text key={index} style={styles.scheduleItem}>
                {item.startTime} - {item.endTime} {item.title}
              </Text>
            ))
          ) : (
            <Text style={styles.scheduleItem}>📭 오늘 일정이 없습니다</Text>
          )}
        </View>
      </View>

      {/* 로딩 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        // 피드 리스트
        <FlatList
          data={feed.slice(0, 10)} // ✅ 최대 10개만 표시
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.feedCard}>
              <Image source={{ uri: item.image }} style={styles.feedImage} />
              <Text style={styles.feedTitle}>{item.title}</Text>
              <Text style={styles.feedDesc}>{item.desc}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scheduleCard: {
    backgroundColor: '#FFECEB',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  plusButton: {
    fontSize: 24,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  scheduleList: {
    borderTopWidth: 1,
    borderTopColor: '#FF6F61',
    paddingTop: 8,
    minHeight: 135,
  },
  scheduleItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  feedCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  feedImage: {
    width: '100%',
    height: 200,
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  feedDesc: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});