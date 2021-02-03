'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import { Filter } from '../components/Filter';

const style = require('../components/Styles');

export default class MainScreen extends Component {
    prueba = () => {
        console.log("Filtrao a quedao");
    }

    render() {
        return (
            <View style={style.container}>                
                <Filter onChange={this.prueba}></Filter>
            </View>
        );
    }
}
