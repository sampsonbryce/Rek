import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserListItem from './components/UserListItem';
import { BERRY_LIGHT_BLUE, BERRY_MAROON } from '../../constants';

const GET_USERS = gql`
    {
        users {
            id
            name
        }
    }
`

/*
 * Admin service for store admins
 */
export default class Admin extends Component {
    static navigationOptions = {
        // header: null,
        title: 'Admin',
    }

    constructor(props){
        super(props);
    }

    _renderListItem({item, index}){
        return (<UserListItem 
            name={item.name}
            id={item.id}
            key={item.id}
            index={index}
            navigation={this.props.navigation}
        />);
    }

    render(){
        return (
            <View style={styles.admin}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Admin</Text>
                </View>
                <Query query={GET_USERS}>
                {({loading, error, data}) => {
                    if(loading) return (<Text>Loading...</Text>);
                    if(error) return (<Text>`Error! ${error.message}`</Text>);

                    return (
                        <FlatList 
                            data={data.users}
                            renderItem={this._renderListItem.bind(this)}
                            keyExtractor={(item, index) => item.id}
                        />
                    );
                }}
                </Query>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    admin:{
        flex:1,
        backgroundColor: BERRY_LIGHT_BLUE,
    },
    title:{
        color:'white',
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: BERRY_MAROON,
        padding: 10,
    }
})

