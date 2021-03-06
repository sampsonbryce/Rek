import React from 'react';
import { Image, Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { BERRY_BLUE } from 'src/constants';
import Images from 'src/assets/images';

/*
 * Individual employee that can provide a service
 */
const PeopleListItem = props => {
    const {
        person: { name },
        onSelect,
        active,
        image,
    } = props;

    const style = [styles.item];

    // add active style
    if (active) style.push(styles.active);

    return (
        <TouchableHighlight style={style} onPress={onSelect}>
            <View>
                <Image source={image} style={styles.image} />
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
    image: {
        borderRadius: 10,
        margin: 10,
        position: 'relative',
        left: 40,
        height: 50,
        width: 50,
    },
});

PeopleListItem.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    image: PropTypes.number,
};

PeopleListItem.defaultProps = {
    image: Images.defaultProfilePic,
};

export default PeopleListItem;
