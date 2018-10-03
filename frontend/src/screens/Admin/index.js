import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USERS = gql`
    {
        users {
            id
            name
        }
    }
`


class UserListItem extends Component{
    render(){
        <Text>{this.props.name}</Text>
    }
}

/*
 * Admin service for store admins
 */
export default class Admin extends Component {
    _renderListItem({item}){
        return (<UserListItem 
            name={item.name}
        />);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Text>Admin</Text>
                <Query query={GET_USERS}>
                {(loading, error, data) => {
                    console.log('data1: ', data);
                    if(loading) return (<Text>Loading...</Text>);
                    if(error) return (<Text>`Error! ${error.message}`</Text>);

                    console.log('data', data);
                    return (
                        <FlatList 
                            data={data.users}
                            renderItem={this._renderListItem}
                        />
                    );
                }}
                </Query>

            </View>
        )
    }
}