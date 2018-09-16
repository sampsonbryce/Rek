import React, { Component }from 'react';
import { Text, TextInput } from 'react-native'

export default class Input extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <TextInput {...this.props}>
            </TextInput>
        )
    }
}