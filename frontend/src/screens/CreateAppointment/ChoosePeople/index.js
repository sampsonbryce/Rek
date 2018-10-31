import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { setSelectedPeopleAction } from 'src/actions';
import PeopleListItem from './components/PeopleListItem';

const GET_PEOPLE = gql`
    query getPeopleByServicesAndAvailability($filterData: EmployeeServiceTimeFilter) {
        employees(filterData: $filterData) {
            user {
                id
                name
            }
        }
    }
`;

/*
 * Appointment creation page for choosing services
 */
class ChoosePeople extends Component {
    static navigationOptions = {
        header: null,
        title: 'Choose People',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
        selected: PropTypes.arrayOf(PropTypes.string).isRequired,
        setSelectedPeople: PropTypes.func.isRequired,
        getPeople: PropTypes.shape({
            people: PropTypes.arrayOf(
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
        const { selected, setSelectedPeople } = this.props;

        // choose to remove or add id (toggle)
        if (selected.includes(id)) {
            // deselect
            _.remove(selected, n => n === id);
        } else {
            // select
            selected.push(id);
        }

        setSelectedPeople(selected);
    }

    renderListItem({ user }, index) {
        const { selected } = this.props;
        const active = selected.includes(user.id);

        return (
            <PeopleListItem
                active={active}
                key={index}
                person={user}
                onSelect={() => {
                    this.select(user.id);
                }}
            />
        );
    }

    render() {
        const {
            selected,
            navigation,
            getPeople: { employees, loading, error },
        } = this.props;

        if (loading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            return <Text>Failed to load people</Text>;
        }

        return (
            <View>
                <FlatList
                    data={employees}
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
                    title="Choose Services"
                    onPress={() => {
                        navigation.navigate('ChooseServices');
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
    selected: state.createAppointment.selectedPeople,
    selectedServices: state.createAppointment.selectedServices,
});

/*
 * Add redux dispatch functions to props
 */
const mapDispatchToProps = dispatch => ({
    setSelectedPeople: people => {
        dispatch(setSelectedPeopleAction(people));
    },
});

const ChoosePeopleGQL = graphql(GET_PEOPLE, {
    options: props => {
        const filterData = {};
        if (props.selectedServices.length > 0) {
            filterData.serviceFilterIds = props.selectedServices;
        }

        return {
            variables: {
                filterData,
            },
        };
    },
    name: 'getPeople',
})(ChoosePeople);

const ChoosePeopleRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChoosePeopleGQL);

export default ChoosePeopleRedux;
