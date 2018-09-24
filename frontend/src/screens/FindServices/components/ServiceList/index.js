import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import ServiceListItem from "../ServiceListItem";


export default class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                { name: "Bob", job: "Barber"},
                { name: "Dave", job: "Masseur"},
                { name: "Dave", job: "Masseur"},
                { name: "Dave", job: "Masseur"},
            ]
        }
    }

    render(){
        return (
            <View style={styles.list}>
                <FlatList 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={({item}) => 
                        <ServiceListItem name={item.name} job={item.job}/>
                    }
                >
               </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flex:1,
    },
    item:{
        flex:1,
        width:300,
        backgroundColor:'red',
        shadowColor: 'black',
        shadowOffset: {
            width:3,
            height:3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    }
})