/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { ItemCard } from '../components/ItemCard';
import { axios, GPEApi, style } from '../components/GPEConst';
import { Button } from 'react-native';

export default class OrderArticlesScreen extends Component {
    constructor() {
        super();
        this.state = {
            allArticles: [],
            articles: [],
            orderLines: [],
            client: {},
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
                EmployeeId: 0,
            }

        };
    }

    componentDidMount() {
        this.getArticles();
        this.getInfo();
    }

    componentDidUpdate() {
        if (this.props.route.params.newOrderLines !== undefined) {
            if (this.props.route.params.newOrderLines !== this.state.orderLines) this.setState({ orderLines: this.props.route.params.newOrderLines });
        }
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.client !== undefined && this.state.client.length === 0) {
                console.log("Tu puta madre");
                this.setState({ client: this.props.route.params.client });
            }
        }
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
        this.setState({ client: this.props.route.params.client });
        this.setState({ employeeId: this.props.route.params.employeeId });
        if (this.props.route.params.orderLines !== undefined) {
            this.setState({ orderLines: this.props.route.params.orderLines });
        }
        if (this.props.route.params.order !== undefined) {
            this.setState({ order: this.props.route.params.order });
        }
    }

    setFilter = (filter) => {
        this.setState({ filter }, () => {
            this.filter();
        });
    };

    filter = () => {
        let articlesList = [];
        if (this.state.filter === '') {
            this.setState({ articles: this.state.allArticles });
        } else {
            this.state.allArticles.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.Description.toUpperCase().includes(filterText) || element.Brand.toUpperCase().includes(filterText) || element.ArticleId === filterText) {
                    articlesList.push(element);
                }
            });
            this.setState({ articles: articlesList });
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
                        employeeId: this.state.employeeId
                    })}
                    rightIcon={'arrow-forward-ios'} rightIconSize={40}
                    pressRightIcon={() => this.props.navigation.navigate('OrderConfirmsScreen', {
                        orderLines: this.state.orderLines,
                        order: this.state.order,
                        client: this.state.client,
                        employeeId: this.state.employeeId
                    })} />
                <GPEFilter onChange={this.setFilter}/>
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
