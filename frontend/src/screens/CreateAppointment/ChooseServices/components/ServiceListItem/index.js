import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { BERRY_BLUE } from 'src/constants';

/*
 * List item in services list for create appointment
 */
const ServiceListItem = props => {
    const {
        service: { name },
        active,
        onSelect,
    } = props;

    const style = [styles.card];

    // add active style
    if (active) style.push(styles.active);

    return (
        <TouchableHighlight style={style} onPress={onSelect}>
            <Text>{name}</Text>
        </TouchableHighlight>
    );
};

ServiceListItem.propTypes = {
    service: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    active: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    card: {
        height: 100,
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
    },
    active: {
        backgroundColor: BERRY_BLUE,
    },
});

export default ServiceListItem;
