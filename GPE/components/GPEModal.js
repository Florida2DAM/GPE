import React, { Component } from 'react';
import {  Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
export class GPEModal extends Component {
    render() {
        return (
            <Overlay isVisible={this.props.isVisible} overlayStyle={{ width: "80%", height: "30%", alignItems: "center", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontSize: 20 }}>{this.props.content}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: "flex-end" }}>
                        <View>
                            <Button title={this.props.leftButtonTitle} onPress={this.props.leftButtonPress} />
                        </View>
                        <View style={{ paddingRight: "10%" }}>
                            <Button title={this.props.rightButtonTitle} onPress={this.props.rightButtonPress} />
                        </View>
                    </View>
                </View>
            </Overlay>
        );
    }
}
