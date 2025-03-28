import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const handleSearchFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleSearchSubmit = () => {
    if (search.trim() === '') return;
    const updatedList = [search, ...recentSearches.filter(item => item !== search)];
    setRecentSearches(updatedList.slice(0, 10));
    setSearch('');
    Keyboard.dismiss();
  };

  const handleBack = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchBarWrapper, isFocused && styles.searchBarFocused]}>
        {isFocused && (
          <TouchableOpacity onPress={handleBack} style={styles.icon}>
            <Text>←</Text>
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="검색"
          value={search}
          onFocus={handleSearchFocus}
          onChangeText={setSearch}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />

        {isFocused && search !== '' && (
          <TouchableOpacity onPress={handleClear} style={styles.icon}>
            <Text>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 최근 검색어 */}
      <View style={styles.recentWrapper}>
        <Text style={styles.sectionTitle}>최근검색</Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => <Text style={styles.recentItem}>{item}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchBarFocused: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    paddingHorizontal: 8,
  },
  recentWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  recentItem: {
    paddingVertical: 6,
    fontSize: 14,
    color: '#555',
  },
});

export default SearchScreen;
