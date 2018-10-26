import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import ServiceList from './components/ServiceList';
import Map from './components/Map';

/*
 * Screen for finding services at a Rek store
 */
export default class FindServices extends Component {
    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    static navigationOptions = {
        header: null,
        headerLeft: null,
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Map />
                <ServiceList navigation={navigation} />
            </View>
        );
    }
}
