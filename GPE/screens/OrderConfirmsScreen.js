'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import { ContactInfo } from '../components/ContactInfo';

const style = require('../components/Styles');

export default class OrderConfirmsScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <ContactInfo name='Juan José Pleguezuelos' dni='78671234S'></ContactInfo>
            </View>
        );
    }
}
