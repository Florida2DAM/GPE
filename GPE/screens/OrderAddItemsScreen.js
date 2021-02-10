/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Alert,StyleSheet, Text, View} from 'react-native';
import {GPELabel} from '../components/GPELabel';
import {GPEInput} from '../components/GPEInput';
import {GPEPicker} from '../components/GPEPicker';
import {NavigationBar} from '../components/NavigationBar';
import {style} from '../components/GPEConst';

export default class OrderAddItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLot: '',
            discount: 0,
            units: 0,
            total: 0,
            orderLines: [],
            orderLine: {},
            article: {},
            order: {},
            isReady: false,
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        this.setState({orderLines: this.props.route.params.orderLines});
        this.setState({order: this.props.route.params.order});
        this.setState({article: this.props.route.params.article}, () => {
            this.setState({isReady: true});
        });
    };

    updateOrderLines = () => {
        let orderLine = {
            OrderId: null,
            LineId: null,
            ArticleId: this.state.article.ArticleId,
            LotId: this.state.selectedLot,
            Description: this.state.article.Description,
            Price: this.state.article.Price,
            Brand: this.state.article.Brand,
            Category: this.state.article.Category,
            Quantity: this.state.units,
            Iva: this.state.article.Iva,
            Discount: this.state.discount,
            TotalLine: this.state.total,
        };
        let orderLines;
        if (this.state.orderLines !== undefined) {
            orderLines = this.state.orderLines;
        } else {
            orderLines = [];
        }
        orderLines.push(orderLine);
        this.setState({orderLines});
    };

    getTotal = () => {
        let priceQuantity = this.state.article.Price * this.state.units;
        let priceDiscount = priceQuantity - (priceQuantity * (this.state.discount / 100));
        let priceIva = priceDiscount + (priceDiscount * (this.state.article.Iva / 100));
        let priceDecimals = Math.trunc(priceIva * 100) / 100;
        this.setState({total: priceDecimals});
    };
    
    checkFields = () => {
        let flag = true;

        if (this.state.units === null || this.state.units ===undefined) {
            flag = false;
        }

        if (this.state.selectedLot === '' || this.state.selectedLot === undefined) {
            flag = false;
        }
        console.log("Check , "+ flag);
        if (flag) {     
          this.addItemList();
        } else {
            Alert.alert('Please fill units fields and pick a lot.');
        }
    };

    getLot = (e) => {
        this.setState({selectedLot: e}, () => console.log(e));
    };

    changeUnits = (units) => {
        this.setState({units}, () => this.getTotal());
    };

    changeDiscount = (discount) => {
        this.setState({discount}, () => this.getTotal());
    };

    //------------------------------------------------------NO VA------------------------------------------------------
    deleteUnits = () => {
        this.setState({units: 0}, () => this.getTotal());
    };

    //------------------------------------------------------NO VA------------------------------------------------------
    deleteDiscount = () => {
        this.setState({discount: 0}, () => this.getTotal());
    };

    addItemList = () => {
        this.updateOrderLines();
        this.props.navigation.navigate('OrderArticlesScreen', {
            orderLines: this.state.orderLines,
            order: this.state.order,
        });
        console.log('Item añadido a la lista.');
    };

    render() {
        if (this.state.isReady) {
            return (
                <View style={style.container}>
                    <NavigationBar leftIcon={'navigate-before'} leftIconSize={60} rightIcon={'add-circle-outline'}
                                   rightIconSize={45} pageName={'Add Item'}
                                   pressLeftIcon={() => this.props.navigation.goBack()}
                                   pressRightIcon={this.checkFields}/>
                    <View style={{alignSelf: 'center', marginTop: '5%'}}>
                        <Text style={styles.text}>{this.state.article.Description}</Text>
                        <GPEPicker sendIcon={'table-rows'} getOption={this.getLot} pickerSize='69%'
                                   getScreen={'OrderAddItemsScreen'} getItemsList={this.state.article.Lots}/>
                        <GPEInput title={'Units'} placeholder={'0'} onChangeText={this.changeUnits}
                                  delete={this.deleteUnits} value={this.state.units}
                                  width='90%' height={5} marginTop='2%' keyboardType='numeric'/>
                        <GPELabel title={'Unit price'} content={this.state.article.Price}
                                  width='90%' height={5} marginTop='2%'/>
                        <GPEInput title={'Discount'} placeholder={'0'} width='90%' height={5} marginTop='2%'
                                  marginBottom='2%'
                                  onChangeText={this.changeDiscount} delete={this.deleteDiscount}
                                  value={this.state.discount} keyboardType='numeric'/>
                        <GPELabel title={'Total (IVA applied: ' + this.state.article.Iva + '%)'}
                                  content={this.state.total}
                                  width='90%' height={5} marginTop='10%'/>
                    </View>
                </View>
            );
        }
        return <View/>;
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
