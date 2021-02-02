'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import {PaymentPicker} from '../components/PaymentPicker';

const style = require('../components/Styles');

export default class MainScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <PaymentPicker/>
            </View>
        );
    }
}
