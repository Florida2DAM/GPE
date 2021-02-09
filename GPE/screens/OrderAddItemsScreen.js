/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GPELabel } from '../components/GPELabel';
import { GPEInput } from '../components/GPEInput';
import { GPEPicker } from '../components/GPEPicker';
import { NavigationBar } from '../components/NavigationBar';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class OrderAddItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLot: '',
            discount: 0,
            units: 0,
            total: 0,
            orderlines: [],
            orderline: {},
            article: {},
            order: {},
            lots: [],
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        let lots = [];
        this.setState({ orderlines: this.props.route.params.orderLines });
        this.setState({ order: this.props.route.params.order });
        this.setState({ article: this.props.route.params.article }, () => {console.log(this.state.article.Lots);
            
            this.state.article.Lots.forEach(lot => {
            lots.push(lot.LotId);
            console.log(lots);
        });
        this.setState({lots});
        console.log(lots);
    });
    }

    updateOrderLines = () => {
        let orderline = {
            OrderId: null, LineId: null, ArticleId: this.state.article.ArticleId, LotId: this.state.selectedLot,
            Description: this.state.article.Description, Price: this.state.article.Price, Brand: this.state.article.Brand,
            Category: this.state.article.Category, Quantity: this.state.units,
            Iva: this.state.article.Iva, Discount: this.state.discount, TotalLine: this.state.total,
        };
        let orderlines;
        if (this.state.orderlines !== undefined) {
            orderlines = this.state.orderlines;
        }
        else orderlines = [];
        orderlines.push(orderline);
        this.setState({ orderlines });
    }

    getTotal = () => {
        let priceQuantity = this.state.article.Price * this.state.units;
        let priceDiscount = priceQuantity - (priceQuantity * (this.state.discount / 100));
        let priceIva = priceDiscount + (priceDiscount * (this.state.article.Iva / 100));
        let priceDecimals = Math.trunc(priceIva * 100) / 100;
        this.setState({ total: priceDecimals });
    }

    getLot = (e) => {
        this.setState({ selectedLot: e },()=>console.log(e));
    };

    changeUnits = (units) => {
        this.setState({ units }, () => this.getTotal());
    };

    changeDiscount = (discount) => {
        this.setState({ discount }, () => this.getTotal());
    };

    //------------------------------------------------------NO VA------------------------------------------------------
    deleteUnits = () => {
        this.setState({ units: 0 }, () => this.getTotal());
    };

    //------------------------------------------------------NO VA------------------------------------------------------
    deleteDiscount = () => {
        this.setState({ discount: 0 }, () => this.getTotal());
    };

    addItemList = () => {
        this.updateOrderLines();
        this.props.navigation.navigate('OrderArticlesScreen', { orderlines: this.state.orderlines, order: this.state.order });
        console.log('Item añadido a la lista.');
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60} rightIcon={'add-circle-outline'}
                    rightIconSize={45} pageName={'Add Item'}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    pressRightIcon={this.addItemList} />
                <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                    <Text style={styles.text}>{this.state.article.Description}</Text>
                    <GPEPicker sendIcon={'table-rows'} getOption={this.getLot} pickerSize='69%'
                        getScreen={'OrderAddItemsScreen'} getItemsList={this.state.lots}/>
                    <GPEInput title={'Units'} placeholder={'0'} onChangeText={this.changeUnits}
                        delete={this.deleteUnits} value={this.state.units}
                        width='90%' height={5} marginTop='2%' keyboardType='numeric' />
                    <GPELabel title={'Unit price'} content={this.state.article.Price}
                        width='90%' height={5} marginTop='2%' />
                    <GPEInput title={'Discount'} placeholder={'0'} width='90%' height={5} marginTop='2%'
                        marginBottom='2%'
                        onChangeText={this.changeDiscount} delete={this.deleteDiscount}
                        value={this.state.discount} keyboardType='numeric' />
                    <GPELabel title={'Total (IVA applied: ' + this.state.article.Iva + '%)'} content={this.state.total}
                        width='90%' height={5} marginTop='10%' />
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
        fontSize: 25,
        color: '#f7f7f7',
        marginBottom: '2%',
    },
});
