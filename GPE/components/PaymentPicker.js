import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';

export class PaymentPicker extends Component {
    constructor() {
        super();
        this.state = {
            selectedMethod: '',
            paymentMethods: ['Payment Method','Cash', 'Card', 'Pending'],
        };
    }

    updateMethod = (e) => {
        this.setState({selectedMethod: e});
        this.props.getPaymentMethod(e);
    };

    render() {
        return (
            <View style={styles.view}>
                <Icon name='payment' type='material' size={40} color={'#ef802f'}
                      style={{marginLeft: '12%', marginTop: '7%'}}/>
                <Picker selectedValue={this.state.selectedMethod} onValueChange={this.updateMethod}
                        style={styles.picker} itemStyle={styles.item}>
                    {this.state.paymentMethods.map((item, index) => {
                        return (
                            <Picker.Item label={item} value={item} key={index}/>
                        );
                    })}
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: '#3b3b3b',
        color: '#f7f7f7',
        width: '60%',
        fontSize: 28,
    },
    item: {
        color: '#f7f7f7',
    },
    view: {
        borderColor: '#ef802f',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: '#3b3b3b',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
