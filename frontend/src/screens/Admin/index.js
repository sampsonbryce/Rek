import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { BERRY_LIGHT_BLUE, BERRY_MAROON } from '../../constants';

const renderListItem = item => (
    <TouchableHighlight key={item.title} onPress={item.onPress}>
        <Text>{item.title}</Text>
    </TouchableHighlight>
);

/*
 * Admin service for store admins
 */
export default class Admin extends Component {
    static navigationOptions = {
        // header: null,
        title: 'Admin',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    getListItems() {
        const { navigation } = this.props;
        // list items
        const items = [
            {
                title: 'Users',
                onPress: () => {
                    navigation.navigate('UserList');
                },
            },
            {
                title: 'Services',
                onPress: () => {
                    navigation.navigate('ServiceList');
                },
            },
        ];

        return items;
    }

    render() {
        return (
            <View style={styles.admin}>
                <FlatList
                    data={this.getListItems()}
                    renderItem={({ item }) => renderListItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    admin: {
        flex: 1,
        backgroundColor: BERRY_LIGHT_BLUE,
    },
    title: {
        color: 'white',
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: BERRY_MAROON,
        padding: 10,
    },
});
