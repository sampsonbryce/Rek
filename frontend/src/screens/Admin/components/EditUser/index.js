import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, CheckBox } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import GraphqlUtils from 'src/utils/GraphqlUtils';
// import { BERRY_LIGHT_BLUE, BERRY_MAROON } from '../../constants';

const GET_USER = gql`
    query($id: String!){
        user(id: $id) {
            id
            name
            email
            roles {
                user
                employee
                admin
            }
        }
    }
`

/*
 * Admin service for store admins
 */
export default class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            email: null,
            roles: null,
        }
    }

    render(){
        return (
            <View >
                <Query variables={{id:"cjmrairyl001q0a5913h4tuvx"}} query={GET_USER}>
                {({loading, error, data}) => {
                    if(loading) return (<Text>Loading...</Text>);
                    if(error) return (<Text>`Error! ${error.message}`</Text>);
                    
                    let user = data.user;
                    let roles = GraphqlUtils.getRawData(user.roles);
                    console.log(roles);

                    return (
                        <View>
                            <TextInput 
                                onChangeText={(name) => this.setState({name})}
                                value={user.name}
                            />
                            <TextInput 
                                onChangeText={(email) => this.setState({email})}
                                value={user.email}
                            />
                            {Object.keys(roles).map((role, index) => {
                                return(
                                    <View key={index}>
                                        <Text>{role}</Text>
                                        <CheckBox 
                                            title={role}
                                            value={roles[role]}
                                            onValueChange={(val) => {
                                                let state = {"roles": {}};
                                                state.roles[roles[role]] = val;
                                                this.setState(state);
                                                console.log("state", this.state);
                                            }}
                                        />
                                    </View>
                                );

                            })}
                        </View>
                   );
                }}
                </Query>

            </View>
        )
    }
}