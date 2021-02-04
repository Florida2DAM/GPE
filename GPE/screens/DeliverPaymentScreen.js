'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';

const style = require('../components/Styles');
export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            paymentMethod: '',
        };
    }

    getPaymentMethod = (e) => {
        this.setState({paymentMethod: e});
    };

    render() {
        return (
            <View style={[style.container, style.flexColumnCenter]}>
<<<<<<< Updated upstream
                <View
                    style={{
                        height: 1.5,
                        width: '80%',
                        backgroundColor: 'white',
                    }}
                />
                <GPEPicker pickerSize={'45%'} sendIcon={'payment'} getOption={this.getPaymentMethod}/>
=======
                <View style={[style.container, style.flexRowCenter]}>
                <GPEInput/>
                <GPEInput/>
                </View>
                <GPEInput/>
                <GPEInput/>
                <GPEPicker sendIcon={'payment'} getOption={this.getPaymentMethod}/>
>>>>>>> Stashed changes
            </View>
        );
    }
}
