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
import { Button } from 'react-native';

export default class OrderConfirmsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            itemIdRemove: -1,
            visibleRemove: false,
            juanjo: 0
        };
    }    

    componentDidMount() {
        this.updateInfo();  
        this.setProductsId();
    }

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
        this.setState({total});
    }

    changeVisibleRemove = () => {
        this.setState({visibleRemove: !this.state.visibleRemove});
    }

    merendola = () => {
        this.changeVisibleRemove();
        this.removeProduct();
    }

    render() {
        return (
            <View style={style.container}>
                <GPEModal isVisible={this.state.visibleRemove} content='Do you want to delete the item?' leftButtonTitle='Cancel' 
                    rightButtonTitle='Confirm' leftButtonPress={this.changeVisibleRemove} 
                    rightButtonPress={this.merendola}/>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Confirm'}
                    rightIcon={'check'} rightIconSize={48} 
                    pressLeftIcon={() => this.props.navigation.navigate('OrderArticlesScreen', {newOrderLines: this.props.route.params.orderLines, 
                        client: this.props.route.params.client})}
                    pressRightIcon={() => this.props.navigation.navigate('VisitSalesScreen')} />
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <ContactInfo name={this.props.route.params.client.Name} dni={this.props.route.params.client.NIF} 
                    change={()=>{ this.setState({juanjo: this.state.juanjo++});
                        this.props.navigation.navigate('VisitSalesScreen', {juanjo: this.state.juanjo, 
                            orderLines: this.props.route.params.orderLines, client: this.props.route.params.client });}}/>
                <Divider style={{ height: 10, backgroundColor: 'none' }} />
                <FlatList
                    data={this.props.route.params.orderLines}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <ModifyQuantity orderLine={item} remove={() => {this.changeVisibleRemove();
                                    this.setState({itemIdRemove: item.LineId}); }} 
                                    itemChange={this.updateInfo}/>
                            </View>
                        );
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <GPELabel title="Total: " paddingLeft={'2%'} width={'50%'} marginBottom={'4%'} content={this.state.total}
                        currency='€' />
                </View>
                <Button title='Hola' onPress={() => console.log(this.props.route.params.client)}></Button>
            </View>
        );
    }
}
