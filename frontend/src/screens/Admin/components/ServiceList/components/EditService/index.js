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

const Service = t.struct({
    id: t.String,
    name: t.String,
    female_title: t.String,
    male_title: t.String,
});

const options = {
    fields: {
        id: {
            hidden: true,
        },
        female_title: {
            label: 'Female Title',
        },
        male_title: {
            label: 'Male Title',
        },
    },
    auto: 'placeholders',
};

// Create graphql queries
const GET_SERVICE = gql`
    query($id: String!) {
        service(id: $id) {
            id
            name
            female_title
            male_title
        }
    }
`;

const UPDATE_SERVICE = gql`
    mutation UpdateServiceMutation(
        $id: String!
        $name: String!
        $female_title: String!
        $male_title: String!
    ) {
        updateService(id: $id, name: $name, female_title: $female_title, male_title: $male_title) {
            id
        }
    }
`;

/*
 * Admin form for updating a store service
 */
export default class EditService extends Component {
    static navigationOptions = {
        header: null,
        title: 'EditService',
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

    async submit(updateService, refetch) {
        // get form data
        const value = this.form.current.getValue();

        // update user
        try {
            await updateService({ variables: value });
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
        this.setState({ status: { message: 'Updated Service!', type: 'success' } });
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
                <Query variables={{ id }} query={GET_SERVICE}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>`Error! ${error.message}`</Text>;

                        const { service } = data;

                        return (
                            <View>
                                {/* User info form */}
                                <Form
                                    ref={this.form}
                                    type={Service}
                                    options={options}
                                    value={service}
                                />

                                {/* Update user mutation button */}
                                <Mutation mutation={UPDATE_SERVICE}>
                                    {(updateService, { update_loading, update_error }) => {
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
                                                onPress={() => this.submit(updateService, refetch)}
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
