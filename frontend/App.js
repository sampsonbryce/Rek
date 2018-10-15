import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
// import { Font } from 'expo';
import store from './src/store';
import Main from './src/main';
import t from 'tcomb-form-native/lib';
import Theme from './src/theme';


// initialize our theme styles
Theme.init();


const client = new ApolloClient({
  // uri: "http://localhost:4000"
  // uri: "http:/192.168.1.149:4000"
  uri: "http://10.0.2.2:4000",
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <Provider store={store}>
          <View style={{flex:1}}>
            <StatusBar hidden={true}/>
            {/* {
              this.state.fontLoaded ? ( */}
                <Main />
              {/* ): null
            } */}
          </View>
        </Provider>
      </ApolloProvider>
    ); 
  }
}

