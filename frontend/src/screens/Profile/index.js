import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import User from 'src/class/User';
import { connect } from 'react-redux';

class Profile extends Component {
    static propTypes = {
        user: PropTypes.shape(User).isRequired,
    };

    renderEmployeeProfile() {
        const { user, navigation } = this.props;
        console.log('user: ', user);
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
