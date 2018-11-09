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

// https://github.com/gcanti/tcomb-validation#form-validation   GoTo Refinements
const emailValidation = email_dirty => {
    const email = email_dirty.trim().toLowerCase();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const passValidation = pass => {
    const password = pass.trim();
    if (password.length < 6) {
        return false;
    }
    return true;
};

const Email = t.refinement(t.String, emailValidation);

const Password = t.refinement(t.String, passValidation);

// https://github.com/gcanti/tcomb-form/issues/233
function SamePassword(x) {
    return x.password === x.confirm_password;
}

const SignupType = t.subtype(
    t.struct({
        name: t.String,
        email: Email,
        password: Password,
        confirm_password: Password,
    }),
    SamePassword
);

const SignupOptions = {
    error: 'Passwords must match',
    fields: {
        name: {
            error: 'Name cannot be left blank and must contain non-numeric characters.',
        },
        email: {
            error: 'Invalid email. Must be in form "example@example.com"',
        },
        password: {
            secureTextEntry: true,
            error: 'Passwords be at least characters 6 in length.',
        },
        confirm_password: {
            secureTextEntry: true,
            error: 'Passwords do not match.',
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
                roles {
                    user
                    employee
                    admin
                }
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

        this.setState({ status: { msg: '', type: 'error' } });
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

        // global.id = user.id;

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
