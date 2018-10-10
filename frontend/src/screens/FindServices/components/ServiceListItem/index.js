import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Button from 'src/components/Button';

/*
 * Individual employee that can provide a service
 */
export default class ServiceListItem extends Component {
    render(){
        let pic = this.props.image;
        console.log("here is that Image");
        console.log(this.props.image);
        return (
            <View style={styles.item}>
                <Image source={this.props.image}/>
                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.text}>{this.props.title}</Text>

                {/* Render the services the employee provides */}
                {this.props.services.map((service, index) => {
                    return <Text style={styles.text}>{service}</Text>
                })}
                <Button 
                    title="View"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        width:150,
        borderRadius:10,
        borderColor: 'lightslategrey',
        borderWidth:1.5,
        margin:10,
    },
    text:{
        textAlign: 'center',
    },
})