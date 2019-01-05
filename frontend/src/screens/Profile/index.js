import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import User from 'src/class/User';
import { connect } from 'react-redux';
import Navigation from 'react-native-navigation';

class Profile extends Component {
    static propTypes = {
        user: PropTypes.shape(User).isRequired,
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    renderEmployeeProfile() {
        const { user, navigation } = this.props;
        if (user.roles.employee) {
            return (
                <View>
                    <Button
                        title="Schedule"
                        onPress={() => {
                            navigation.navigate('EmployeeSchedule');
                        }}
                    />
                </View>
            );
        }

        return <View />;
    }

    render() {
        return <View>{this.renderEmployeeProfile()}</View>;
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(
    mapStateToProps,
    null
)(Profile);
