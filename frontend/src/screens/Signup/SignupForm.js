import React, { Component } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($name: String!, $email: String!, $password: String!){
        signup(name: $name, email: $email, password: $password){
            token
            user{
                id
                name
                email
            }
        }
    }
`

export default class SignupForm extends Component{
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

    validate(){
        if(this.state.password == this.state.confirm_password){
            return true;
        }
        else{
            this.setState({error: "Password do not match!"});
            return false;
        }
    }

    render(){
        const { name, email, password } = this.state;
        console.log(this.props);
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
                <Mutation 
                    mutation={SIGNUP_MUTATION} 
                    variables={{ name, email, password }}
                    onCompleted={(data) => {
                        let { signup: {user, token}} = data;
                        console.log('on user signup:', this.props.onUserSignup, user, token);
                        this.props.onUserSignup(user, token);
                    }}
                >{(signup, { loading, error }) => {
                    let title = loading ? "Loading...": "Signup";
                    return (<Button
                        onPress={() => {
                            if(!this.validate()) return;
                            signup();
                        }}
                        title={title}
                    />)
                }}
                </Mutation>

                <Text>User: { this.props.user ? this.props.user.name : ""}</Text>
                <Text>Token: { this.props.token ? this.props.token : ""}</Text>
            </View>
        )
    }
}
