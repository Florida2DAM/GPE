'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';

const style = require('../components/Styles');

export default class SettingsScreen extends Component {

    constructor() {
        super();
        this.state = {
            employee: '',
        };
    }

    getEmployee = (e) => {
        this.setState({employee: e});
    };

    render() {
        return (
            <View style={[style.container, style.flexColumnCenter]}>
                <GPEPicker pickerSize={'45%'} sendIcon={'perm-identity'} getOption={this.getEmployee}/>
            </View>
        );
    }
}
