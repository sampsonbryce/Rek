import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

/*
 * Displays the Actual Map of the user and the store
 */
export default class UsersMap extends Component {
    // static properties
    static propTypes = {
        userLocation: PropTypes.shape({
            coords: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number,
            }),
        }),
        shop: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    };

    static defaultProps = {
        userLocation: null,
        shop: null,
    };

    // construct
    constructor(props) {
        super(props);
        this.map = null;
    }

    // Override functions

    componentDidUpdate() {
        const { userLocation, shop } = this.props;
        // Only fit to markers if we have the users location
        if (userLocation && shop) {
            this.fitAllMarkers();
        }
    }

    // Member functions

    /*
     * Fits the map to show the users location and the shops location
     */
    fitAllMarkers() {
        const { userLocation, shop } = this.props;
        const markers = [
            {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            },
            {
                latitude: shop.latitude,
                longitude: shop.longitude,
            },
        ];

        // Calls build in react-native-maps fit function to fit the coordinates
        this.map.fitToCoordinates(markers, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }

    render() {
        const { userLocation, shop } = this.props;
        // Set the user location
        let userLocationMarker = null;
        if (userLocation) {
            userLocationMarker = (
                <MapView.Marker coordinate={userLocation.coords} key={userLocation.id} />
            );
        }

        // set the shop location
        let shopMarkers = null;
        if (shop) {
            shopMarkers = <MapView.Marker coordinate={shop} key={shop.id} />;
        }

        return (
            <View style={styles.mapContainer}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    showUsersLocation
                    // Initial Region shows US
                    initialRegion={{
                        latitude: 39.053421,
                        longitude: -97.672577,
                        latitudeDelta: 25,
                        longitudeDelta: 22,
                    }}
                    region={userLocation}
                    style={styles.map}
                >
                    {userLocationMarker}
                    {shopMarkers}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
