'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEButton} from '../components/GPEButton';
import {GPELogo} from '../components/GPELogo';

const style = require('../components/Styles');

export default class MainScreen extends Component {

    alert = (e) => {
        console.log('Function' + e);
        alert(e);
    };

    render() {
        return (
            <View style={style.container}>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <View style={{marginTop: '20%', marginBottom: '20%', marginRight: '10%', marginLeft:'10%'}}>
                        <GPELogo/>
                    </View>
                </View>
                <View style={[style.flexRowCenter, {justifyContent:'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName="local-shipping" iconSize={60} buttonName="VISIT"
                               callback={() => this.alert('hola')}/>
                    <GPEButton iconName="contact-page" iconSize={60} buttonName="CLIENTS"
                               callback={() => this.alert('hola')}/>
                </View>
                <View style={[style.flexRowCenter, {justifyContent:'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName="category" iconSize={60} buttonName="ITEMS"
                               callback={() => this.alert('hola')}/>
                    <GPEButton iconName="settings" iconSize={60} buttonName="SETTINGS"
                               callback={() => this.alert('hola')}/>
                </View>
            </View>
        );
    }
}
