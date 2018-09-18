import React, { Component } from 'react-native';


export default class SignupForm extends Component{
    render(){
        return (
            <View>
                <Text>Signup</Text>
                {this.state.error ? 
                    (<Text>{this.state.error}</Text>)
                : null}
                <TextInput placeholder="Name" 
                    onChangeText={(text) => this.setState({name: text})}
                />
                <TextInput placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                 />
                <TextInput placeholder="Confirm Password" 
                    onChangeText={(text) => this.setState({confirm_password: text})}
                />
                <Button
                    onPress={this.props.signupSubmit}
                    title="Submit"
                />
            </View>
        )
    }
}
