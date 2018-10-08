import { userLogin } from '../../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
            email: '',
            password: '',
            error: '',
        }
    }

    validate(){
        return true;
    }

    render(){
        const { email, password } = this.state;
        return (
            <View>
                <Text>Signup</Text>
                {this.state.error ? 
                    (<Text>{this.state.error}</Text>)
                : null}
                <TextInput placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                 />
                <Mutation 
                    mutation={LOGIN_MUTATION} 
                    variables={{ email, password }}
                    onCompleted={(data) => {
                        let { login: {user, token}} = data;
                        this.props.onUserLogin(user, token);
                    }}
                >{(login, { loading, error }) => {
                    let title = loading ? "Loading...": "Login";
                    return (<Button
                        onPress={() => {
                            if(!this.validate()) return;
                            login();
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