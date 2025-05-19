import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  TravelHistory: undefined;
};

type TravelHistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TravelHistory'>;

interface TravelHistoryScreenProps {
  navigation: TravelHistoryScreenNavigationProp;
}

// 임시 데이터
const mockTravelHistory = [
  {
    id: '1',
    title: '제주도 여행',
    date: '2024-03-15',
    duration: '3박 4일',
    image: 'https://via.placeholder.com/150',
    places: ['성산일출봉', '우도', '섭지코지'],
  },
  {
    id: '2',
    title: '부산 여행',
    date: '2024-02-20',
    duration: '2박 3일',
    image: 'https://via.placeholder.com/150',
    places: ['해운대', '감천문화마을', '자갈치시장'],
  },
  {
    id: '3',
    title: '강원도 여행',
    date: '2024-01-10',
    duration: '2박 3일',
    image: 'https://via.placeholder.com/150',
    places: ['강릉', '속초', '양양'],
  },
];

interface TravelHistoryItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  image: string;
  places: string[];
}

const TravelHistoryScreen: React.FC<TravelHistoryScreenProps> = ({ navigation }) => {
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const renderItem = ({ item }: { item: TravelHistoryItem }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date} ({item.duration})</Text>
        <View style={styles.placesContainer}>
          {item.places.map((place: string, index: number) => (
            <Text key={index} style={styles.place}>
              #{place}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.editProfileButton}
        onPress={handleEditProfile}
      >
        <Text style={styles.editProfileButtonText}>내 정보 수정</Text>
      </TouchableOpacity>
      <FlatList
        data={mockTravelHistory}
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
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  placesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  place: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 8,
    marginBottom: 4,
  },
  editProfileButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelHistoryScreen; 