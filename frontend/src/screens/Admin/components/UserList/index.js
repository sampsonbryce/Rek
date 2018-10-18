import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { BERRY_LIGHT_BLUE, BERRY_MAROON } from 'src/constants';
import UserListItem from './components/UserListItem';

// define graphql queries
const GET_USERS = gql`
    {
        users {
            id
            name
        }
    }
`;

/*
 * Admin Page to show list of users to edit them
 */
export default class UserList extends Component {
    static navigationOptions = {
        // header: null,
        title: 'Users',
    };

    propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    renderListItem(item, index) {
        const { navigation } = this.props;
        return (
            <UserListItem
                name={item.name}
                id={item.id}
                key={item.id}
                index={index}
                navigation={navigation}
            />
        );
    }

    render() {
        return (
            <View style={styles.admin}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Admin</Text>
                </View>
                <Query query={GET_USERS}>
                    {({ loading, error, data }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>`Error! ${error.message}`</Text>;

                        return (
                            <FlatList
                                data={data.users}
                                renderItem={({ item, index }) => this.renderListItem(item, index)}
                                keyExtractor={item => item.id}
                            />
                        );
                    }}
                </Query>
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
