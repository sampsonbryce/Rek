import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export default class UsersMap extends Component{
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidUpdate(){
    console.log('udpating');
    console.log(this.props.userLocation);
    console.log(this.props.shop);
    if(this.props.userLocation && this.props.shop){
      this.fitAllMarkers();
    }
  }


  fitAllMarkers() {
    console.log('user location', this.props.userLocation);
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

    console.log(markers);
    this.map.fitToCoordinates(markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }


  render(){

    let userLocationMarker = null;

    if(this.props.userLocation) {
      userLocationMarker = <MapView.Marker coordinate={this.props.userLocation.coords} key={this.props.userLocation.id}/>
    }

    let shopMarkers = null;

    if(this.props.shop) {
      shopMarkers = <MapView.Marker coordinate={this.props.shop} key={this.props.shop.id}/>
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
        ref={(ref) => { this.map = ref }}
        showUsersLocation={true}
        // initialRegion={{
        //   latitude: 39.053421,
        //   longitude: -97.672577,
        //   //latitude: 37.78825,
        //   //longitude: -122.4324,
        //   latitudeDelta: 25,
        //   longitudeDelta: 22,
        // }}
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
