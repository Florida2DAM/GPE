'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {EmployeePicker} from '../components/EmployeePicker';

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
                <EmployeePicker getEmployee={this.getEmployee}/>
            </View>
        );
    }
}
