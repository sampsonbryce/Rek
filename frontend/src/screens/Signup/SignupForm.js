import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';

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

export default class SignupForm extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
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
        if (!value) {
            // Validation failed
            this.setState({ status: { msg: 'Login or Password is incorrect', type: 'error' } });
            return;
        }

        // signup
        let response = null;
        try {
            response = await signup({ variables: value });

            // Error Handling
        } catch (err) {
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
                <Text>{status.msg}</Text>

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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
    },
});
