'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ModifyQuantity } from '../components/ModifyQuantity';
import { NavigationBar } from '../components/NavigationBar';
import { ContactInfo } from '../components/ContactInfo';
import { Divider } from 'react-native-elements';
import { GPELabel } from '../components/GPELabel';
import { GPEModal } from '../components/GPEModal';
import { axios, GPEApi, style } from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OrderConfirmsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            itemIdRemove: -1,
            visibleRemove: false,
            visibleConfirm: false,
            juanjo: 0,
            employee: {},
        };
    }

    componentDidMount() {
        this.updateInfo();
        this.setProductsId();
        this.restoreEmployee();
    }

    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        jsonValue != null ? this.setState({employee: JSON.parse(jsonValue)}) : null;        
    };

    addOrder = () => {
        axios.post(GPEApi + 'Orders', {
            ClientId: this.props.route.params.client.ClientId,
            Date: '',
            DeliveryDate: '',
            Total: this.state.total,
            Delivered: false,
            Paid: 0.0,
            PayingMethod: null,
            Deliverer: 'Jesus',
            EmployeeId: this.state.employee.EmployeeId,
        }).then(this.getOrderId);
    };

    getOrderId = () => {
        axios.get(GPEApi + 'Orders/GetLast').then((response) => {
            this.addOrderLines(response.data);
        });
    };

    addOrderLines = (id) => {
        let products = [];
        this.props.route.params.orderLines.forEach(item => {
            item.OrderId = id;
            products.push(item);
        });
        this.setState({ orderLines: products });
        let orderLines = this.props.route.params.orderLines;
        console.log(orderLines);
        axios.post(GPEApi + 'OrderLines', orderLines);
    };

    setProductsId = () => {
        let i = 1;
        this.props.route.params.orderLines.forEach(element => {
            element.LineId = i++;;
        });        
    }

    removeProduct = () => {
        this.props.route.params.orderLines = this.props.route.params.orderLines.filter((article) => {
            return this.state.itemIdRemove !== article.LineId;
        });
        this.updateInfo();
    }

    updateInfo = () => {
        let total = 0;
        this.props.route.params.orderLines.forEach(element => {
            total += element.TotalLine;
        });
        total = Math.trunc(total * 100) / 100;
        this.setState({ total });
    }

    postOrder = () => {
        this.changeVisibleConfirm();
        this.addOrder();
        this.props.navigation.navigate('VisitSalesScreen');        
    };

    changeVisibleRemove = () => {
        this.setState({ visibleRemove: !this.state.visibleRemove });
    }

    changeVisibleConfirm = () => {
        this.setState({ visibleConfirm: !this.state.visibleConfirm });
    };

    render() {
        return (
            <View style={style.container}>                
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                    rightIcon={'check'} rightIconSize={48}
                    pressLeftIcon={() => this.props.navigation.navigate('OrderArticlesScreen', {
                        newOrderLines: this.props.route.params.orderLines,
                        client: this.props.route.params.client
                    })}
                    pressRightIcon={this.changeVisibleConfirm} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={this.props.route.params.client.Name} dni={this.props.route.params.client.NIF}
                    change={() => {
                        this.setState({ juanjo: this.state.juanjo++ });
                        this.props.navigation.navigate('VisitSalesScreen', {
                            juanjo: this.state.juanjo,
                            orderLines: this.props.route.params.orderLines, client: this.props.route.params.client
                        });
                    }} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <FlatList
                    data={this.props.route.params.orderLines}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity orderLine={item} remove={() => {
                                    this.changeVisibleRemove();
                                    this.setState({ itemIdRemove: item.LineId });
                                }}
                                    itemChange={this.updateInfo} />
                            </View>
                        );
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <GPELabel title="Total: " paddingLeft={'2%'} width={'50%'} marginBottom={'4%'} content={this.state.total}
                        currency='€' />
                </View>
                <GPEModal isVisible={this.state.visibleRemove} content='Do you want to delete the item?' leftButtonTitle='Cancel'
                    rightButtonTitle='Confirm' leftButtonPress={this.changeVisibleRemove}
                    rightButtonPress={() => { this.changeVisibleRemove(); this.removeProduct(); }} />
                <GPEModal isVisible={this.state.visibleConfirm} content='End Order?'
                    leftButtonTitle='Cancel' leftButtonPress={this.changeVisibleConfirm}
                    rightButtonTitle='Confirm' rightButtonPress={this.postOrder} />
            </View>
        );
    }
}
