import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import StatusBar from 'src/components/StatusBar';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';

// create form structure
const { Form } = t.form;

const Roles = t.struct({
    user: t.Boolean,
    employee: t.Boolean,
    admin: t.Boolean,
});

const User = t.struct({
    id: t.String,
    name: t.String,
    email: t.String,
    roles: Roles,
});

const options = {
    fields: {
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
        header: null,
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
            const error = new Error(err);
            let message = '';
            if (error.isNetworkError) {
                message = 'Something went wrong with our server';
            } else if (error.isGqlError) {
                message = 'Data is incorrect';
            }
            this.setState({ status: { message, type: 'error' } });
        }

        // TODO: handle error

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
                            <View>
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