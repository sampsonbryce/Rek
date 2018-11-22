import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ERROR_RED } from 'src/constants';

/*
 * Status bar for rendering ui messages to the user
 */
// const StatusBar = props => {
class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: null,
        };
    }

    componentWillUpdate() {
        const { message: current_message, show } = this.state;
        const { message } = this.props;
        if (message !== current_message && show === false) {
            this.setState({ show: true }); // eslint-disable-line
        }
    }

    render() {
        const { show } = this.state;
        const { message, type, timeout } = this.props;

        // use negative numbers to indicate timeout. Only set timeout if status bar is visible
        if (timeout > 0 && show) {
            setTimeout(() => {
                this.setState({ show: false });
            }, timeout);
        }

        // render a status if one exists
        if (show) {
            return (
                <View style={[styles[type], styles.bar]}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            );
        }

        // otherwise render an empty view
        return <View />;
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    error: {
        backgroundColor: ERROR_RED,
    },
    success: {
        backgroundColor: 'green',
    },
    bar: {
        padding: 15,
        position: 'absolute',
        top: 10,
        right: 10,
        left: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
});

StatusBar.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    timeout: PropTypes.number,
};

StatusBar.defaultProps = {
    message: '',
    type: null,
    timeout: 5000, //  default 5 second delay on timeout
};

export default StatusBar;
