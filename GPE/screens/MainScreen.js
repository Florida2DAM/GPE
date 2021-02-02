'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import { BuyItem } from '../components/BuyItem';

const style = require('../components/Styles');

export default class MainScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <BuyItem></BuyItem>
            </View>
        );
    }
}
