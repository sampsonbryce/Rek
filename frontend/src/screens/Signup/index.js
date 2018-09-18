import React, { Component }from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SignupForm from './Signup';

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



const mapStateToProps = state => {
    return {
        user: state.user

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserSignup: user => {
            dispatch(userLogin(user))
        }
    }
}

const Signup = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);

export default Signup;