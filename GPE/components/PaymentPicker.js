import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export class PaymentPicker extends Component {
    constructor() {
        super();
        this.state = {
            selectedMethod: '',
        };
    }

    render() {
        const paymentMethods = ['Cash', 'Card', 'Pending'];
        return (
            <View style={{width: '60%'}}>
                <Picker
                    selectedValue={this.state.selectedValue}
                    style={{height: 50, width: 100}}
                    onValueChange={value => this.setState({selectedMethod: value})
                    }>
                    <Picker.Item label={paymentMethods[0]} value={paymentMethods[0]}/>
                    <Picker.Item label={paymentMethods[1]} value={paymentMethods[1]}/>
                    <Picker.Item label={paymentMethods[2]} value={paymentMethods[2]}/>
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#3b3b3b',
        borderWidth: 2,
        borderColor: '#ef802f',
    },
    dropDownStyle: {
        backgroundColor: '#3b3b3b',
        borderWidth: 2,
        borderColor: '#ef802f',
    },
    containerStyle: {
        height: 40,
        backgroundColor: '#3b3b3b',
    },
    placeHolderStyle: {
        color: '#f7f7f7',
        textAlign: 'center',
    },
    labelStyle: {
        color: '#f7f7f7',
        fontSize: 16,
    },
    activeLabelStyle: {
        color: '#ef802f',
    },
});
