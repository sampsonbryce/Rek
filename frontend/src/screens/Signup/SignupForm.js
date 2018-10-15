import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';

let Form = t.form.Form;

let SignupType = t.struct({
    name: t.String,
    email: t.String,
    password: t.String,
    confirm_password: t.String,
})

let SignupOptions = {
    fields: {
        password: {
            secureTextEntry: true
        }
    },
    auto: 'placeholders'
}

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
  static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            status: {
                msg: "",
                type: null

            }
        }
    }

    async _submit(signup){
        // get form data
        let value = this.form.getValue();
        if(!value){
            // Validation failed
            this.setState({ status: { msg: "Login or Password is incorrect", type: "error" }})
            return;
        }

        // signup
        let response = null;
        try{
            response = await signup({ variables : value });

        // Error Handling
        }catch(err){
            console.log(JSON.stringify(err));
            // parse error
            let e = err.graphQLErrors[0];
            let msg = null;
            if(e.name == "UniqueFieldAlreadyExists"){
                msg = e.data.message;
            }else{
                msg = e.message
            }
            this.setState({ status: { msg, type: "error" }})
            return;
        }

        // get response data
        let { user, token } = response.data.signup;

        // update redux
        this.props.onUserSignup(user, token);
        // update gui
        this.setState({ status: { msg: "New user created!" }});
        this.props.navigation.navigate("Dashboard")
    }

    render(){
        return (
            <View style={styles.container}>
                {/* Page Status */}
                <Text>{this.state.status.msg}</Text>
                
                {/* Signup Form */}
                <Form
                    ref={(form) => this.form = form }
                    type={SignupType}
                    options={SignupOptions}
                />

                 {/* Submit form button/mutation */}
                <Mutation mutation={SIGNUP_MUTATION}>
                {(signup, { loading }) => {
                    return (<Button
                        onPress={this._submit.bind(this, signup)}
                        title={loading ? "Loading..." : "Signup"}
                    />)
                }}
                </Mutation>
                <Button
                    onPress={() => {this.props.navigation.navigate('Login')}}
                    title="Login"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20
    }
})
