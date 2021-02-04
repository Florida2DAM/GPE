'use strict';

import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ItemCard} from '../components/ItemCard';

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
            ],
        };
    }

    render() {
        return (
            <View style={style.container}>
                    <View style={{ flex: 1 }}>
                        <Text>test</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                    <FlatList
                        data={this.state.info}
                        keyExtractor={(item, index) => index.toString()}
                        style={{padding: 5}}
                        renderItem={(item) => (<ItemCard element={item}/>)}
                    />
                    </View>
                </View>

        );
    }
}
