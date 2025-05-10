import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'; // baseURL: http://10.0.2.2:8080 로 설정된 axios 인스턴스

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (pageNumber: number) => {
    if (loading || allLoaded) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      if (data.length === 0) {
        setAllLoaded(true);
      } else {
        const mapped = data.map((post: any) => ({
          id: post.id.toString(),
          user: post.authorNickname || '익명',
          image: `http://10.0.2.2:8080/images/${post.imageUrl}`,
          content: post.content,
        }));

        if (pageNumber === 1) {
          setPosts(mapped);
        } else {
          setPosts((prev) => [...prev, ...mapped]);
        }
        setPage(pageNumber + 1);
      }
    } catch (err) {
      console.error('게시글 로딩 실패:', err);
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
      onEndReached={() => fetchPosts(page)}
      onEndReachedThreshold={0.5}
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
