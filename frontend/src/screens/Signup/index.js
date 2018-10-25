import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import StatusBar from '../../components/StatusBar';
import { userLogin } from '../../actions';

// create form structure
const { Form } = t.form;

// create validator for tcomb form
// https://github.com/gcanti/tcomb-validation#form-validation   GoTo Refinements
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

const SignupType = t.struct({
    name: t.String,
    // email: t.String,
    email: Email,
    // password: t.String,
    password: Password,
    // confirm_password: t.String,
    confirm_password: Password,
    // confirm_password: SamePassword,
});

const SignupOptions = {
    fields: {
        email: {
            error: 'Invalid email. Must be in form "example@example.com"',
        },
        password: {
            secureTextEntry: true,
            error: 'Passwords be at least characters 6 in length.',
        },
        confirm_password: {
            secureTextEntry: true,
            error: 'Passwords be at least 6 characters in length.',
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
    static navigationOptions = {
        header: null,
    };

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
                msg: '',
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
            this.setState({ status: { msg: 'Create account failed.', type: 'error' } });
            return;
        }

        if (value.password !== value.confirm_password) {
            // Validation failed
            this.setState({ status: { msg: "Passwords don't match.", type: 'error' } });
            return;
        }

        // signup
        let response = null;
        try {
            response = await signup({ variables: value });

            // Error Handling
        } catch (err) {
            // console.log(err);
            // parse error
            const e = err.graphQLErrors[0];

            // get message
            let msg = null;
            if (e.name === 'UniqueFieldAlreadyExists') {
                msg = e.data.message;
            } else {
                msg = e.message;
            }

            this.setState({ status: { msg, type: 'error' } });
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
            <View style={styles.container}>
                {/* Page Status */}
                <StatusBar message={status.msg} type={status.type} />

                {/* Signup Form */}
                <Form ref={this.form} type={SignupType} options={SignupOptions} />

                {/* Submit form button/mutation */}
                <Mutation mutation={SIGNUP_MUTATION}>
                    {(signup, { loading }) => (
                        <Button
                            onPress={() => this.submit(signup)}
                            title={loading ? 'Loading...' : 'Signup'}
                        />
                    )}
                </Mutation>

                {/* Go to login */}
                <Button
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    title="Login"
                />
            </View>
        );
    }
}

// component styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
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
