import React, { Component }from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($name: String!, $email: String!, $password: String!){
        signup(name: $name, email: $email, password: $password){
            token
            user{
                id
                name
            }
        }
    }
`

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            error: '',
        }
    }

    signupSubmit(signup_mutation){
        if(this.state.password != this.state.confirm_password){
            this.setState({error: 'Passwords do not match'});
            return;
        }

        signup_mutation();
    }

    render(){
        const { name, email, password } = this.state;
        return (
            <View>
                <Text>Signup</Text>
                {this.state.error ? 
                    (<Text>{this.state.error}</Text>)
                : null}
                <TextInput placeholder="Name" 
                    onChangeText={(text) => this.setState({name: text})}
                />
                <TextInput placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                 />
                <TextInput placeholder="Confirm Password" 
                    onChangeText={(text) => this.setState({confirm_password: text})}
                />
                <Mutation mutation={SIGNUP_MUTATION} variables={{name, email, password}}>
                    {(signup_mutation) => {return (<Button 
                            onPress={this.signupSubmit.bind(this, signup_mutation)}
                            title="Submit"
                    />)}}
                </Mutation>
            </View>
        )
    }
}