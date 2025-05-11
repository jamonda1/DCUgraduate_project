import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

// �ӽ� ������
const mockLikedTravels = [
  {
    id: '1',
    title: '���� �߰� ���',
    author: '�����۰� ��μ�',
    image: 'https://via.placeholder.com/150',
    likes: 1234,
    likedDate: '2024-03-15',
  },
  {
    id: '2',
    title: '�λ� ī�� ����',
    author: 'ī���� ������',
    image: 'https://via.placeholder.com/150',
    likes: 856,
    likedDate: '2024-03-12',
  },
  {
    id: '3',
    title: '���ֵ� ���� ����',
    author: '�����۰� �ڼ���',
    image: 'https://via.placeholder.com/150',
    likes: 2345,
    likedDate: '2024-03-10',
  },
];

interface LikedTravelItem {
  id: string;
  title: string;
  author: string;
  image: string;
  likes: number;
  likedDate: string;
}

const LikedTravelScreen = () => {
  const renderItem = ({ item }: { item: LikedTravelItem }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <View style={styles.likeContainer}>
          <Text style={styles.likes}>?? {item.likes.toLocaleString()}</Text>
          <Text style={styles.likedDate}>���ƿ��� ��¥: {item.likedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockLikedTravels}
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
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  likes: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  likedDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default LikedTravelScreen; 