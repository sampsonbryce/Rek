import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import StatusBar from 'src/components/StatusBar';
import ApiError from 'src/class/Error';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';

// create form structure
const { Form } = t.form;

const emailValidation = email_dirty => {
    const email = email_dirty.trim().toLowerCase();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const Email = t.refinement(t.String, emailValidation);

const Roles = t.struct({
    user: t.Boolean,
    employee: t.Boolean,
    admin: t.Boolean,
});

const User = t.struct({
    id: t.String,
    name: t.String,
    email: Email,
    roles: Roles,
});

const options = {
    fields: {
        email: {
            error: 'Invalid email. Must be in form "example@example.com"',
        },
        id: {
            hidden: true,
        },
    },
    auto: 'placeholders',
};

// Create graphql queries
const GET_USER = gql`
    query($id: String!) {
        user(id: $id) {
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
`;

const UPDATE_USER = gql`
    mutation UpdateUserMutation(
        $id: String!
        $name: String!
        $email: String!
        $roles: UpdateRoleInput!
    ) {
        updateUserWithRoles(id: $id, name: $name, email: $email, roles: $roles) {
            id
        }
    }
`;

/*
 * Admin service for store admins
 */
export default class EditUser extends Component {
    static navigationOptions = {
        title: 'EditUser',
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
                message: '',
                type: '',
            },
        };
    }

    async submit(updateUser, refetch) {
        // get form data
        const value = this.form.current.getValue();

        // update user
        try {
            await updateUser({ variables: value });
        } catch (err) {
            // handle error
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
            refetch();
            return;
        }

        // refetch user query
        refetch();
        this.setState({ status: { message: 'Updated User!', type: 'success' } });
    }

    render() {
        const { status } = this.state;
        const { navigation } = this.props;

        // get user id sent during navivation
        const id = navigation.getParam('id');

        return (
            <View>
                <StatusBar message={status.message} type={status.type} />
                {/* Get User */}
                <Query variables={{ id }} query={GET_USER}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>`Error! ${error.message}`</Text>;

                        const { user } = data;

                        return (
                            <View style={styles.container}>
                                {/* User info form */}
                                <Form ref={this.form} type={User} options={options} value={user} />

                                {/* Update user mutation button */}
                                <Mutation mutation={UPDATE_USER}>
                                    {(updateUser, { update_loading, update_error }) => {
                                        if (update_error) {
                                            this.setState({
                                                status: {
                                                    message: 'Could not update',
                                                    type: 'error',
                                                },
                                            });
                                        }

                                        return (
                                            <Button
                                                title={update_loading ? 'Submitting...' : 'Update'}
                                                onPress={() => this.submit(updateUser, refetch)}
                                            />
                                        );
                                    }}
                                </Mutation>
                            </View>
                        );
                    }}
                </Query>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
