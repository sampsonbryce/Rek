import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import UsersMap from 'src/screens/FindServices/components/UsersMap';

export default class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            fakeShop: null,
        }
    }

    componentDidMount(){
        this.getUserLocationHandler();
        this.getShopLocation();
    }
    

    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            this.setState({
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0221,
                    id: "My Location"
                }
            });
        }, err => console.log(err));
    }

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
                <UsersMap
                    userLocation={this.state.userLocation}
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
