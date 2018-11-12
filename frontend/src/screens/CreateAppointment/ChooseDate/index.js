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
import { Calendar } from 'react-native-calendars';

// const GET_PEOPLE = gql`
//     query getPeopleByServicesAndAvailability($filterData: EmployeeServiceTimeFilter) {
//         employees(filterData: $filterData) {
//             user {
//                 id
//                 name
//             }
//         }
//     }
// `;

/*
 * Appointment creation page for choosing services
 */
class ChooseDate extends Component {
    static navigationOptions = {
        title: 'Choose Time',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
        // selected: PropTypes.arrayOf(PropTypes.string).isRequired,
        // selectedServices: PropTypes.arrayOf(PropTypes.string).isRequired,
        // setSelectedPeople: PropTypes.func.isRequired,
        // getPeople: PropTypes.shape({
        //     people: PropTypes.arrayOf(
        //         PropTypes.shape({
        //             id: PropTypes.string.isRequired,
        //             name: PropTypes.string.isRequired,
        //         })
        //     ),
        //     loading: PropTypes.bool.isRequired,
        //     error: PropTypes.bool,
        // }).isRequired,
    };

    // select(id) {
    //     const { selected, setSelectedPeople } = this.props;

    //     // choose to remove or add id (toggle)
    //     if (selected.includes(id)) {
    //         // deselect
    //         _.remove(selected, n => n === id);
    //     } else {
    //         // select
    //         selected.push(id);
    //     }

    //     setSelectedPeople(selected);
    // }

    // renderChooseServicesButton() {
    //     const { selectedServices, navigation } = this.props;
    //     if (selectedServices.length !== 0) {
    //         return null;
    //     }

    //     return (
    //         <Button
    //             title="Choose Services"
    //             onPress={() => {
    //                 navigation.navigate('ChooseServices');
    //             }}
    //         />
    //     );
    // }

    render() {
        const {
            //     selected,
            navigation,
            //     getPeople: { employees, loading, error },
        } = this.props;

        // if (loading) {
        //     return <Text>Loading...</Text>;
        // }
        // if (error) {
        //     return <Text>Failed to load people</Text>;
        // }

        return (
            <View>
                <Calendar onDayPress={day => navigation.navigate('ChooseTime', { day })} />
                {/* <Button
                    title="Choose People"
                    onPress={() => {
                        navigation.navigate('ChooseDate');
                    }}
                /> */}

                {/* {this.renderChooseServicesButton()} */}
            </View>
        );
    }
}

/*
 * Add redux state to props
 */
// const mapStateToProps = state => ({
//     selected: state.createAppointment.selectedTimes,
//     selectedServices: state.createAppointment.selectedServices,
// });

// /*
//  * Add redux dispatch functions to props
//  */
// const mapDispatchToProps = dispatch => ({
//     setSelected: people => {
//         dispatch(setSelectedPeopleAction(people));
//     },
// });

// const ChooseDateGQL = graphql(GET_PEOPLE, {
//     options: props => {
//         const filterData = {};
//         if (props.selectedServices.length > 0) {
//             filterData.serviceFilterIds = props.selectedServices;
//         }

//         return {
//             variables: {
//                 filterData,
//             },
//         };
//     },
//     name: 'getTimes',
// })(ChooseDate);

// const ChoosePeopleRedux = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ChooseDateGQL);

export default ChooseDate;
// export default ChoosePeopleRedux;
