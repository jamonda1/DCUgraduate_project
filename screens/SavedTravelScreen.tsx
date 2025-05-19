import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

// 임시 데이터
const mockSavedTravels = [
  {
    id: '1',
    title: '도쿄 여행 가이드',
    author: '여행작가 김철수',
    image: 'https://via.placeholder.com/150',
    description: '도쿄의 숨은 명소와 맛집을 소개합니다.',
    savedDate: '2024-03-10',
  },
  {
    id: '2',
    title: '파리 로맨틱 여행',
    author: '여행작가 이영희',
    image: 'https://via.placeholder.com/150',
    description: '파리에서 꼭 가봐야 할 로맨틱한 장소들',
    savedDate: '2024-03-05',
  },
  {
    id: '3',
    title: '제주도 맛집 투어',
    author: '여행작가 박지민',
    image: 'https://via.placeholder.com/150',
    description: '제주도 현지인이 추천하는 맛집 리스트',
    savedDate: '2024-03-01',
  },
];

interface TravelItem {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  savedDate: string;
}

const SavedTravelScreen = () => {
  const renderItem = ({ item }: { item: TravelItem }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.savedDate}>저장일: {item.savedDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockSavedTravels}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  savedDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default SavedTravelScreen; 