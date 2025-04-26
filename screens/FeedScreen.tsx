import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// 📌 임시 데이터 (서버 연결 전)
const dummyPosts = [
  { id: '1', user: 'Alice', image: 'https://via.placeholder.com/300', content: '여행은 즐거워!' },
  { id: '2', user: 'Bob', image: 'https://via.placeholder.com/300', content: '멋진 풍경이에요!' },
  { id: '3', user: 'Charlie', image: 'https://via.placeholder.com/300', content: '맛집 탐방 중!' },
  // 계속 추가 가능
];

const FeedScreen = () => {
  const [posts, setPosts] = useState(dummyPosts);

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.username}>{item.user}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  postCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});
