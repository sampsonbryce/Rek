import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function StatusBar(props) {
    const { message, type } = props;

    if (message) {
        return (
            <View style={[styles[type], styles.bar]}>
                <Text style={styles.text}>{message}</Text>
            </View>
        );
    }
    return <View />;
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    error: {
        backgroundColor: 'red',
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
    message: null,
    type: null,
};

export default StatusBar;
