import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'src/components/Button';
import t from 'tcomb-form-native';
import StatusBar from 'src/components/StatusBar';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { userLogin } from '../../actions';

// Define Login form structure and options
const { Form } = t.form;

const emailValidation = email_dirty => {
    const email = email_dirty.trim().toLowerCase();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const passLength = pass => {
    const password = pass.trim();
    let ret = true;
    if (password.length < 6) {
        ret = false;
    }
    return ret;
};

const Email = t.refinement(t.String, emailValidation);
const Password = t.refinement(t.String, passLength);

const LoginType = t.struct({
    email: Email,
    password: Password,
});

const LoginOptions = {
    fields: {
        email: {
            error: 'Invalid email. Must be in form "example@example.com"',
        },
        password: {
            secureTextEntry: true,
            error: 'Passwords be at least 6 characters in length.',
        },
    },
    auto: 'placeholders',
};

// define login graphql mutation
const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

class LoginComponent extends Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
    };

    static propTypes = {
        onUserLogin: PropTypes.func.isRequired,
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    constructor(props) {
        super(props);

        // create form ref
        this.form = React.createRef();

        // init state
        this.state = {
            status: {
                message: '',
                type: null,
            },
        };
    }

    // Handle form submition
    async submit(login) {
        const { onUserLogin, navigation } = this.props;

        // get form data
        const value = this.form.current.getValue();
        if (!value) {
            // Validation failed
            this.setState({ status: { message: 'Email or Password is incorrect', type: 'error' } });
            return;
        }

        // login
        let response = null;
        try {
            response = await login({ variables: value });
        } catch (err) {
            const e = err.graphQLErrors[0];
            this.setState({ status: { message: e.message, type: 'error' } });
            return;
        }

        // get response data
        const { user, token } = response.data.login;

        // update redux
        onUserLogin(user, token);

        // update gui
        this.setState({ status: { message: 'User Logged in!' } });

        global.id = user.id;

        // Success! Navigate
        navigation.navigate('Dashboard');
    }

    render() {
        const { status } = this.state;
        const { navigation } = this.props;

        return (
            <View>
                <StatusBar message={status.message} type={status.type} />

                {/* Render Form */}
                <Form ref={this.form} type={LoginType} options={LoginOptions} />

                {/* Login submit mutation */}
                <Mutation mutation={LOGIN_MUTATION}>
                    {(login, { loading }) => (
                        <Button
                            onPress={() => this.submit(login)}
                            title={loading ? 'Loading...' : 'Login'}
                        />
                    )}
                </Mutation>

                {/* Signup link */}
                <Button
                    title="Signup"
                    onPress={() => {
                        navigation.navigate('Signup');
                    }}
                />
            </View>
        );
    }
}

/*
 * Add redux dispatch functions to props
 */
const mapDispatchToProps = dispatch => ({
    onUserLogin: (user, token) => {
        dispatch(userLogin(user, token));
    },
});

const Login = connect(
    null,
    mapDispatchToProps
)(LoginComponent);

export default Login;
