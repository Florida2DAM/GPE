'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {PaymentPicker} from '../components/PaymentPicker';

const style = require('../components/Styles');

export default class MainScreen extends Component {

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
                <PaymentPicker getPaymentMethod={this.getPaymentMethod}/>
            </View>
        );
    }
}
