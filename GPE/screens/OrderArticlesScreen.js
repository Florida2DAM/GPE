/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { ArticleCard } from '../components/ArticleCard';

const style = require('../components/Styles');

export default class OrderArticlesScreen extends Component {
    constructor() {
        super();
        this.state = {
            itemList: [
                {
                    id: 1,
                    name: 'item1',
                    price: 75,
                },
                {
                    id: 2,
                    name: 'item2',
                    price: 40,
                },
                {
                    id: 3,
                    name: 'item3',
                    price: 10,
                },
                {
                    id: 4,
                    name: 'item1',
                    price: 25,
                },
                {
                    id: 5,
                    name: 'item2',
                    price: 89,
                },
                {
                    id: 6,
                    name: 'item3',
                    price: 64,
                },
                {
                    id: 7,
                    name: 'item1',
                    price: 34,
                },
                {
                    id: 8,
                    name: 'item2',
                    price: 58,
                },
                {
                    id: 9,
                    name: 'item3',
                    price: 10,
                },
                {
                    id: 10,
                    name: 'item1',
                    price: 20,
                },
                {
                    id: 11,
                    name: 'item2',
                    price: 2,
                },
                {
                    id: 12,
                    name: 'item3',
                    price: 1,
                },
            ],
            buyList: [

            ],
            visible: true,
        };
    }

    invisible = () => {
        this.setState({ visible: false });
    };
    visible = () => {
        this.setState({ visible: true });
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Add Items'}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    rightIcon={'arrow-forward-ios'} rightIconSize={40}
                    pressRightIcon={() => this.props.navigation.navigate('OrderConfirmsScreen')} />
                <GPEFilter onFocus={this.invisible} onBlur={this.visible} />
                {this.state.visible ?
                    <View style={[style.container, { flexDirection: 'column' }]}>
                        <FlatList
                            data={this.state.itemList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable onPress={() => this.props.navigation.navigate('OrderAddItemsScreen', {
                                        name: item.name,
                                        price: item.price,
                                    })}>
                                        <ArticleCard selectedItem={item} />
                                    </Pressable>
                                );
                            }}
                        />
                    </View> : <View />}
            </View>
        );
    }
}
