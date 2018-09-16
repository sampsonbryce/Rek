import React, { Component }from 'react';
import { Text } from 'react-native';
import Input from 'src/components/Input';

export default class Signup extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Input placeholder="email">
            </Input>
        )
    }
}