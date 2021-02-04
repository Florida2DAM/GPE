'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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
            type:'Deliveryman',
        };
    }

    getEmployee = (e) => {
        this.setState({employee: e});
    };

    render() {
        return (
            <View style={[style.container]}>
                <View style={styles.navigationBar}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Settings'}/>
                </View>
                <View>
                    <GPELogo />
                </View>
                <View>
                    <GPEPicker pickerSize={'50%'} sendIcon={'perm-identity'} getOption={this.getEmployee}/>
                    <GPELabel title={'Worker Function'} content={this.state.type}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        marginTop: '1%',
    },
});
