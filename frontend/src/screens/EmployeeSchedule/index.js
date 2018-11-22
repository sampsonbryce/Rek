import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Calendar } from 'react-native-calendars';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash';
import ApiError from 'src/class/Error';
import StatusBar from 'src/components/StatusBar';
import { ERROR_RED } from 'src/constants';
import ErrorUtils from 'src/utils/ErrorUtils';
import {
    startOfToday,
    endOfToday,
    format,
    setHours,
    getHours,
    getMinutes,
    setMinutes,
    parse,
    isAfter,
    isSameDay,
} from 'date-fns';

const UPSERT_WORKING_TIMES = gql`
    # mutation($dates: [String!]!, $start_time: String!, $end_time: String!) {
    #     upsertWorkingTimes(dates: $dates, start_time: $start_time, end_time: $end_time) {
    mutation($dates: [WorkingTimeInput!]!) {
        upsertWorkingTimes(dates: $dates) {
            workingTimes {
                id
                start
                end
            }
        }
    }
`;

const GET_WORKING_TIMES = gql`
    query($filterData: EmployeeServiceTimeFilter) {
        employees(filterData: $filterData) {
            schedule {
                workingTimes {
                    id
                    start
                    end
                }
            }
        }
    }
`;

/**
 * Contains logic for employees to add/edit their working times for each day
 */
class EmployeeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: { message: '', type: null },
            date_dialog_visible: false,
            time_picker_visible: false,
            start_time: startOfToday(), // default val
            end_time: endOfToday(),
            working_time_edit_id: null, // the id of the working time we are editing
            editing_time_for: null, //  the state field we want the TimePicker to update ( start or end)
            selected_dates: [],
            mode: 'add', // 'add' or 'edit'
        };
    }

    // Handles parsing the getWorkingTimes query and creates the calendares marked_dates
    // object from both the query and the selected_dates list
    getMarkedDates() {
        const { selected_dates } = this.state;
        const {
            getWorkingTimes: { employees },
        } = this.props;

        // check that our query is only returning one employee
        ErrorUtils.assert({
            condition: employees.length === 1,
            message: 'getWorkingTimes returned more or less that 1 employee',
        });

        // get working times
        const {
            schedule: { workingTimes },
        } = employees[0];

        const marked_dates = {};

        // create the marked_dates object for the calendar from selected_dates
        for (let i = 0; i < selected_dates.length; i += 1) {
            const date = selected_dates[i];
            marked_dates[format(date, 'YYYY-MM-DD')] = { selected: true };
        }

        // create the marked_dates object for the calendar from workingTimes
        for (let i = 0; i < workingTimes.length; i += 1) {
            const { id, start } = workingTimes[i];
            const date = format(new Date(start), 'YYYY-MM-DD');

            if (date in marked_dates) {
                // if date is selected, add mark to object that already exists
                marked_dates[date] = { ...marked_dates[date], marked: true, dotColor: 'red' };
            } else {
                // otherwise just create new object
                marked_dates[date] = { marked: true, dotColor: 'red' };
            }
        }

        return marked_dates;
    }

    async upsertWorkingTimes() {
        const { executeUpsertWorkingTimes } = this.props;
        const { selected_dates, start_time, end_time, mode, working_time_edit_id } = this.state;
        const id = mode === 'edit' ? working_time_edit_id : null;

        // close the dialog
        this.setState({ date_dialog_visible: false });

        // we store the dates the employee wants to work, and then separately we store
        // the times they want to work for those dates. All of these are JS Date object so
        // now we are just combining the dates and the times
        const dates = [];
        for (let i = 0; i < selected_dates.length; i += 1) {
            // clone to avoid using the same object reference
            let start = _.cloneDeep(selected_dates[i]);
            let end = _.cloneDeep(selected_dates[i]);

            start = setHours(start, getHours(start_time));
            start = setMinutes(start, getMinutes(start_time));
            end = setHours(end, getHours(end_time));
            end = setMinutes(end, getMinutes(end_time));

            // add dates to list in UTC ISO format
            dates.push({ id, start: start.toISOString(), end: end.toISOString() });
        }

        const variables = {
            dates,
        };

        let response = null;
        try {
            response = await executeUpsertWorkingTimes({ variables });
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
            return;
        }

        console.log('response: ', response);
        const message = mode === 'edit' ? 'Updated working time!' : 'Added new working times!';
        this.setState({ status: { message, type: 'success' } });

        // do something to update calendar
    }

    // Adds/removes a date from the states selected_dates array
    selectDate(date) {
        const { selected_dates } = this.state;
        const selected_date = parse(date.dateString);

        // see if we can find the date in the array
        if (_.find(selected_dates, d => d.toISOString() === selected_date.toISOString())) {
            // remove it if we find it
            _.remove(selected_dates, d => d.toISOString() === selected_date.toISOString());
        } else {
            // otherwise add it
            selected_dates.push(selected_date);
        }

        // Update state. Clone to ensure state update is detected
        this.setState({ selected_dates: _.clone(selected_dates) });
    }

    // Handles matching the selected calendar date to a working time
    // and opens the dialog in 'edit' mode for the working time if found
    editDate(date) {
        const selected_date = parse(date.dateString);
        console.log('editing date: ', selected_date);
        let working_time_edit_id = null;
        let start_time = null;
        let end_time = null;

        const {
            getWorkingTimes: { employees },
        } = this.props;

        // get working times
        const {
            schedule: { workingTimes },
        } = employees[0];

        // find working times for selected date
        for (let i = 0; i < workingTimes.length; i += 1) {
            const { id, start, end } = workingTimes[i];

            // check if working time is for today, and if so set start and end time
            if (isSameDay(start, selected_date)) {
                working_time_edit_id = id;
                start_time = start;
                end_time = end;
                console.log('found date: ', start);
                break;
            }
        }

        // check if we found a working time for today
        if (start_time != null) {
            console.log('opening dialog');
            // open dialog in correct mode
            this.setState({
                mode: 'edit',
                date_dialog_visible: true,
                start_time,
                end_time,
                working_time_edit_id,
            });
        }
    }

    render() {
        const {
            date_dialog_visible,
            time_picker_visible,
            start_time,
            end_time,
            editing_time_for,
            status,
            mode,
        } = this.state;

        // error check the working times query
        const {
            getWorkingTimes: { loading, error },
        } = this.props;

        if (loading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            return <Text>{error}</Text>;
        }

        // get the marked dates for the calendar
        const marked_dates = this.getMarkedDates();

        return (
            <View>
                <StatusBar message={status.message} type={status.type} />
                {/* Calendar */}
                <Calendar
                    onDayPress={date => this.selectDate(date)}
                    onDayLongPress={date => {
                        this.selectDate(date);
                        this.editDate(date);
                    }}
                    minDate={format(new Date(), 'YYYY-MM-DD')}
                    markedDates={marked_dates}
                />
                <Button
                    title="Choose Time"
                    onPress={() => {
                        this.setState({
                            date_dialog_visible: true,
                            mode: 'add',
                            start_time: startOfToday(),
                            end_time: endOfToday(),
                        });
                    }}
                />

                {/* Dialog for selecting start and end times for selected dates */}
                <Dialog
                    width="50%"
                    visible={date_dialog_visible}
                    onTouchOutside={() => {
                        this.setState({ date_dialog_visible: false });
                    }}
                >
                    <DialogContent>
                        {/* Start Time */}
                        <View style={styles.time}>
                            <Text>{format(start_time, 'HH:mm')}</Text>
                            <Button
                                title="Edit"
                                onPress={() => {
                                    this.setState({
                                        time_picker_visible: true,
                                        editing_time_for: 'start_time',
                                    });
                                }}
                            />
                        </View>
                        {/* End Time */}
                        <View style={styles.time}>
                            <Text>{format(end_time, 'HH:mm')}</Text>
                            <Button
                                title="Edit"
                                onPress={() => {
                                    this.setState({
                                        time_picker_visible: true,
                                        editing_time_for: 'end_time',
                                    });
                                }}
                            />
                        </View>
                        <DateTimePicker
                            isVisible={time_picker_visible}
                            mode="time"
                            onConfirm={time => {
                                // update datetime object to avoid changing the date as
                                // onConfirm returns a date object for the current day
                                let { [editing_time_for]: time_to_edit } = this.state;
                                // time to edit is either 'start_time' or 'end_time'

                                // update hours and minutes of currently editing time object
                                const hours = getHours(time);
                                const minutes = getMinutes(time);

                                time_to_edit = setHours(time_to_edit, hours);
                                time_to_edit = setMinutes(time_to_edit, minutes);

                                // error check the new time
                                if (editing_time_for === 'start_time') {
                                    // editing start and the time is after the end time, throw error
                                    if (isAfter(time_to_edit, end_time)) {
                                        this.setState({
                                            time_picker_visible: false,
                                            status: {
                                                type: 'error',
                                                message: 'Start time must be before end time',
                                            },
                                        });
                                        return;
                                    }

                                    // editing end and the time is before the start time, throw error
                                } else if (editing_time_for === 'end_time') {
                                    if (!isAfter(time_to_edit, start_time)) {
                                        this.setState({
                                            time_picker_visible: false,
                                            status: {
                                                type: 'error',
                                                message: 'End time must be after start time',
                                            },
                                        });
                                        return;
                                    }
                                }

                                // update time states
                                this.setState({
                                    [editing_time_for]: time_to_edit,
                                    time_picker_visible: false,
                                });
                            }}
                            onCancel={() => this.setState({ time_picker_visible: false })}
                        />
                        <Button
                            title="Confirm"
                            onPress={() => {
                                this.upsertWorkingTimes();
                            }}
                        />
                        {mode === 'edit' ? (
                            <Button
                                style={styles.deleteButton}
                                // textStyle={styles.dialogButtonText}
                                title="Delete"
                                onPress={() => {
                                    this.deleteWorkingTimes();
                                }}
                            />
                        ) : null}
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        width: '90%',
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: ERROR_RED,
    },
    dialogButtonText: {
        color: 'white',
    },
});

// add redux state
const mapStateToProps = state => ({ user: state.user });

// Query for adding working times
const EmployeeScheduleAdd = graphql(UPSERT_WORKING_TIMES, {
    options: () => ({ refetchQueries: ['getWorkingTimes'] }), // refetch working times on upsert
    name: 'executeUpsertWorkingTimes',
})(EmployeeSchedule);

// query for getting working times
const EmployeeScheduleGet = graphql(GET_WORKING_TIMES, {
    options: props => ({ variables: { filterData: { employeeFilterIds: [props.user.id] } } }),
    name: 'getWorkingTimes',
})(EmployeeScheduleAdd);

const EmployeeScheduleRedux = connect(mapStateToProps)(EmployeeScheduleGet);

export default EmployeeScheduleRedux;
