import React from 'react';
import { View, Text } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

const Dashboard = props => {
    const { navigation } = props;
    const id = global.id; // eslint-disable-line

    return (
        <View>
            <Query variables={{ id }} query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>`Error! ${error.message}`</Text>;

                    const { user } = data;
                    return (
                        <View>
                            <Text>No appointments</Text>
                            {/* Button to Schedule Appointments */}
                            <Button
                                onPress={() => {
                                    navigation.navigate('FindServices');
                                }}
                                title="Schedule Appointment"
                            />

                            {/* Button to Admin */}
                            {user.roles.admin && (
                                <Button
                                    onPress={() => {
                                        navigation.navigate('Admin');
                                    }}
                                    title="Admin"
                                />
                            )}
                        </View>
                    );
                }}
            </Query>
        </View>
    );
};

Dashboard.propTypes = {
    navigation: PropTypes.instanceOf(Navigation).isRequired,
};

export default Dashboard;
