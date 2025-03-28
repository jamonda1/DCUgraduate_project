import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';


const dummyFeed = [
  { id: '1', image: 'https://via.placeholder.com/300x200', title: '피드 제목 1', desc: '여기는 피드 내용입니다.' },
  { id: '2', image: 'https://via.placeholder.com/300x200', title: '피드 제목 2', desc: '여기는 피드 내용입니다.' },
  { id: '3', image: 'https://via.placeholder.com/300x200', title: '피드 제목 3', desc: '여기는 피드 내용입니다.' },
];


const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 오늘 일정 카드 */}
      <View style={styles.scheduleCard}>
        <Text style={styles.date}>12.24 화</Text>
        <View style={styles.scheduleList}>
          <Text style={styles.scheduleItem}>오사카 성</Text>
          <Text style={styles.scheduleItem}>맛집 투어</Text>
          <Text style={styles.scheduleItem}>관람차 방문</Text>
        </View>
      </View>

      {/* 피드 리스트 */}
      <FlatList
        data={dummyFeed}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ✅ 일정 카드 스타일 개선
  scheduleCard: {
    backgroundColor: '#FFECEB', // 연한 핑크 배경으로 강조
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // 안드로이드 그림자
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 10,
  },
  scheduleList: {
    borderTopWidth: 1,
    borderTopColor: '#FF6F61',
    paddingTop: 8,
  },
  scheduleItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },

  // 기존 피드 스타일 유지
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


export default HomeScreen;
