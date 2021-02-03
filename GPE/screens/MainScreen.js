'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import { Filter } from '../components/Filter';

const style = require('../components/Styles');

export default class MainScreen extends Component {
    render() {
        return (
            <View style={style.container}>                
                <Filter></Filter>
            </View>
        );
    }
}
