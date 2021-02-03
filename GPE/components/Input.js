import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

export class InputGPE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    textChange = event => {
        this.setState({ text: event.target.value });
    };

    eraseContent = () => {
        this.setState({ text: "" });
    }

    render() {
        return (
            <View style={[styles.input, {aspectRatio: this.props.height, width: this.props.width}]}>
                <View style={{ width: '80%' }}>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: '2%' }}>{this.props.title}</Text>
                    <TextInput id="hola" style={{ color: 'white', fontSize: 20 }} placeholder={this.props.placeholder}
                        placeholderTextColor='#7c7c7c' onChange={this.textChange} value={this.state.text} />
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Icon
                        name='cancel'
                        type='material'
                        color='#ffcc57'
                        size={40}
                        onPress={this.eraseContent} />
                </View>
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
    }
});