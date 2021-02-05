'use strict';

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {ModifyQuantity} from '../components/ModifyQuantity';

const style = require('../components/Styles');

export default class DeliverCheckScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: [{
                name: 'carchofa',
                id: 1,
                price: 30,
            },
                {
                    name: 'dffdf',
                    id: 2,
                    price: 30,
                },
                {
                    name: 'cassfsdfgrchofa',
                    id: 3,
                    price: 30,
                }],
        };
    }

    onPressLeftIcon = () => {
        console.log('pulsa el de la izquierda');
    };

    onPressRightIcon = () => {
        console.log('pulsa el de la derecha');
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60} pressLeftIcon={this.onPressLeftIcon}
                               pageName={'Checkout'} rightIcon={'navigate-next'} rightIconSize={60}
                               pressRightIcon={this.onPressRightIcon}/>
                <View style={{marginTop: '5%'}}>
                    <FlatList
                        data={this.state.info}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1}}>
                                    <ModifyQuantity name={item.name} price={item.price} id={item.id}/>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
