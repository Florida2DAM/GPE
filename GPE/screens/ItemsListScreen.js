'use strict';

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {ItemCard} from '../components/ItemCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';

const style = require('../components/Styles');

export default class ItemsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: [{
                name: 'Item1',
                brandName: 'brand1',
                id: 1,
            }
                , {
                    name: 'Item2',
                    brandName: 'brand2',
                    id: 2,
                }
                , {
                    name: 'Item4',
                    brandName: 'brand4',
                    id: 4,
                }
                , {
                    name: 'Item5',
                    brandName: 'brand5',
                    id: 5,
                }
                , {
                    name: 'Item6',
                    brandName: 'brand6',
                    id: 6,
                },
                {
                    name: 'Item4',
                    brandName: 'brand4',
                    id: 7,
                }
                , {
                    name: 'Item5',
                    brandName: 'brand5',
                    id: 8,
                }
                , {
                    name: 'Item6',
                    brandName: 'brand6',
                    id: 9,
                },
            ],
        };
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                               pressLeftIcon={this.onPressLeftIcon}
                               pageName={'Item List'}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={this.onPressRightIcon}/>
                <GPEFilter/>
                <FlatList
                    data={this.state.info}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => (<ItemCard element={item}/>)}
                />
            </View>

        );
    }
}
