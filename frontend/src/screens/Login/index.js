import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'src/components/Button';
import t from 'tcomb-form-native';
import StatusBar from 'src/components/StatusBar';
import PropTypes from 'prop-types';
import ApiError from 'src/class/Error';
import { Navigation } from 'react-native-navigation';
import { BERRY_DARK_BLUE, BERRY_LIGHT_BLUE } from 'src/constants';
import Images from 'src/assets/images';
import { USER_EMAIL, USER_PASSWORD } from 'react-native-dotenv';
import { userLogin } from '../../actions';

// ----- Define Login form structure and options
const { Form } = t.form;

// https://github.com/gcanti/tcomb-validation#form-validation   GoTo Refinements
const emailValidation = email_dirty => {
    const email = email_dirty.trim().toLowerCase();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const passLength = pass => {
    const password = pass.trim();
    if (password.length < 6) {
        return false;
    }
    return true;
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

// function to check if we have provided env credentials for automatic login
const credentialsExist = () => USER_EMAIL && USER_PASSWORD;

// define login graphql mutation
const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
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
    }
`;

class LoginComponent extends Component {
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

        if (credentialsExist()) {
            this.state.values = { email: USER_EMAIL, password: USER_PASSWORD };
        }
    }

    componentDidMount() {
        // Add development login bypass by using credentials specified in the .env file
        if (credentialsExist()) {
            this.executeLogin({ email: USER_EMAIL, password: USER_PASSWORD });
        }
    }

    async executeLogin(variables) {
        // async executeLogin(login, variables) {
        const { onUserLogin, navigation, login } = this.props;

        let response = null;
        try {
            response = await login({ variables });
        } catch (err) {
            const api_error = new ApiError(err);
            this.setState({ status: { message: api_error.userMessage(), type: 'error' } });
            return;
        }

        // get response data
        const { user, token } = response.data.login;

        // update redux
        onUserLogin(user, token);

        // update gui
        this.setState({ status: { message: 'User Logged in!' } });

        // global.id = user.id;

        // Success! Navigate
        navigation.navigate('Dashboard');
    }

    // Handle form submition
    async submit() {
        // get form data
        const form_values = this.form.current.getValue();
        if (form_values) {
            this.executeLogin(form_values);
        }
    }

    render() {
        const { navigation } = this.props;
        const { status, values } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar message={status.message} type={status.type} />

                <Image source={Images.logoSilverTransparent} style={styles.image} />

                {/* Render Form */}
                <Form ref={this.form} type={LoginType} options={LoginOptions} value={values} />

                {/* Login submit mutation */}
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.loginButton}
                        onPress={() => this.submit()}
                        title="Login"
                    />

                    {/* Signup link */}
                    <Button
                        style={styles.signupButton}
                        textStyle={styles.signupButtonText}
                        title="Don't have an account?"
                        onPress={() => {
                            navigation.navigate('Signup');
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

// component styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: '100%',
        padding: 20,
    },
    loginButton: {
        width: '100%',
    },
    signupButton: {
        width: '75%',
        backgroundColor: BERRY_LIGHT_BLUE,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    signupButtonText: {
        color: BERRY_DARK_BLUE,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        flex: 1,
    },
});

/*
 * Add redux dispatch functions to props
 */
const mapDispatchToProps = dispatch => ({
    onUserLogin: (user, token) => {
        dispatch(userLogin(user, token));
    },
});

const LoginGQL = graphql(LOGIN_MUTATION, {
    name: 'login',
})(LoginComponent);

const Login = connect(
    null,
    mapDispatchToProps
)(LoginGQL);

export default Login;
