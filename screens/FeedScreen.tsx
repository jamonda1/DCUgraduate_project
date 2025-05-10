import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// 📌 기본 더미 데이터
const dummyPosts = [
  { id: '1', user: 'Alice', image: 'https://via.placeholder.com/300', content: '여행은 즐거워!' },
  { id: '2', user: 'Bob', image: 'https://via.placeholder.com/300', content: '멋진 풍경이에요!' },
  { id: '3', user: 'Charlie', image: 'https://via.placeholder.com/300', content: '맛집 탐방 중!' },
];

const FeedScreen = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [page, setPage] = useState(1); // 페이지 넘버 (서버에 요청할 때 사용)
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false); // 더 이상 데이터 없으면 true

  // ✅ 초기에 게시글 불러오기
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // ✅ 서버에서 게시글 가져오기 (페이지별)
  const fetchPosts = async (pageNumber: number) => {
    if (loading || allLoaded) return;

    setLoading(true);

    try {
      const response = await axios.get(`http://서버주소/posts?page=${pageNumber}`);
      const newPosts = response.data;

      if (newPosts.length === 0) {
        setAllLoaded(true); // 더 이상 데이터 없으면
      } else {
        if (pageNumber === 1) {
          setPosts(newPosts); // 첫 페이지면 덮어쓰기
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]); // 추가
        }
        setPage(pageNumber + 1); // 다음 페이지로
      }

    } catch (error) {
      console.error('서버 연결 실패, 더미 데이터 유지:', error);
      // 서버 연결 실패 → 더미 데이터 유지 (posts 상태 변하지 않음)
    } finally {
      setLoading(false);
    }
  };

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
      onEndReached={() => fetchPosts(page)} // ✅ 스크롤이 끝에 닿으면 다음 페이지 요청
      onEndReachedThreshold={0.5} // 리스트 50% 이하 남으면 실행
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#007AFF" />}
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