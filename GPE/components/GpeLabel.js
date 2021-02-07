import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native';

export class GpeLabel extends Component {
    render() {
        return (
            <View style={styles.input}>
                <Text style={{color: 'white', fontSize: 15}}>{this.props.title}</Text>
                <TextInput style={{color: 'white', fontSize: 20}} editable={false}>{this.props.content}</TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        padding: '2%',
    }
});