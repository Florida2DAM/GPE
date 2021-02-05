'use strict';
import {NavigationBar} from '../components/NavigationBar';
import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';
const style = require('../components/Styles');
export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            paymentMethod: '',
            total:0,
            paid:0,
            contractName: '',
            NIF:'',
        };
    }

    getPaymentMethod = (e) => {
        this.setState({paymentMethod: e});
    };
    getName = (n) => {
        this.setState({contractName: n});
    };
    getNIF = (n) => {
        this.setState({NIF: n});
    };
    getTotal = (n) => {
        this.setState({total: n});
    };
    getPaid = (n) => {
        this.setState({paid: n});
    };

    render() {
        return (
            <View style={[style.container, style.flexColumnCenter]}>

                 <NavigationBar leftIcon={'navigate-before'} leftIconSize={50} pressLeftIcon={this.onPressLeftIcon}
                               pageName={'Payment'} rightIcon={'done'} rightIconSize={50}
                               pressRightIcon={this.onPressRightIcon}/>

                <GPEInput  title={'Total'} placeholder={'0.0€'} width='80%' height={5} marginTop='10%'   getValue={this.getTotal} />
                <GPEInput  title={'Paid'} placeholder={'0.0€'}  width='80%' height={5} marginTop='10%'  getValue={this.getPaid}/>

                <GPEInput title={'Contract Name'} placeholder={'example name'} width='80%' height={5} marginTop='10%'  getValue={this.getName}/>
                <GPEInput title={'NIF'} placeholder={'3236273'}  width='80%' height={5} marginTop='10%' marginBottom='10%'  getValue={this.getNIF} />
                <GPEPicker sendIcon={'payment'} pickerSize={'62%'} getOption={this.getPaymentMethod}/>

            </View>
        );
    }
}
