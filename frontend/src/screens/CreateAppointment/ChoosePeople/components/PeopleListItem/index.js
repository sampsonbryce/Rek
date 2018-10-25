import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';

/*
 * Individual employee that can provide a service
 */
const PeopleListItem = props => {
    const { name, title } = props;
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{title}</Text>

            <Button title="View" />
        </View>
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
});

PeopleListItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default PeopleListItem;
