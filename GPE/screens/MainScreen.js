'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {GPEButton} from '../components/GPEButton';
import {SeparadorLlista} from '../components/SeparatorLine';

const style = require('../components/Styles');

export default class MainScreen extends Component {

    alert = (e) => {
        console.log('Function' + e);
        alert(e);
    };

    render() {
        return (
            <View style={style.container}>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={{fontSize: 37, color: 'white'}}>Pagina Principal</Text>
                    <SeparadorLlista/>
                </View>
                <View style={{
                    margin: '10%',
                    flex: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{flex: 1}}>
                        <GPEButton iconName="local-shipping" iconSize={60} buttonName="Visit"
                                   callback={() => this.alert('hola')}/>
                        <GPEButton iconName="local-shipping" iconSize={60} buttonName="Visit"
                                   callback={() => this.alert('hola')}/>
                    </View>
                    <View style={{flex: 1}}>
                        <GPEButton/>
                        <GPEButton/>
                    </View>
                </View>
                <View style={{flex: 2}}>

                </View>

            </View>
        );
    }
}
