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
    state = {
        name: 'WEI Luo',
        dni: 'Y18273678',
        orderLines: [],
        total: 0
    };

    componentDidMount() {
        this.setState({ orderLines: this.props.route.params.orderLines }, 
            () => {this.updateInfo([{LineId: -1}]);  this.setProductsId();});
    }

    setProductsId = () => {
        let i = 1;
        this.state.orderLines.forEach(element => {                        
            element.LineId = i++;;
        });
    }

    removeProduct = (id) => {
        this.setState({orderLines: this.state.orderLines.filter(function(article) {
            return id !== article.LineId;            
        })}, () => this.updateInfo(this.state.orderLines));        
    }

    updateInfo = (product) => {
        let total = 0;
        this.state.orderLines.forEach(element => {
            if (element.LineId === product.LineId) element = product;
            total += element.TotalLine;
        });
        total = Math.trunc(total * 100) / 100;
        this.setState({total});
        console.log(this.state.orderLines);
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                    rightIcon={'check'} rightIconSize={48} 
                    pressLeftIcon={() => this.props.navigation.navigate('OrderArticlesScreen', {
                        orderLines: this.state.orderLines})}
                    pressRightIcon={() => this.props.navigation.navigate('VisitSalesScreen')} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={this.props.route.params.client.Name} dni={this.props.route.params.client.NIF} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <FlatList
                    data={this.state.orderLines}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity orderLine={item} remove={() => this.removeProduct(item.LineId)} 
                                    itemChange={this.updateInfo}/>
                            </View>
                        );
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <GPELabel title="Total: " paddingLeft={'2%'} width={'50%'} marginBottom={'4%'} content={this.state.total}
                        currency='€' />
                </View>
            </View>
        );
    }
}
