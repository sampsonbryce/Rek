import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import ApiError from 'src/class/Error';
import { userLogin } from 'src/actions';
import { BERRY_DARK_BLUE, BERRY_LIGHT_BLUE } from 'src/constants';
import StatusBar from 'src/components/StatusBar';
import Images from 'src/assets/images';

// create form structure
const { Form } = t.form;

const SignupType = t.struct({
    name: t.String,
    email: t.String,
    password: t.String,
    confirm_password: t.String,
});

const SignupOptions = {
    fields: {
        password: {
            secureTextEntry: true,
        },
        confirm_password: {
            secureTextEntry: true,
        },
    },
    auto: 'placeholders',
};

// create signup mutation
const SIGNUP_MUTATION = gql`
    mutation SignupMutation($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

/*
 * Component for rendering the signup form and handling user signup
 */
class SignupComponent extends Component {
    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
        onUserSignup: PropTypes.func.isRequired,
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

    async submit(signup) {
        const { onUserSignup, navigation } = this.props;
        // get form data
        const value = this.form.current.getValue();
        if (!value) {
            // Validation failed
            return;
        }

        // signup
        let response = null;
        try {
            response = await signup({ variables: value });

            // Error Handling
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });

            return;
        }

        // get response data
        const { user, token } = response.data.signup;

        // update redux
        onUserSignup(user, token);

        // update gui
        this.setState({ status: { msg: 'New user created!' } });

        // navigate on success
        navigation.navigate('Dashboard');
    }

    render() {
        const { status } = this.state;
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {/* Page Status */}
                <StatusBar message={status.message} type={status.type} />

                <Image source={Images.logoSilverTransparent} style={styles.image} />

                {/* Signup Form */}
                <Form ref={this.form} type={SignupType} options={SignupOptions} />

                <View style={styles.buttonContainer}>
                    {/* Submit form button/mutation */}
                    <Mutation mutation={SIGNUP_MUTATION}>
                        {(signup, { loading }) => (
                            <Button
                                style={styles.signupButton}
                                onPress={() => this.submit(signup)}
                                title={loading ? 'Loading...' : 'Signup'}
                            />
                        )}
                    </Mutation>

                    {/* Go to login */}
                    <Button
                        style={styles.loginButton}
                        textStyle={styles.loginButtonText}
                        title="Already have an account?"
                        onPress={() => {
                            navigation.navigate('Login');
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
    signupButton: {
        width: '100%',
    },
    loginButton: {
        width: '75%',
        backgroundColor: BERRY_LIGHT_BLUE,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    loginButtonText: {
        color: BERRY_DARK_BLUE,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        flex: 1,
        margin: 10,
    },
});

// add redux state and dispatch to component

const mapDispatchToProps = dispatch => ({
    onUserSignup: (user, token) => {
        dispatch(userLogin(user, token));
    },
});

const Signup = connect(
    null,
    mapDispatchToProps
)(SignupComponent);

export default Signup;
