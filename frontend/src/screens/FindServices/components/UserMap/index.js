import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
  let userLocationMarker = null;

  if(props.userLocation) {
    userLocationMarker = <MapView.Marker coordinate={props.userLocation} key={props.userLocation.id}/>
  }

  let shopMarkers = null;

  if(props.shop) {
    shopMarkers = <MapView.Marker coordinate={props.shop} key={props.shop.id}/>
  }

  return (
    <View style={styles.mapContainer}>
    <MapView
    initialRegion={{
      latitude: 39.053421,
      longitude: -97.672577,
      //latitude: 37.78825,
      //longitude: -122.4324,
      latitudeDelta: 25,
      longitudeDelta: 22,
    }}
    region={props.userLocation}
    style={styles.map}>
      {userLocationMarker}
      {shopMarkers}
    </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default usersMap;
