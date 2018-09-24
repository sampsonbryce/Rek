import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class UsersMap extends Component{
  render(){

    let userLocationMarker = null;

    if(this.props.userLocation) {
      userLocationMarker = <MapView.Marker coordinate={this.props.userLocation} key={this.props.userLocation.id}/>
    }

    let shopMarkers = null;

    if(this.props.shop) {
      shopMarkers = <MapView.Marker coordinate={this.props.shop} key={this.props.shop.id}/>
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
        showUsersLocation={true}
        initialRegion={{
          latitude: 39.053421,
          longitude: -97.672577,
          //latitude: 37.78825,
          //longitude: -122.4324,
          latitudeDelta: 25,
          longitudeDelta: 22,
        }}
        region={this.props.userLocation}
        style={styles.map}>
          {userLocationMarker}
          {shopMarkers}
        </MapView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mapContainer: {

    width: '100%',
    flex:1,
  },
  map: {
    flex:1,
  },
});
