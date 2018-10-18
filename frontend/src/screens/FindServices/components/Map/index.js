import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import UsersMap from 'src/screens/FindServices/components/UsersMap';
import { Location, Permissions } from 'expo';

/*
 * Container Map component to show current user position and closest
 * shop position. Renders UserMap 
 * 
 */
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            shop: null,
            errorMessage: '',
        };
    }

    componentDidMount() {
        this.getLocationAsync();
        this.getShopLocation();
    }

    /*
     * Gets the users location and checks for errors with disabled services 
     * 
     */
    getLocationAsync = async () => {
        const { gpsAvailable, locationServicesEnabled } = await Location.getProviderStatusAsync();

        if (!gpsAvailable) {
            const err = 'GPS Unavailable';
            this.setState({ errorMessage: err });
            console.error(err);
        }
        if (!locationServicesEnabled) {
            const err = 'Location services not enabled';
            this.setState({ errorMessage: err });
            console.error(err);
        }

        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            const err = 'Permission to access location was denied';
            this.setState({
                errorMessage: err,
            });
            console.error(err);
        }

        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    /*
     * Gets the closest shop location. Currently dummy data
     * 
     */
    getShopLocation = () => {
        this.setState({
            shop: {
                latitude: 39.72802,
                longitude: -121.83991,
                id: 'the_rek_chico',
            },
        });
    };

    render() {
        const { errorMessage, location, shop } = this.state;

        return (
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.getLocationAsync();
                    }}
                    title="Get Location"
                />
                <Text>{errorMessage}</Text>

                {/* Actually create the user map */}
                <UsersMap userLocation={location} shop={shop} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
