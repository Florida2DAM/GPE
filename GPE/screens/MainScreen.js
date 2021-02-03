'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import { InputGPE } from '../components/Input';

const style = require('../components/Styles');

export default class MainScreen extends Component {
    getEmployee = (value) => {
        console.log(value);
    };

    render() {
        return (
            <View style={style.container}>
                <InputGPE title='Units' placeholder='Units to introduce' height={6} width='100%' getValue={this.getEmployee}></InputGPE>
            </View>
        );
    }
}
