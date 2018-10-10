import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from 'src/components/Button';

/*
 * Individual employee that can provide a service
 */
export default class ServiceListItem extends Component {
    render(){
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.text}>{this.props.title}</Text>

                {/* Render the services the employee provides */}
                {this.props.services.map((service, index) => {
                    return <Text style={styles.text}>{service}</Text>
                })}
                <Button
                    title="View"
                    onPress={()=> {
                        this.props.navigation.navigate("TestComp")
                      }
                    }
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
