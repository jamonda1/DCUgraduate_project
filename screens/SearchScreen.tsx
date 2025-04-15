import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    '스타벅스',
    '김광석 거리',
    '동성로',
  ]);

  const [recommended, setRecommended] = useState([
    '동성로 맛집',
    '대구 카페거리',
    '대구 야경 명소',
  ]);

  const handleClear = () => setQuery('');
  const handleBack = () => {
    setQuery('');
    // TODO: 뒤로가기 로직 필요 시 추가
  };

  return (
    <View style={styles.container}>
      {/* 상단 검색바 */}
      <View style={styles.searchBarContainer}>
        {query !== '' && (
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={query}
          onChangeText={setQuery}
        />
        {query !== '' && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.avatar}>
          <Ionicons name="person-circle" size={28} />
        </TouchableOpacity>
      </View>

      {/* 최근 검색 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 검색</Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
      </View>

      {/* 추천 검색 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>추천 검색</Text>
        <FlatList
          data={recommended}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
  },
  avatar: {
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
  },
});
