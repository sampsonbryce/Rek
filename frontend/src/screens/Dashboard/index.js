import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from 'src/components/Button';


export default class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                <Text>No appointments</Text>

                {/* Button to Schedule Appointments */}
                <Button 
                    onPress={() => {
                        this.props.navigation.navigate('FindServices');
                    }}
                    title="Schedule Appointment"
                />


                {/* Button to Admin*/}
                <Button 
                    onPress={() => {
                        this.props.navigation.navigate('Admin');
                    }}
                    title="Admin"
                />
            </View>
        )
    }
}