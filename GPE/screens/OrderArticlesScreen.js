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
            orderLines: [],
            client: [],
            employeeId: 0,
            order: {
                ClientId: 0,
                OrderNum: 0,
                Date: "",
                DeliveryDate: "",
                Total: 0,
                Delivered: false,
                Paid: 0,
                PayingMethod: "",
                Deliverer: "",
                EmployeeId: 0
            }
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
        this.setState({client: this.props.route.params.client});
        this.setState({employeeId: this.props.route.params.employeeId});
        if (this.props.route.params.orderLines !== undefined) {
            this.setState({ orderLines: this.props.route.params.orderLines });
        }
        if (this.props.route.params.order !== undefined) {
            this.setState({ order: this.props.route.params.order });
        }
        console.log("Order: " + this.state.order);
        console.log("OrderLines: " + this.state.orderLines);
        console.log("Employee: " + this.state.employeeId);
        console.log("Client: " + this.state.client);
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
                    pressLeftIcon={() => this.props.navigation.navigate('VisitSalesScreen', {
                        orderLines: this.state.orderLines, 
                        order: this.state.order,
                        client: this.state.client,
                        employeeId: this.state.employeeId})}
                    rightIcon={'arrow-forward-ios'} rightIconSize={40}
                    pressRightIcon={() => this.props.navigation.navigate('OrderConfirmsScreen', {
                        orderLines: this.state.orderLines, 
                        order: this.state.order,
                        client: this.state.client,
                        employeeId: this.state.employeeId})} />
                <GPEFilter />
                <View style={[style.container, { flexDirection: 'column' }]}>
                    <FlatList
                        data={this.state.articles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) => (
                            <Pressable onPress={() => this.props.navigation.navigate('OrderAddItemsScreen', {
                                article: item.item,
                                orderLines: this.state.orderLines
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
