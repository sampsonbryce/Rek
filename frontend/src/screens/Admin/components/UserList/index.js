import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { BERRY_MAROON } from 'src/constants';
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

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    renderListItem(item, index) {
        const { navigation } = this.props;
        return <UserListItem name={item.name} id={item.id} index={index} navigation={navigation} />;
    }

    render() {
        return (
            <View style={styles.admin}>
                <Query query={GET_USERS}>
                    {({ loading, error, data }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>`Error! ${error.message}`</Text>;

                        return (
                            <FlatList
                                data={data.users}
                                renderItem={({ item, index }) => this.renderListItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        );
                    }}
                </Query>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: BERRY_MAROON,
        padding: 10,
    },
});
