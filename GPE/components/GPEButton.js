import React, {Component} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

export class GPEButton extends Component {
    render() {
        return (
            <Pressable style={styles.button} onPress={this.props.callback}>
                <View>
                    <Icon name={this.props.iconName} type='material' size={this.props.iconSize} color={'#ffcc57'}/>
                    <Text style={styles.text}>{this.props.buttonName}</Text>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        padding: '2%',
        width: '80%',
    },
    text: {
        color: 'white',
        fontSize: 28,
    },
});
