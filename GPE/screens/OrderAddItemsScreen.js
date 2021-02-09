/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GPELabel } from '../components/GPELabel';
import { GPEInput } from '../components/GPEInput';
import { GPEPicker } from '../components/GPEPicker';
import { NavigationBar } from '../components/NavigationBar';

const style = require('../components/Styles');


export default class OrderAddItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            items: [
                {
                    id: 1,
                    name: 'item1',
                    price: 10.5,
                    stock: 1000,
                    lot: 'LOT-01',
                },
                {
                    id: 2,
                    name: 'item1',
                    price: 10.5,
                    stock: 10,
                    lot: 'LOT-02',
                },
                {
                    id: 3,
                    name: 'item1',
                    price: 10.5,
                    stock: 5000,
                    lot: 'LOT-03',
                },
            ],
            selectedLot: '',
            discount: '',
            units: '',
            // order:this.props.route.params.order
            orderlines: [],
            orderline: {},
            article: {},
            order: {}
        };
    }

    updateOrderLines = () => {
        let orderline = {
            OrderId: null, LineId: null, ArticleId: this.state.article.ArticleId, LotId: this.state.selectedLot,
            Description: this.state.article.Description, Price: this.state.article.Price, Brand:this.state.article.Brand,
            Category:this.state.article.Category, Quantity:this.state.units,
            Iva:this.state.article.Iva, Discout:this.state.discount, TotalLine:this.getTotalLine()
        }
        let orderlines = this.state.orderlines;
        orderlines.push(orderline);
        this.setState({ orderlines })
    }
    getTotalLine=()=>{
        let priceQuantity=this.state.article.Price*this.state.units;
        let priceDiscount=priceQuantity-(priceQuantity*(this.state.discount/100));
        let priceIva=  priceDiscount + (priceDiscount * (this.state.article.Iva / 100)); 
        return priceIva;
    }
    componentDidMount() {
        this.setState({ orderlines: this.props.route.params.orderline })
        this.setState({ order: this.props.route.params.order })
        this.setState({ article: this.props.route.params.article })
    }

    getLot = (e) => {
        this.setState({ selectedLot: e });
    };

    changeUnits = (units) => {
        this.setState({ units });
    };

    changeDiscount = (discount) => {
        this.setState({ discount });
    };

    deleteUnits = () => {
        this.setState({ units: '' });
    };

    deleteDiscount = () => {
        this.setState({ discount: '' });
    };

    addItemList = () => {
        this.updateOrderLines();
        this.props.navigation.navigate('OrderArticlesScreen', { orderlines: this.state.orderlines, order: this.state.order });
        console.log('Item añadido a la lista.');
    };

    render() {
        // let itemInfo = this.props.getItemInfo;
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60} rightIcon={'add-circle-outline'}
                    rightIconSize={45} pageName={'Add Item'}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    pressRightIcon={this.addItemList} />
                <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                    <Text style={styles.text}>Article: {this.props.route.params.name}</Text>
                    <GPEPicker sendIcon={'table-rows'} getOption={this.getLot} pickerSize='69%' />
                    <GPEInput title={'Units'} placeholder={'0'} getValue={this.changeUnits}
                        delete={this.deleteUnits} value={this.state.units}
                        width='90%' height={5} marginTop='2%' keyboardType='numeric' />
                    <GPELabel title={'Unit price'} content={this.props.route.params.price}
                        width='90%' height={5} marginTop='2%' />
                    <GPEInput title={'Discount'} placeholder={'0'} width='90%' height={5} marginTop='2%'
                        marginBottom='2%'
                        getValue={this.changeDiscount} delete={this.deleteDiscount}
                        value={this.state.discount} keyboardType='numeric' />
                </View>
                <View>
                <GPELabel title={'Total'} content={'0.0€'} width='80%' height={5} marginTop='10%'
                              content={this.getTotalLine}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        marginLeft: '8%',
        marginRight: '2%',
    },
    text: {
        fontSize: 20,
        color: '#f7f7f7',
        marginBottom: '2%',
    },
});