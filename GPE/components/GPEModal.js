import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

export class GPEModal extends Component {
    render() {
        return (
            <Overlay isVisible={this.props.isVisible} overlayStyle={styles.container}>
                <Text style={{ fontSize: 20, color: 'white' }}>{this.props.content}</Text>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <Button type='clear' title={this.props.leftButtonTitle} onPress={this.props.leftButtonPress}
                        titleStyle={{ color: '#ffcc57' }} />
                    <Button type='clear' title={this.props.rightButtonTitle} onPress={this.props.rightButtonPress}
                        titleStyle={{ color: '#ffcc57' }} />
                </View>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#3b3b3b',
        borderWidth: 2,
        borderRadius: 9,
        borderColor: '#ffcc57',
    },
});