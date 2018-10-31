import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { BERRY_LIGHT_BLUE, BERRY_BLUE } from '../../constants';

const renderListItem = (item, index) => {
    const item_styles = [styles.item];

    // cycle dark blue color
    if (index % 2 === 0) {
        item_styles.push(styles.darkblue);
    }

    return (
        <TouchableHighlight style={item_styles} key={item.title} onPress={item.onPress}>
            <Text>{item.title}</Text>
        </TouchableHighlight>
    );
};

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
                    renderItem={({ item, index }) => renderListItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
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
    item: {
        paddingLeft: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    darkblue: {
        backgroundColor: BERRY_BLUE,
    },
});
