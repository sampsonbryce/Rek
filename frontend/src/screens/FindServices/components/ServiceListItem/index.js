import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import Images from 'src/assets/images';

/*
 * Individual employee that can provide a service
 */
const ServiceListItem = props => {
    const { name, title, services, image } = props;
    return (
        <View style={styles.item}>
            <Image source={image} style={styles.image} />
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{title}</Text>

            {/* Render the services the employee provides */}
            {services.map(service => (
                <Text style={styles.text}>{service}</Text>
            ))}
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
    image: {
        borderRadius: 10,
        margin: 10,
        position: 'relative',
        left: 40,
        height: 50,
        width: 50,
    },
});

ServiceListItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string,
};

ServiceListItem.defaultProps = {
    image: Images.defaultProfilePic,
};

export default ServiceListItem;
