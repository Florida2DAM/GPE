'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ModifyQuantity } from '../components/ModifyQuantity';
import { NavigationBar } from '../components/NavigationBar';
import { ContactInfo } from '../components/ContactInfo';
import { Divider } from 'react-native-elements';
import { GPELabel } from '../components/GPELabel';

const style = require('../components/Styles');

export default class OrderConfirmsScreen extends Component {
    state = {
        name: 'WEI Luo',
        dni: 'Y18273678',
        products: [],
    };

    componentDidMount() {
        this.setState({ products: this.props.route.params.orderLines })
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                    rightIcon={'check'} rightIconSize={48} pressLeftIcon={() => this.props.navigation.goBack()}
                    pressRightIcon={() => this.props.navigation.navigate('VisitSalesScreen')} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={this.props.route.params.client.Name} dni={this.props.route.params.client.NIF} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <FlatList
                    data={this.state.products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity orderLine={item} />
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
