/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
'use strict';

import React, {Component} from 'react';
import {View} from "react-native";
import { NavigationBar } from '../components/NavigationBar';


const style = require('../components/Styles');

export default class MainScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <NavigationBar lIcon={"navigate-before"} pageName={"Clients"} rIcon={"add"}></NavigationBar>
            </View>
        );
    }
}
