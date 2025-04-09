import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>홈 화면입니다 (지도는 추후 추가 예정)</Text>

      {/* 
      🚧 지도 기능은 준비 중입니다
      
      import { PermissionsAndroid, Platform } from 'react-native';
      import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
      import Geolocation from '@react-native-community/geolocation';

      const [region, setRegion] = useState<Region>({
        latitude: 37.5665,
        longitude: 126.9780,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      useEffect(() => {
        const getCurrentLocation = async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

          Geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              setRegion({ ...region, latitude, longitude });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true, timeout: 15000 }
          );
        };

        getCurrentLocation();
      }, []);
      
      <MapView
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
      >
        <Marker coordinate={region} title="내 위치" />
      </MapView>
      */}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  map: {
    flex: 1,
  },
});
