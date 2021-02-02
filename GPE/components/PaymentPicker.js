import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export class PaymentPicker extends Component {
    constructor() {
        super();
        this.state = {
            selectedMethod: '',
        };
    }

    updateMethod = (method) => {
        this.setState({selectedMethod: method});
    };

    render() {
        const paymentMethods = ['Cash', 'Card', 'Pending'];
        return (
            <View style={{alignItems: 'center'}}>
                <Picker selectedValue={this.state.selectedMethod} onValueChange={this.updateMethod}
                        style={styles.picker} itemStyle={styles.item}>

                    <Picker.Item label={paymentMethods[0]} value={paymentMethods[0]}/>
                    <Picker.Item label={paymentMethods[1]} value={paymentMethods[1]}/>
                    <Picker.Item label={paymentMethods[2]} value={paymentMethods[2]}/>
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: '#3b3b3b',
        height: '25%',
        width: '30%',
        color: '#f7f7f7',
    },
    item:{
        color: '#f7f7f7',
    }
});
