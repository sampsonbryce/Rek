import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { Font } from 'expo';
import store from './src/store';
import Main from './src/main';
import {BERRY_BLUE} from './src/constants';

// set global styles for certain components
import { setCustomTextInput, setCustomText } from 'react-native-global-props';


const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    height: 20
  }
}

const customTextProps = {
  style:{
    fontFamily: 'Economica'
  }
}

setCustomTextInput(customTextInputProps);
// setCustomText(customTextProps);

const client = new ApolloClient({
  // uri: "http://localhost:4000"
  // uri: "http:/192.168.1.149:4000"
  uri: "http://10.0.2.2:4000"
});

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }
  async componentDidMount(){
    // load fonts for expo app
    await Font.loadAsync({
      'Economica': require('./assets/fonts/Economica-Regular.ttf'),
    });

    this.setState({ fontLoaded: true});
  }
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
