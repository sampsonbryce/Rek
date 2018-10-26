import React from 'react';
import { View } from 'react-native';

// For navigation
import AppNavigator from 'src/components/nav';

function Main() {
    return (
        <View style={{ flex: 1 }}>
            <AppNavigator />
        </View>
    );
}

export default Main;
