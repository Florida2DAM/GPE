'use strict';

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import { ContactInfo } from '../components/ContactInfo';

const style = require('../components/Styles');

export default class OrderConfirmsScreen extends Component {
    changeSomething = () => {
        console.log("HOla");
    }
    render() {
        return (
            <View style={style.container}>
                <ContactInfo change={this.changeSomething} name='Juan José Pleguezuelos' dni='78671234S'></ContactInfo>
            </View>
        );
    }
}
