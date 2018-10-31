import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import ApiError from 'src/class/Error';
import StatusBar from '../../components/StatusBar';
import { userLogin } from '../../actions';

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
            <View style={styles.container}>
                {/* Page Status */}
                <StatusBar message={status.message} type={status.type} />

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
