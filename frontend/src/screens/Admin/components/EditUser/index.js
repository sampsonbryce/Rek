import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, CheckBox } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import StatusBar from 'src/components/StatusBar';
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
export default class EditUser extends Component {
    static navigationOptions = {
        header: null,
        title: 'EditUser',
    }
    constructor(props){
        super(props);
        this.state = {
            value: null,
            status: {
                message: "",
                type: ""

            },
        }
    }

    async _submit(updateUser, refetch){
        let value = this.form.getValue();
        let response = await updateUser({ variables : value });
        let id = response.data.updateUserWithRoles.id;

        // refetch user query
        refetch();
        this.setState({ id, status: { message: "Updated User!", type: "success"}});
    }

    render(){
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        return (
            <StatusBar message={this.state.status.message} type={this.state.status.type}>
                <Query variables={{ id }} query={GET_USER}>
                {({loading, error, data, refetch}) => {
                    if(loading) return (<Text>Loading...</Text>);
                    if(error) return (<Text>`Error! ${error.message}`</Text>);
                    
                    let user = data.user;
                    
                    return (
                    
                            <View>
                                {/* User info form */}
                                <Form
                                    ref={(form) => this.form = form }
                                    type={User}
                                    options={options}
                                    value={user}
                                />

                                {/* Update user mutation button */}
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
                                        <Button
                                            title={loading ? "Submitting..." : "Update"}
                                            onPress={this._submit.bind(this, updateUser, refetch)}
                                        />

                                    )
                                }}
                                </Mutation>
                            </View>
                   );
                }}
                </Query>
            </StatusBar>
        )
    }
}