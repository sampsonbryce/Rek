import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ERROR_RED } from 'src/constants';

/*
 * Status bar for rendering ui messages to the user
 */
const StatusBar = props => {
    const { message, type } = props;

    // render a status if one exists
    if (message) {
        return (
            <View style={[styles[type], styles.bar]}>
                <Text style={styles.text}>{message}</Text>
            </View>
        );
    }

    // otherwise render an empty view
    return <View />;
};

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
    },
});

StatusBar.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
};

StatusBar.defaultProps = {
    message: '',
    type: null,
};

export default StatusBar;
