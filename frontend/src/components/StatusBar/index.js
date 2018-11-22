import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { ERROR_RED } from 'src/constants';
import { Ionicons } from '@expo/vector-icons';

const BAR_HEIGHT = 60;
const ANIMATION_DURATION = 2000;

/*
 * Status bar for rendering ui messages to the user
 */
// const StatusBar = props => {
class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            top_position: new Animated.Value(-BAR_HEIGHT),
        };
    }

    // determine if we will show the status bar
    componentWillReceiveProps(nextProps) {
        const { message: current_message } = this.props;
        const { message } = nextProps;
        // Show status bar if the message is different and the message is not empty
        if (message !== current_message && message !== '') {
            this.show();
        }
    }

    // show the bar
    show() {
        const { top_position } = this.state;
        this.setState({ show: true });

        // animate the show
        Animated.timing(top_position, {
            toValue: 10,
            duration: ANIMATION_DURATION,
        }).start();
    }

    // Hide the bar
    hide() {
        const { top_position } = this.state;
        this.setState({ show: false });

        // Animate the hide
        Animated.timing(top_position, {
            toValue: -BAR_HEIGHT,
            duration: ANIMATION_DURATION,
        }).start();
    }

    render() {
        const { show, top_position } = this.state;
        const { message, type, timeout } = this.props;

        // use negative numbers to indicate timeout. Only set timeout if status bar is visible
        if (timeout > 0 && show) {
            setTimeout(() => {
                this.hide();
            }, timeout);
        }

        // render a status if one exists
        return (
            <Animated.View style={[styles[type], styles.bar, { top: top_position }]}>
                <Text style={styles.text}>{message}</Text>
                <TouchableOpacity onPress={() => this.hide()}>
                    <Ionicons name="ios-close-circle-outline" size={35} color="white" />
                </TouchableOpacity>
            </Animated.View>
        );

        // otherwise render an empty view
        return <View />;
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        flex: 1,
    },
    error: {
        backgroundColor: ERROR_RED,
    },
    success: {
        backgroundColor: 'green',
    },
    bar: {
        height: BAR_HEIGHT,
        padding: 10,
        position: 'absolute',
        right: 10,
        left: 10,
        borderRadius: 5,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
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
