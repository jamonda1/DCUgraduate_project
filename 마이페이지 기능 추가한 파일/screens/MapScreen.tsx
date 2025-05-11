import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const dummyData = {
  planToGo: [
    { id: '1', name: '동성로 스타벅스', lat: 35.868, lng: 128.595 },
    { id: '2', name: '팔공산 케이블카', lat: 35.8685, lng: 128.606 },
  ],
  visited: [
    { id: '3', name: '근대골목', lat: 35.867, lng: 128.592 },
    { id: '4', name: '김광석 거리', lat: 35.869, lng: 128.599 },
  ],
};

const MapScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'planToGo' | 'visited'>('planToGo');
  const currentData = selectedTab === 'planToGo' ? dummyData.planToGo : dummyData.visited;

  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 35.868,
          longitude: 128.595,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {selectedTab === 'planToGo'
          ? dummyData.planToGo.map((place) => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.lat, longitude: place.lng }}
                title={place.name}
                pinColor="gold"
              />
            ))
          : dummyData.visited.map((place) => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.lat, longitude: place.lng }}
                title={place.name}
                pinColor="green"
              />
            ))}
      </MapView>

      {/* 하단 컨텐츠 */}
      <View style={styles.bottomContainer}>
        {/* 탭 버튼 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'planToGo' && styles.activeTab]}
            onPress={() => setSelectedTab('planToGo')}
          >
            <Text style={styles.tabText}>⭐ 가볼까?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'visited' && styles.activeTab]}
            onPress={() => setSelectedTab('visited')}
          >
            <Text style={styles.tabText}>✅ 갔다 왔다!</Text>
          </TouchableOpacity>
        </View>

        {/* 리스트 */}
        <FlatList
          data={currentData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 0.65,
  },
  bottomContainer: {
    flex: 0.35,
    backgroundColor: '#fff',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#ffefc0',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  item: {
    paddingVertical: 4,
    fontSize: 14,
    color: '#333',
  },
});
