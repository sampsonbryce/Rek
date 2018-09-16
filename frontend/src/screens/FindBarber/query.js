import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import {
    ActivityIndicator,
    Text,
} from 'react-native';

const GetInfoQuery = gql`
    query{
        info
    }
`

const Info = () => {
    return (
        <Query query={GetInfoQuery}>
        {({loading, error, data}) => {
            if (loading) return <ActivityIndicator />
            if (error) return <Text>{`Error: ${error}`}</Text>

            return (
                <Text>{data.info}</Text>
            )
        }}
        </Query>
    )
}

export default Info;