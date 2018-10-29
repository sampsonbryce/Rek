import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { setSelectedServicesAction } from 'src/actions';
import ServiceListItem from './components/ServiceListItem';

const GET_SERVICES = gql`
    query($filterData: EmployeeServiceTimeFilter) {
        employees(filterData: $filterData) {
            services {
                id
                name
            }
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
        selected: PropTypes.arrayOf(PropTypes.string).isRequired,
        setSelectedServices: PropTypes.func.isRequired,
        getServices: PropTypes.shape({
            services: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ),
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool,
        }).isRequired,
    };

    select(id) {
        const { selected, setSelectedServices } = this.props;

        // choose to remove or add id (toggle)
        if (selected.includes(id)) {
            // deselect
            _.remove(selected, n => n === id);
        } else {
            // select
            selected.push(id);
        }

        setSelectedServices(selected);
    }

    renderListItem(item, index) {
        const { selected } = this.props;
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
        const {
            selected,
            navigation,
            getServices: { employees, loading, error },
        } = this.props;

        if (loading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            console.log(error);
            return <Text>Failed to load services</Text>;
        }

        // this is rather inefficient. should filter on the serve side with a specific query
        let services = [];
        employees.map(item => {
            services = services.concat(item.services);
            return null;
        });

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

/*
 * Add redux state to props
 */
const mapStateToProps = state => ({
    selected: state.createAppointment.selectedServices,
    selectedPeople: state.createAppointment.selectedPeople,
});

/*
 * Add redux dispatch functions to props
 */
const mapDispatchToProps = dispatch => ({
    setSelectedServices: services => {
        dispatch(setSelectedServicesAction(services));
    },
});

// export default ChooseServicesRedux;

const ChooseServicesGQL = graphql(GET_SERVICES, {
    options: props => {
        // add GPL filters if we have them in our redux state
        const filterData = {};
        if (props.selectedPeople.length > 0) {
            filterData.employeeFilterIds = props.selectedPeople;
        }

        return {
            variables: {
                filterData,
            },
        };
    },
    name: 'getServices',
})(ChooseServices);

const ChooseServicesRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseServicesGQL);

export default ChooseServicesRedux;
