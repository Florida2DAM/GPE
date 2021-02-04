'use strict';

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {ArticleCard} from '../components/ArticleCard';

const style = require('../components/Styles');

export default class OrderArticlesScreen extends Component {
    constructor() {
        super();
        this.state = {
            itemList: [
                {
                    id: 1,
                    name: 'item1',
                },
                {
                    id: 2,
                    name: 'item2',
                },
                {
                    id: 3,
                    name: 'item3',
                },
                {
                    id: 4,
                    name: 'item1',
                },
                {
                    id: 5,
                    name: 'item2',
                },
                {
                    id: 6,
                    name: 'item3',
                },
                {
                    id: 7,
                    name: 'item1',
                },
                {
                    id: 8,
                    name: 'item2',
                },
                {
                    id: 9,
                    name: 'item3',
                },
                {
                    id: 10,
                    name: 'item1',
                },
                {
                    id: 11,
                    name: 'item2',
                },
                {
                    id: 12,
                    name: 'item3',
                },
            ],
            visible: true,
        };
    }

    invisible = () => {
        this.setState({visible: false});
    };
    visible = () => {
        this.setState({visible: true});
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Add Items'}
                               rightIcon={'arrow-forward-ios'} rightIconSize={40}/>
                <GPEFilter onFocus={this.invisible} onBlur={this.visible}/>
                {this.state.visible ?
                    <View style={[style.container, {flexDirection: 'column'}]}>
                        <FlatList
                            data={this.state.itemList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return (
                                    <ArticleCard selectedItem={item}/>
                                );
                            }}
                        />
                    </View> : <View/>}
            </View>
        );
    }
}
