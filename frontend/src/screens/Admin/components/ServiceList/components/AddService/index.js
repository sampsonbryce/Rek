import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import t from 'tcomb-form-native';
import Button from 'src/components/Button';
import StatusBar from 'src/components/StatusBar';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';

// add form structure
const { Form } = t.form;

const Service = t.struct({
    name: t.String,
    female_title: t.String,
    male_title: t.String,
});

const options = {
    fields: {
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
const ADD_SERVICE = gql`
    mutation($name: String!, $female_title: String!, $male_title: String!) {
        addService(name: $name, female_title: $female_title, male_title: $male_title) {
            id
        }
    }
`;

/*
 * Admin form for creating a store service
 */
export default class AddService extends Component {
    static navigationOptions = {
        // header: null,
        title: 'Add Service',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    constructor(props) {
        super(props);
        // add form ref
        this.form = React.createRef();

        // init state
        this.state = {
            status: {
                message: '',
                type: '',
            },
        };
    }

    async submit(addService) {
        const { navigation } = this.props;
        console.log('form: ', this.form);
        console.log('getValue: ', this.form.current.getValue);
        // get form data
        const value = this.form.current.getValue();

        console.log('value: ', value);

        // create service
        try {
            await addService({ variables: value });
        } catch (err) {
            // handle error
            const error = new Error(err);
            let message = 'Client error during submission';
            if (error.isNetworkError) {
                message = 'Something went wrong with our server';
            } else if (error.isGqlError) {
                message = 'Data is incorrect';
            }

            console.log('error');
            this.setState({ status: { message, type: 'error' } });
            return;
        }

        // TODO: handle error

        console.log('created');
        this.setState({ status: { message: 'Created Service!', type: 'success' } });

        // on success go back to list
        navigation.goBack();
    }

    render() {
        const { status } = this.state;
        console.log('render');
        return (
            <View>
                <StatusBar message={status.message} type={status.type} />

                <View>
                    {/* Service Add form */}
                    <Form ref={this.form} type={Service} options={options} />

                    {/* Create Service mutation button */}
                    <Mutation mutation={ADD_SERVICE} refetchQueries={['getServices']}>
                        {(addService, { loading }) => (
                            <Button
                                title={loading ? 'Submitting...' : 'Add'}
                                onPress={() => this.submit(addService)}
                            />
                        )}
                    </Mutation>
                </View>
            </View>
        );
    }
}
