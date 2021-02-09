/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ModifyQuantity } from '../components/ModifyQuantity';
import { NavigationBar } from '../components/NavigationBar';
import { ContactInfo } from '../components/ContactInfo';
import { Divider } from 'react-native-elements';
import { GPELabel } from '../components/GPELabel';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class OrderConfirmsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLines: [],
            totalPrice: 0,
            client: '',
            orderId: 0,
        };

    }

    addOrder = () => {
        axios.post(GPEApi + '/Orders', {
            ClientId: 100,
            Date: '',
            DeliveryDate: '',
            Total: 1938.98,
            Delivered: false,
            Paid: 0.0,
            PayingMethod: null,
            Deliverer: "Jesus",
            EmployeeId: 2,
        }).then(this.getOrderId);
    }

    getOrderId = () => {
        axios.get(GPEApi + 'Orders/GetLast').then((response) => {
            this.setState({OrderId: response.OrderId}, () => {this.addOrderLines();});
        });
    }

    addOrderLines = () => {
        let products = [];
        this.state.orderLines.forEach(item => {
            item.OrderId = this.state.orderId;
            products.push(item);
        });
        this.setState({orderLines: products});
        console.log(this.state.orderLines);
        axios.post(GPEApi + '/OrderLines', {orderLines: this.state.orderLines});
    }

    calculateTotalPrice = () => {
        let total;
        this.state.orderLines.forEach(product => {
            total =+ product.Price
        });
    }

    componentDidMount() {
        this.setState({ orderLines: this.props.route.params.orderLines });
        this.setState({ client: this.props.client});
        //calculateTotalPrice();
    }

    pressRightIcon = () => {
        this.addOrder();
        this.props.navigation.navigate('VisitSalesScreen');
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                    rightIcon={'check'} rightIconSize={48} pressLeftIcon={() => this.props.navigation.goBack()}

                    pressRightIcon={this.pressRightIcon} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={'WEI Luo'} dni="w12321432" />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />

                <FlatList
                    data={this.state.orderLines}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity name={item.Description} price={item.Price} id={item.ArticleId} units={item.Quantity} />
                            </View>
                        );
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <GPELabel title="Total: " paddingLeft={'2%'} width={'50%'} marginBottom={'4%'} content={this.state.totalPrice}
                        currency='€' />
                </View>
            </View>
        );
    }
}
