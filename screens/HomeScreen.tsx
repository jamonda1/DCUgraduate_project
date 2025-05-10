// HomeScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
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
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useSchedule } from './ScheduleContext';
import api from '../api';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { schedules } = useSchedule();
  const today = new Date().toISOString().split('T')[0];
  const todaySchedules = schedules[today] || [];

  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const response = await api.get('/api/posts');
      if (response.data && response.data.length > 0) {
        const mappedFeed = response.data.map((post: any) => ({
          id: post.id.toString(),
          image: `http://10.0.2.2:8080/images/${post.imageUrl}`,
          title: post.title,
          desc: post.content,
        }));
        setFeed(mappedFeed);
      } else {
        setFeed([]);
      }
    } catch (error) {
      console.error('게시글 불러오기 실패:', error);
      setFeed([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if ((route as any)?.params?.refresh) {
        fetchFeed();
        navigation.setParams?.({ refresh: false });
      }
    }, [(route as any)?.params?.refresh])
  );

  return (
    <SafeAreaView style={styles.container}>
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

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={feed}
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
  container: { flex: 1, backgroundColor: '#fff' },
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
  date: { fontSize: 18, fontWeight: 'bold', color: '#FF6F61' },
  plusButton: { fontSize: 24, color: '#FF6F61', fontWeight: 'bold' },
  scheduleList: {
    borderTopWidth: 1,
    borderTopColor: '#FF6F61',
    paddingTop: 8,
    minHeight: 135,
  },
  scheduleItem: { fontSize: 16, marginBottom: 6, color: '#333' },
  feedCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  feedImage: { width: '100%', height: 200 },
  feedTitle: { fontSize: 16, fontWeight: 'bold', padding: 8 },
  feedDesc: { fontSize: 14, color: '#555', paddingHorizontal: 8, paddingBottom: 8 },
});
