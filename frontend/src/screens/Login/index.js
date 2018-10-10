import { userLogin } from '../../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'src/components/Button';
import t from 'tcomb-form-native';

let Form = t.form.Form;

let LoginType = t.struct({
    email: t.String,
    password: t.String,
})

let LoginOptions = {
    fields: {
        password: {
            password: true
        }
    },
    auto: 'placeholders'
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                id
                name
                email
            }
        }
    }
`

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: {
                msg: "",
                type: null

            }
        }
    }

    // Handle form submition
    async _submit(login){
        // get form data
        let value = this.form.getValue();
        if(!value){
            // Validation failed
            this.setState({ status: { msg: "Login or Password is incorrect", type: "error" }})
            return;
        }
        console.log('value:', value);
        // login
        let response = null;
        try{
            response = await login({ variables : value });
        }catch(err){
            let e = err.graphQLErrors[0];
            this.setState({ status: { msg: e.message, type: "error" }})
            return;
        }

        console.log("Response", response);
        // get response data
        let { user, token } = response.data.login;

        // update redux
        this.props.onUserLogin(user, token);
        // update gui
        this.setState({ status: { message: "User Logged in!" }});
        this.props.navigation.navigate("FindServices")
    }

    render(){
        return (
            <View>

                <Text>{this.state.status.msg}</Text>

                {/* Render Form */}
                <Form 
                    ref={(form) => this.form = form }
                    type={LoginType}
                    options={LoginOptions}
                />

                {/* Login submit mutation */}
                <Mutation
                    mutation={LOGIN_MUTATION}
                    onCompleted={(data) => {
                        let { login: {user, token}} = data;
                        this.props.onUserLogin(user, token);
                    }}
                >{(login, { loading, error }) => {
                    return (<Button
                        onPress={this._submit.bind(this, login)}
                        title={loading ? "Loading..." : "Login"}
                    />)
                }}
                </Mutation>

                {/* Signup link */}
                <Button
                  title="Signup"
                  onPress={()=> {
                      this.props.navigation.navigate("Signup")
                    }
                  }
                />
            </View>
        )
    }
}



const mapStateToProps = state => {
    return {
        user: state.user,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (user, token) => {
            dispatch(userLogin(user, token));
        }
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default Login;
