import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
import { StatusBar} from 'react-native';
import FindBarber from './src/screens/FindBarber'
import Main from './src/main';

const client = new ApolloClient({
  // uri: "http://localhost:4000"
  uri: "http:/192.168.1.149:4000"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StatusBar hidden />
        <Main></Main>
      </ApolloProvider>
    );
  }
}
