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
import PeopleListItem from './components/PeopleListItem';

const GET_SERVICES = gql`
    query getEmployeesByServicesAndTimes(){
         services{
             employees {
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
        getServices: PropTypes.shape({
            services: PropTypes.arrayOf(
                PropTypes.shape({
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
            selected: 0,
        };
    }

    select(id) {
        const { selected, setSelectedServices } = this.props;
        console.log('selected before:', selected);

        // choose to remove or add id (toggle)
        if (selected.includes(id)) {
            // deselect
            _.remove(selected, n => n === id);
            this.setState({ selected: selected.length - 1 });
        } else {
            // select
            selected.push(id);
            this.setState({ selected: selected.length + 1 });
        }
        console.log('selected after: ', selected);

        setSelectedServices(selected);
    }

    renderListItem(item, index) {
        console.log('render list item');
        const { selected } = this.props;
        const active = selected.includes(item.id);

        return (
            <PeopleListItem
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
            getServices: { services, loading, error },
        } = this.props;

        console.log('redux selected: ', selected);

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

/*
 * Add redux state to props
 */
const mapStateToProps = state => ({
    selected: state.createAppointment.selectedServices,
});

/*
 * Add redux dispatch functions to props
 */
const mapDispatchToProps = dispatch => ({
    setSelectedServices: services => {
        dispatch(setSelectedServicesAction(services));
    },
});

const ChoosePeopleRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChoosePeople);

export default graphql(GET_SERVICES, {
    name: 'getServices',
})(ChoosePeopleRedux);
