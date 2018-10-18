import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation/lib/dist/Navigation';
import ServiceListItem from '../ServiceListItem';

/*
 * FlatList of people available to provide a searched service
 * Renders ServiceListItem
 * Uses dummy data
 */
export default class ServiceList extends Component {
    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Bob',
                    title: 'Barber',
                    services: ['Cutting', 'Grooming', 'Styling', 'Shaving'],
                },
                { name: 'Dave', title: 'Pedicurist', services: ['Pedicure'] },
                { name: 'Brian', title: 'Masseur', services: ['Head', 'Back', 'Full body'] },
                { name: 'Janice', title: 'Manicurist', services: ['Manicure'] },
            ],
        };
    }

    render() {
        const { data } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.list}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <ServiceListItem
                            name={item.name}
                            title={item.title}
                            services={item.services}
                            navigation={navigation}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    item: {
        flex: 1,
        width: 300,
        backgroundColor: 'red',
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
});
