'use strict';

import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {NavigationBar} from '../components/NavigationBar';
import {GPELabel} from '../components/GPELabel';
import {GPELogo} from '../components/GPELogo';

const style = require('../components/Styles');

export default class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = {
            employee: '',
            type: 'Deliveryman',
        };
    }

    getEmployee = (e) => {
        this.setState({employee: e});
    };

    render() {
        return (
            <View style={[style.container]}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Settings'}/>
                    <View style={{marginLeft: '5%', marginRight: '5%'}}>
                        <View style={{margin: '10%'}}>
                            <GPELogo/>
                        </View>
                        <GPEPicker pickerSize={'75%'} sendIcon={'perm-identity'} getOption={this.getEmployee}/>
                    </View>
                    <View style={{margin: '5%'}}>
                        <GPELabel title={'Worker Function'} content={this.state.type}/>
                    </View>
            </View>
        );
    }
}
