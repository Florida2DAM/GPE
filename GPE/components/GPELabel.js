import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export class GPELabel extends Component {
    render() {
        return (
            <View style={[styles.input, {paddingLeft:this.props.paddingLeft, width: this.props.width, aspectRatio: this.props.height, marginTop: this.props.marginTop,
                marginBottom: this.props.marginBottom}]}>
                <Text style={{color: 'white', fontSize: 15}}>{this.props.title} {this.props.currency}</Text>
                <TextInput style={{color: 'white', fontSize: 20}} editable={false}>{this.props.content} {this.props.currency}</TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        backgroundColor: '#3b3b3b',
    },
});
