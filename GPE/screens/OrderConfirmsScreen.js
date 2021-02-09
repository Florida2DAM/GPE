/* eslint-disable prettier/prettier */
'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ModifyQuantity } from '../components/ModifyQuantity';
import { NavigationBar } from '../components/NavigationBar';
import { ContactInfo } from '../components/ContactInfo';
import { Divider, Overlay } from 'react-native-elements';
import { GPELabel } from '../components/GPELabel';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class OrderConfirmsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Juan',//this.props.client.Name,
            dni: 'muchosnumeros',//this.props.client.Nie,
            products: [
                { name: 'Test1', id: 1, price: 15 },

                { name: 'Test2', id: 2, price: 10.5 },
            ],
            client: this.props.client;
        };

    }

    addOrder = () => {
        axios.post(GPEApi + '/Orders', {
            ClientId: 1,
            OrderNum: 1,
            Date: "2021-02-01T00:00:00",
            DeliveryDate: "1900-01-01T00:00:00",
            Total: 1938.98,
            Delivered: false,
            Paid: 0.0,
            PayingMethod: null,
            Deliverer: "Jesus",
            EmployeeId: 2,
        })
        this.props.navigation.navigate('VisitSalesScreen');
    }

    render() {
        return (
            <View style={style.container}>
                <View>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                        rightIcon={'check'} rightIconSize={48} pressLeftIcon={this.props.navigation.goBack()}
                        pressRightIcon={this.addOrder} />
                </View>
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={this.state.name} dni={this.state.dni} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />

                <FlatList
                    data={this.state.products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity name={item.name} price={item.price} id={item.id} />
                            </View>
                        );
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <GPELabel title="Total: " paddingLeft={'2%'} width={'50%'} marginBottom={'4%'} content="15000"
                        currency='€' />
                </View>
            </View>
        );
    }
}
