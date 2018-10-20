import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import ServiceListItem from './components/ServiceListItem';

const GET_SERVICES = gql`
    {
        services {
            id
            name
        }
    }
`;

/*
 * Appointment creation page for choosing services
 */
class ChooseServices extends Component {
    static navigationOptions = {
        header: null,
        title: 'Choose Services',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
        getServices: PropTypes.shape({
            services: PropTypes.arrayOf(
                PropTypes.Shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ),
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };
    }

    select(id) {
        const { selected } = this.state;

        // choose to remove or add id (toggle)
        if (selected.includes(id)) {
            // deselect
            _.remove(selected, n => n === id);
        } else {
            // select
            selected.push(id);
        }

        // update state
        this.setState({ selected });
    }

    renderListItem(item, index) {
        const { selected } = this.state;
        const active = selected.includes(item.id);

        return (
            <ServiceListItem
                active={active}
                key={index}
                service={item}
                onSelect={() => {
                    this.select(item.id);
                }}
            />
        );
    }

    render() {
        const { selected } = this.state;
        const {
            navigation,
            getServices: { services, loading, error },
        } = this.props;

        if (loading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            return <Text>Failed to load services</Text>;
        }

        return (
            <View>
                <FlatList
                    data={services}
                    renderItem={({ item, index }) => this.renderListItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={{ selected }} // to force update on selected change
                />
                <Button
                    title="Choose Time"
                    onPress={() => {
                        navigation.navigate('ChooseTime');
                    }}
                />
                <Button
                    title="Choose People"
                    onPress={() => {
                        navigation.navigate('ChoosePeople');
                    }}
                />
            </View>
        );
    }
}

export default graphql(GET_SERVICES, {
    name: 'getServices',
})(ChooseServices);
