'use strict';

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {AddItem} from '../components/AddItem';

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
                                    <AddItem selectedItem={item}/>
                                );
                            }}
                        />
                    </View> : <View/>}
            </View>
        );
    }
}
