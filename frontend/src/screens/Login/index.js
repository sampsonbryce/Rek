import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'src/components/Button';
import t from 'tcomb-form-native';
import StatusBar from 'src/components/StatusBar';
import PropTypes from 'prop-types';
import ApiError from 'src/class/Error';
import { Navigation } from 'react-native-navigation';
import { BERRY_DARK_BLUE, BERRY_LIGHT_BLUE } from 'src/constants';
import Images from 'src/assets/images';
import { userLogin } from '../../actions';

// Define Login form structure and options
const { Form } = t.form;

// https://github.com/gcanti/tcomb-validation#form-validation   GoTo Refinements
const emailValidation = email_dirty => {
    const email = email_dirty.trim().toLowerCase();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const Email = t.refinement(t.String, emailValidation);

const LoginType = t.struct({
    // email: t.String,
    email: Email,
    password: t.String,
});

const LoginOptions = {
    fields: {
        password: {
            secureTextEntry: true,
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
            this.setState({ status: { message: 'Login or Password is incorrect', type: 'error' } });
            return;
        }

        // login
        let response = null;
        try {
            response = await login({ variables: value });
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
            return;
        }

        // get response data
        const { user, token } = response.data.login;

        // update redux
        onUserLogin(user, token);

        // update gui
        this.setState({ status: { message: 'User Logged in!' } });

        // Success! Navigate
        navigation.navigate('Dashboard');
    }

    render() {
        const { status } = this.state;
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar message={status.message} type={status.type} />

                <Image source={Images.logoSilverTransparent} style={styles.image} />

                {/* Render Form */}
                <Form ref={this.form} type={LoginType} options={LoginOptions} />

                {/* Login submit mutation */}
                <View style={styles.buttonContainer}>
                    <Mutation mutation={LOGIN_MUTATION}>
                        {(login, { loading }) => (
                            <Button
                                style={styles.loginButton}
                                onPress={() => this.submit(login)}
                                title={loading ? 'Loading...' : 'Login'}
                            />
                        )}
                    </Mutation>

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

const Login = connect(
    null,
    mapDispatchToProps
)(LoginComponent);

export default Login;
