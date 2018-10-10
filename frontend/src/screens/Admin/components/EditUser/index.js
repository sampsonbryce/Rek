import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, CheckBox } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
// import { BERRY_LIGHT_BLUE, BERRY_MAROON } from '../../constants';

var Form = t.form.Form;

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

const UPDATE_USER = gql`

    mutation UpdateUserMutation($id: String!, $name: String!, $email: String!, $roles: UpdateRoleInput!){
        updateUserWithRoles(id: $id, name: $name, email: $email, roles: $roles){
            id
        }
    }
`

var Roles = t.struct({
    user: t.Boolean,
    employee: t.Boolean,
    admin: t.Boolean,
});

var User = t.struct({
    id: t.String,
    name: t.String,
    email: t.String,
    roles: Roles
 });

 const options = {
     fields: {
         id: {
             hidden: true
         }
     },
     auto: 'placeholders'
 }


/*
 * Admin service for store admins
 */
export default class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            status: {
                message: "",
                type: ""

            },
            id:"cjmrairyl001q0a5913h4tuvx"
        }
    }

    async _submit(updateUser, refetch){
        let value = this.form.getValue();
        console.log('value:', value);
        let response = await updateUser({ variables : value });
        console.log("Response", response);
        let id = response.data.updateUserWithRoles.id;

        refetch();
        this.setState({ id, status: { message: "Updated User!" }});
    }

    render(){
        console.log('rendering again');
        return (
            <View>
                <Text>{this.state.status.message}</Text>
                <Query variables={{id: this.state.id}} query={GET_USER}>
                {({loading, error, data, refetch}) => {
                    console.log('loading', loading);
                    if(loading) return (<Text>Loading...</Text>);
                    if(error) return (<Text>`Error! ${error.message}`</Text>);
                    
                    let user = data.user;
                    
                    return (
                        <Mutation mutation={UPDATE_USER}>
                        {(updateUser, {loading, error}) => {
                            if(error) {
                                this.setState({
                                    status: {
                                        message: "Could not update",
                                        type: "error"
                                    }
                                });
                            }

                            return (
                            <View>
                                <Form
                                    ref={(form) => this.form = form }
                                    type={User}
                                    options={options}
                                    value={user}
                                />
                                <Button
                                    title={loading ? "Submitting..." : "Update"}
                                    onPress={this._submit.bind(this, updateUser, refetch)}
                                />
                            </View>
                        )}}
                        </Mutation>
                   );
                }}
                </Query>

            </View>
        )
    }
}