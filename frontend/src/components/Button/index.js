import React, { Component }from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import { BERRY_DARK_BLUE, BERRY_BLUE} from 'src/constants';

export default class Input extends Component{
    constructor(props){
        super(props);
    }
    render(){

        return (
            <TouchableHighlight
                activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : 1}
                style={[this.props.style, styles.button]} 
                underlayColor={BERRY_BLUE}
                onPress={this.props.onPress ? this.props.onPress : () => {}}
                >

                <Text
                    style={[this.props.textStyle, styles.text]}
                >{this.props.title}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: BERRY_DARK_BLUE,
        margin: 10,
        padding:10,
        borderRadius:5,
    },
    text:{
        color:'white',
        textAlign:'center',
    }
})