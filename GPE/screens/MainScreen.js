'use strict';

import React, {Component} from 'react';
import {View ,Text} from "react-native";
import {Logo} from '../components/Logo'

const style = require('../components/Styles');

export default class MainScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <Logo></Logo>
            </View>
        );
    }
}
