import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import UsersMap from 'src/screens/FindServices/components/UsersMap';
import { Constants, Location, Permissions } from 'expo';

export default class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
            location: null,
            fakeShop: null,
            errorMessage: '',
        }
    }

    componentDidMount(){
        console.log('mounted');
        // this.getUserLocationHandler();
        this._getLocationAsync();


        this.getShopLocation();
    }

    _getLocationAsync = async () => {
        let { gpsAvailable, locationServicesEnabled }= await Expo.Location.getProviderStatusAsync();
        console.log('gps: ', gpsAvailable);
        console.log('locationServices: ', locationServicesEnabled);

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log('status: ', status);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('location:', location);
        this.setState({ location });
    };

    

    // getUserLocationHandler(){
    //     console.log('getting location');
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log('setting position', position);
    //             this.setState({
    //                 userLocation: {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     latitudeDelta: 0.0622,
    //                     longitudeDelta: 0.0221,
    //                     id: "My Location"
    //                 }
    //             });
    //         }, (error) => {console.error('error', error);}
    //     )
    // }

    getShopLocation = () => {
        this.setState({
            fakeShop: {
                latitude: 39.728020,
                longitude: -121.839910,
                id: "Fake Shop",
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {
                //     this._getLocationAsync().then((success) => {
                //         console.log("success", success);
                //     }, (err) =>{
                //         console.error("error", err);
                //     });
                // }
                console.log(await this._getLocationAsync());
                }
                    } title="Get Location" />
                <Text>{this.state.errorMessage}</Text>
                <UsersMap
                    userLocation={this.state.location}
                    shop={this.state.fakeShop}
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    green: {
        color: 'green',
    },
});
