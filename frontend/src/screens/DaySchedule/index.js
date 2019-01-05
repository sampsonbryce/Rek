import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import TimeList from 'src/components/TimeList';
import _ from 'lodash';

// query to get current working times
const GET_WORKING_TIME_FOR_DAY = gql`
    query($employee: ID!, $days: [DateTime!]) {
        workingTimes(employee: $employee, days: $days) {
            start
            end
        }
    }
`;

class DaySchedule extends Component {
    static navigationOptions = {
        title: 'Select Times You Will Work',
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };
    }

    toggleTime(time) {
        const { selected } = this.state;

        // choose to remove or add time (toggle)
        const selected_time = _.find(selected, t => t.start === time.start);
        if (selected_time !== undefined) {
            // deselect
            _.remove(selected, t => t.start === time.start);
        } else {
            // select
            selected.push(time);
        }

        this.setState({ selected });
    }

    render() {
        const { selected } = this.state;
        return (
            <TimeList
                onTimePress={time => this.toggleTime(time)}
                activeTimes={selected.map(time => time.start)}
            />
        );
    }
}

/*
 * Add redux state to props
 */
const mapStateToProps = state => ({
    user: state.user,
});

/*
 * Add redux dispatch functions to props
 */
// const mapDispatchToProps = dispatch => ({
//     setSelectedServices: services => {
//         dispatch(setSelectedServicesAction(services));
//     },
// });

const DayScheduleGQL = graphql(GET_WORKING_TIME_FOR_DAY, {
    options: props => ({
        variables: { employee: props.user.id, days: [props.navigation.getParam('day').dateString] },
    }),
    name: 'getWorkingTimes',
})(DaySchedule);

const DayScheduleRedux = connect(
    mapStateToProps,
    // mapDispatchToProps
    null
)(DayScheduleGQL);

export default DayScheduleRedux;
