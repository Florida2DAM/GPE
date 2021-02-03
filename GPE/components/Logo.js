import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import { TextInput } from 'react-native';

export class Logo extends Component {
    render() {
        return (
            <Image
                style={styles.shield}
                source={require('../assets/transparentLogo.png')}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        padding: '2%',
        width: '80%',
    }
});