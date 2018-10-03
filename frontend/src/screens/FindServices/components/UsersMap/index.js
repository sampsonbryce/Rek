import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
// import MapView from 'react-native-maps';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

/*
 * Displays the Actual Map of the user and the store
 */
export default class UsersMap extends Component{
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidUpdate(){
    // Only fit to markers if we have the users location
    if(this.props.userLocation && this.props.shop){
      this.fitAllMarkers();
    }
  }

  /*
   * Fits the map to show the users location and the shops location
   */
  fitAllMarkers() {
    let markers = [
      {
        latitude: this.props.userLocation.coords.latitude,
        longitude: this.props.userLocation.coords.longitude
      },
      {
        latitude: this.props.shop.latitude,
        longitude: this.props.shop.longitude
      },
    ];

    // Calls build in react-native-maps fit function to fit the coordinates
    this.map.fitToCoordinates(markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }


  render(){

    // Set the user location
    let userLocationMarker = null;
    if(this.props.userLocation) {
      userLocationMarker = <MapView.Marker coordinate={this.props.userLocation.coords} key={this.props.userLocation.id}/>
    }

    // set the shop location
    let shopMarkers = null;
    if(this.props.shop) {
      shopMarkers = <MapView.Marker coordinate={this.props.shop} key={this.props.shop.id}/>
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
        ref={(ref) => { this.map = ref }}
        showUsersLocation={true}
        // Initial Region shows US
        initialRegion={{
          latitude: 39.053421,
          longitude: -97.672577,
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
