import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Button } from 'react-native-elements';

export class ContactInfo extends Component {
    render() {
        return (
            <View style={styles.input}>
                <View>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text style={styles.text}>DNI: {this.props.dni}</Text>
                </View>
                <Button title='CHANGE' type='clear' titleStyle={styles.textButton}
                    onPress={this.props.change}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        padding: '2%',
        backgroundColor: '#3b3b3b',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 22,
    },
    textButton: {
        fontSize: 20,
        color: '#ffcc57',
        fontWeight: 'bold',
    },
});