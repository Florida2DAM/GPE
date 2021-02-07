/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import {GPEApi, axios, style} from '../components/GPEConst';

export default class ItemsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: []
        };
    }

    componentDidMount() {
        axios.get(GPEApi + 'articles').then((response) => {
            const result = response.data;
            this.setState({info: result});
            console.log(result);
        }, (rejectedResult) => {
            console.error(rejectedResult.statusText);
        });
    }

    onPressLeftIcon = () => {
        this.props.navigation.goBack();
    }    

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                               pageName={'Item List'}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={this.onPressRightIcon}/>
                <GPEFilter/>
                <FlatList
                    data={this.state.info}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => (<ItemCard element={item} />)}
                />
            </View>

        );
    }
}
