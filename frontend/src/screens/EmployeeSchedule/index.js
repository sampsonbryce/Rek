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
import PropTypes from 'prop-types';
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
    areRangesOverlapping,
} from 'date-fns';
import ConfirmDialog from '../../components/ConfirmDialog';

// GQL STATEMENTS
const UPSERT_WORKING_TIMES = gql`
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

const DELETE_WORKING_TIMES = gql`
    mutation($date_ids: [ID!]!) {
        deleteWorkingTimes(date_ids: $date_ids)
    }
`;

const GET_WORKING_TIMES = gql`
    query getWorkingTimes($filterData: EmployeeServiceTimeFilter) {
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
    propTypes = {
        getWorkingTimes: PropTypes.shape({
            employees: PropTypes.shape({
                schedule: PropTypes.shape({
                    workingTimes: PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        start: PropTypes.string.isRequired,
                        end: PropTypes.string.isRequired,
                    }),
                }),
            }),
            loading: PropTypes.bool.isRequired,
            error: PropTypes.string.isRequired,
        }).isRequired,
    };

    // initial state
    state = {
        status: { message: '', type: null },
        confirm: { message: '', visible: false, onConfirm: null },
        date_dialog_visible: false,
        time_picker_visible: false,
        start_time: startOfToday(), // default val
        end_time: endOfToday(),
        working_time_edit_id: null, // the id of the working time we are editing
        edit_time_name: null, //  the state field we want the TimePicker to update ( start or end)
        selected_dates: [],
        mode: 'add', // 'add' or 'edit'
    };

    // Handles parsing the getWorkingTimes query and creates the calendares marked_dates
    // object from both the query and the selected_dates list
    getMarkedDates() {
        const { selected_dates } = this.state;
        const workingTimes = this.getWorkingTimes();

        const marked_dates = {};

        // create the marked_dates object for the calendar from selected_dates
        for (let i = 0; i < selected_dates.length; i += 1) {
            const date = selected_dates[i];
            marked_dates[format(date, 'YYYY-MM-DD')] = { selected: true };
        }

        // create the marked_dates object for the calendar from workingTimes
        for (let i = 0; i < workingTimes.length; i += 1) {
            const { start } = workingTimes[i];
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

    // parses the props to get the provide GQL working times object
    getWorkingTimes() {
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

        return workingTimes;
    }

    // checks if provided working time overlaps the working times from GET_WORKING_TIMES query
    doesWorkingTimeOverlap(working_time) {
        const workingTimes = this.getWorkingTimes();
        const { start, end } = working_time;

        // for all working times, check if they overlap
        for (let i = 0; i < workingTimes.length; i += 1) {
            const { start: existing_start, end: existing_end } = workingTimes[i];

            // check if there is overlap
            if (areRangesOverlapping(start, end, existing_start, existing_end)) {
                return true;
            }
        }

        // no overlap
        return false;
    }

    // Handles the gql request to delete a working time
    async deleteWorkingTimes() {
        const { deleteWorkingTimes } = this.props;
        const { working_time_edit_id } = this.state;
        const variables = { date_ids: [working_time_edit_id] };
        let response = null;
        try {
            response = await deleteWorkingTimes({ variables });
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
        }

        // get the number of db entries deleted
        const { deleteWorkingTimes: count } = response.data;

        // check and make sure something was actually deleted
        if (count > 0) {
            this.setState({
                status: { message: 'Deleted working time!', type: 'success' },
                date_dialog_visible: false,
            });
        } else {
            this.setState({
                status: { message: 'Nothing to delete!', type: 'error' },
                date_dialog_visible: false,
                selected_dates: [], // deselect dates
            });
        }
    }

    /**
     * Checks the selected dates and determines if there are overlapping times for the dates
     *
     * @return { dates, overlapping_dates } An object with two variables, dates (all dates that do not have overlapping times)
     *                                      and overlapping_times which is all the dates with overlapping times in them
     */
    validateAndFormatDates() {
        const { selected_dates, start_time, end_time, mode, working_time_edit_id } = this.state;
        const id = mode === 'edit' ? working_time_edit_id : null;

        const overlapping_times = [];

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

            // check to makes sure not datetimes overlap with existing working times
            const overlap = this.doesWorkingTimeOverlap({ start, end });
            if (overlap) {
                overlapping_times.push({ start, end });
            } else {
                // add dates to list in UTC ISO format
                dates.push({ id, start: start.toISOString(), end: end.toISOString() });
            }
        }

        return { dates, overlapping_times };
    }

    /**
     * Handles the gql request to update/create a working_time
     *
     * @param dates [{id, start, end}] the working time dates to upsert
     */
    async upsertWorkingTimes(dates) {
        const { executeUpsertWorkingTimes } = this.props;
        const { mode } = this.state;

        if (dates.length === 0) {
            // sometimes all the dates we selected are overlapping.
            // in this case just show a message :p
            this.setState({
                status: { message: 'No dates to create!', type: 'success' },
            });
            return;
        }

        const variables = {
            dates,
        };

        try {
            await executeUpsertWorkingTimes({ variables });
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
            return;
        }

        // display message and deselect selected_dates
        const message = mode === 'edit' ? 'Updated working time!' : 'Added new working times!';
        this.setState({ status: { message, type: 'success' }, selected_dates: [] });
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
        let working_time_edit_id = null;
        let start_time = null;
        let end_time = null;

        const workingTimes = this.getWorkingTimes();

        // find working times for selected date
        for (let i = 0; i < workingTimes.length; i += 1) {
            const { id, start, end } = workingTimes[i];

            // check if working time is for today, and if so set start and end time
            if (isSameDay(start, selected_date)) {
                working_time_edit_id = id;
                start_time = start;
                end_time = end;
                break;
            }
        }

        // check if we found a working time for today
        if (start_time != null) {
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
            edit_time_name,
            status,
            confirm,
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
                <ConfirmDialog
                    message={confirm.message}
                    visible={confirm.visible}
                    onConfirm={confirm.onConfirm}
                />

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
                                        edit_time_name: 'start_time',
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
                                        edit_time_name: 'end_time',
                                    });
                                }}
                            />
                        </View>
                        <DateTimePicker
                            isVisible={time_picker_visible}
                            mode="time"
                            onConfirm={picked_time => {
                                // update datetime object to avoid changing the date as
                                // onConfirm returns a date object for the current day
                                let { [edit_time_name]: edit_time_object } = this.state;
                                // edit_time_name is either 'start_time' or 'end_time'

                                // update hours and minutes of currently editing time object
                                const hours = getHours(picked_time);
                                const minutes = getMinutes(picked_time);

                                edit_time_object = setHours(edit_time_object, hours);
                                edit_time_object = setMinutes(edit_time_object, minutes);

                                // error check the new time
                                if (edit_time_name === 'start_time') {
                                    // editing start and the time is after the end time, throw error
                                    if (isAfter(edit_time_object, end_time)) {
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
                                } else if (edit_time_name === 'end_time') {
                                    if (!isAfter(edit_time_object, start_time)) {
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
                                    [edit_time_name]: edit_time_object,
                                    time_picker_visible: false,
                                });
                            }}
                            onCancel={() => this.setState({ time_picker_visible: false })}
                        />
                        <Button
                            title="Confirm"
                            onPress={() => {
                                const { dates, overlapping_times } = this.validateAndFormatDates();

                                // check for overlapping times
                                if (overlapping_times.length) {
                                    // dialog to confirm we want to upsert all non overlapping times
                                    const message =
                                        "The time you have selected overlaps with working times. Do you want to create working times for all dates that don't overlap";
                                    this.setState({
                                        confirm: {
                                            visible: true,
                                            message,
                                            onConfirm: () => this.upsertWorkingTimes(dates),
                                        },
                                    });
                                } else {
                                    // no overlapping, upsert
                                    this.upsertWorkingTimes(dates);
                                }
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

// query for deleteing working times
const EmployeeScheduleDelete = graphql(DELETE_WORKING_TIMES, {
    options: () => ({ refetchQueries: ['getWorkingTimes'] }), // refetch working times on upsert
    name: 'deleteWorkingTimes',
})(EmployeeScheduleGet);

const EmployeeScheduleRedux = connect(mapStateToProps)(EmployeeScheduleDelete);

export default EmployeeScheduleRedux;
