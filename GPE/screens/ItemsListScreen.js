/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';

const style = require('../components/Styles');
const axios = require('axios');

export default class ItemsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: []
        };
    }

    onPressLeftIcon = () => {
        this.props.navigation.goBack();
    }

    loadEvents() {
        axios.get('http://54.160.33.104/api/articles').then((resolvedResult) => {
            const result = resolvedResult.data;
            this.setState({info: result});
            console.log(result);
        }, (rejectedResult) => {
            console.error(rejectedResult.statusText);
        });
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                    pressLeftIcon={this.onPressLeftIcon}
                    pageName={'Item List'}
                    pressRightIcon={this.onPressRightIcon} />
                <GPEFilter onChange={this.loadEvents}/>
                <FlatList
                    data={this.state.info}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => (<ItemCard element={item} />)}
                />
            </View>

        );
    }
}
