import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from 'src/components/Button';
import { BERRY_BLUE } from '../../../../constants';

export default class UserListItem extends Component{
    render(){
        let item_styles = [styles.item];
        // cycle dark blue color
        if(this.props.index % 2 == 0) item_styles.push(styles.darkblue);

        return(
            <View style={item_styles}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Edit"
                        styles={styles.button}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    darkblue:{
        backgroundColor: BERRY_BLUE,
    },
    item:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
    },
    buttonContainer: {
        // flex:1,
    },
    button: {
        flex:1,
    },
    name:{
        // textAlign: 'center',
    },
    nameContainer:{
        flex:1,
        paddingLeft: 20,
    }
})