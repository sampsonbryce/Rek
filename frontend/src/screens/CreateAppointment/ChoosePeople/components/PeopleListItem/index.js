import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { BERRY_BLUE } from 'src/constants';

/*
 * Individual employee that can provide a service
 */
const PeopleListItem = props => {
    const {
        person: { name },
        onSelect,
        active,
    } = props;

    const style = [styles.item];

    // add active style
    if (active) style.push(styles.active);

    return (
        <TouchableHighlight style={style} onPress={onSelect}>
            <View>
                <Text style={styles.text}>{name}</Text>
                {/* <Text style={styles.text}>{title}</Text> */}

                <Button title="View" />
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: 150,
        borderRadius: 10,
        borderColor: 'lightslategrey',
        borderWidth: 1.5,
        margin: 10,
    },
    text: {
        textAlign: 'center',
    },
    active: {
        backgroundColor: BERRY_BLUE,
    },
});

PeopleListItem.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
};

export default PeopleListItem;
