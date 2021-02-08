/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { ItemCard } from '../components/ItemCard';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class OrderArticlesScreen extends Component {
    constructor() {
        super();
        this.state = {
            allArticles: [],
            articles: [],
            clientId: 0,
            employeeId: 0
        };
    }

    componentDidMount() {
        this.getArticles();
        this.getInfo();
    }

    getArticles = () => {
        axios.get(GPEApi + 'articles').then((response) => {
            this.setState({ allArticles: response.data });
            this.setState({ articles: response.data });
        }, (rejectedResult) => {
            console.error(rejectedResult.statusText);
        });
    }

    getInfo = () => {
        this.setState({client: this.props.route.params.clientId});
        this.setState({employee: this.props.route.params.employeeId});
    }

    setFilter = (filter) => {
        this.setState({ filter }, () => {
            this.filter();
        });
    };

    filter = () => {
        let itemList = [];
        if (this.state.filter === '') {
            this.setState({ items: this.state.allItems });
        } else {
            this.state.allItems.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.Description.toUpperCase().includes(filterText) || element.Brand.toUpperCase().includes(filterText) || element.ArticleId === filterText) {
                    itemList.push(element);
                }
            });
            this.setState({ items: itemList });
        }
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Add Items'}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    rightIcon={'arrow-forward-ios'} rightIconSize={40}
                    pressRightIcon={() => this.props.navigation.navigate('OrderConfirmsScreen')} />
                <GPEFilter />
                <View style={[style.container, { flexDirection: 'column' }]}>
                    <FlatList
                        data={this.state.articles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) => (
                            <Pressable onPress={() => this.props.navigation.navigate('OrderAddItemsScreen', {
                                article: item,
                            })}>
                                <ItemCard element={item} />
                            </Pressable>
                        )}
                    />

                </View>
            </View>
        );
    }
}
