import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { BERRY_BLUE } from 'src/constants';

const UserListItem = props => {
    const item_styles = [styles.item];

    const { index, name, id, navigation } = props;

    // cycle dark blue color
    if (index % 2 === 0) item_styles.push(styles.darkblue);

    return (
        <View style={item_styles}>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View>
                <Button
                    title="Edit"
                    styles={styles.button}
                    onPress={() => {
                        navigation.navigate('EditUser', {
                            id,
                        });
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    darkblue: {
        backgroundColor: BERRY_BLUE,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flex: 1,
    },
    nameContainer: {
        flex: 1,
        paddingLeft: 20,
    },
});

UserListItem.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    navigation: PropTypes.instanceOf(Navigation).isRequired,
};

export default UserListItem;
