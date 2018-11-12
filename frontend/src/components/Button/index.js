import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { BERRY_DARK_BLUE, BERRY_BLUE } from 'src/constants';
import PropTypes from 'prop-types';

/*
 * Customized button component to use instead of the builtin
 */
const Button = props => {
    const { activeOpacity, style, onPress, textStyle, title, reference } = props;

    return (
        <TouchableHighlight
            ref={reference}
            activeOpacity={activeOpacity}
            style={[styles.button, style]}
            underlayColor={BERRY_BLUE}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: BERRY_DARK_BLUE,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        // width: '100%',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});

Button.propTypes = {
    activeOpacity: PropTypes.number,
    style: PropTypes.number,
    textStyle: PropTypes.number,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    activeOpacity: 1,
    style: null,
    textStyle: null,
    onPress: null,
};

export default Button;
