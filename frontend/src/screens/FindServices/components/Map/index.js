import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import UsersMap from 'src/screens/FindServices/components/UsersMap';
import { Constants, Location, Permissions } from 'expo';

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
        }
    }

    componentDidMount(){
        this._getLocationAsync();
        this.getShopLocation();
    }

    /*
     * Gets the users location and checks for errors with disabled services 
     * 
     */
    _getLocationAsync = async () => {
        let { gpsAvailable, locationServicesEnabled } = await Expo.Location.getProviderStatusAsync();

        if(!gpsAvailable){
            let err = "GPS Unavailable";
            this.setState({errorMessage: err});
            console.error(err);
        }
        if(!locationServicesEnabled){
            let err = "Location services not enabled"
            this.setState({errorMessage: err});
            console.error(err);
        }

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            let err = 'Permission to access location was denied';
            this.setState({
                errorMessage: err,
            });
            console.error(err);
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    /*
     * Gets the closest shop location. Currently dummy data
     * 
     */
    getShopLocation = () => {
        this.setState({
            shop: {
                latitude: 39.728020,
                longitude: -121.839910,
                id: "the_rek_chico",
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {
                    this._getLocationAsync();
                }
                    } title="Get Location" />
                <Text>{this.state.errorMessage}</Text>

                {/* Actually create the user map */}
                <UsersMap
                    userLocation={this.state.location}
                    shop={this.state.shop}
                />
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
