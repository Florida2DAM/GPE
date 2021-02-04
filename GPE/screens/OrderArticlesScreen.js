'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {SelectQuantity} from '../components/SelectQuantity';

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
        };
    }

    render() {
        return (
            <View style={style.container}>
                <SelectQuantity getItemInfo={this.state.itemList[0]}/>
            </View>
        );
    }
}
