'use strict';

import React, {Component} from 'react';
import {View,Text,FlatList} from "react-native";
import { ItemCard } from '../components/ItemCard';
const style = require('../components/Styles');

export class ItemsListScreen extends Component {

    constructor(props){
        super(props)

    this.state={
        dadesAMostrar:[{name: 'Item1',
        brandName: 'brand1',
        id: 1,
        }
        ,{name: 'Item2',
        brandName: 'brand2',
        id: 2,
      }
        ,{name: 'Item4',
        brandName: 'brand4',
        id: 4,
        }
        ,{name: 'Item5',
        brandName: 'brand5',
        id: 5,
        }
        ,{name: 'Item6',
        brandName: 'brand6',
        id: 6,
        }]

      }
    }

    render() {
        return (

                    <View style={style.container}>
                        <Text style={{marginBottom:'30%'}}>test</Text>

                    <View>
                        <FlatList
                   data={this.state.dadesAMostrar}
                   keyExtractor={(item, index)=>index.toString()}
                   style={{padding:5}}
                   renderItem={(item)=>(<ItemCard elementAMostrar={item}/>  )}
                   />
                    </View>
                    </View>
                );
            }
        }
