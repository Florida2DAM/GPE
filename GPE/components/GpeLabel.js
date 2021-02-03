import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

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
        backgroundColor: '#3b3b3b',
    },
});
