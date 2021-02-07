import {NavigationBar} from '../components/NavigationBar';
import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';
import {GPELabel} from '../components/GPELabel';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            order: {},
            paidAmout: '',
            paymentMethod: ['Cash', 'Credit Card', 'Pending'],
        };
    }

    componentDidMount() {
        this.setState({order: this.props.route.params.item});
    }

    updateOrderState = () => {
        let deliverOrder = this.state.order;
        axios.put(GPEApi + 'OrderLines?orderId=' + this.state.order.OrderId).then((response) => {
            response.data.forEach(item => {
                newLines.push(item);
            });
            this.setState({orderLines: newLines});
        });
    };

    paidAmoutChange = (text) => {
        this.setState({paidAmount: text});
    };

    eraseContent = () => {
        this.setState({paidAmount: ''});
    };


    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50}
                               pageName={'Payment'} rightIcon={'done'} rightIconSize={50}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={() => this.props.navigation.navigate('VisitDeliverScreen', () => {
                                   this.updateOrderState();
                               })}/>
                <View style={style.flexColumnCenter}>
                    <GPEPicker pickerSize={'80%'} marginTop={'10%'} getScreen={'DeliverPaymentScreen'} getItemsList={this.state.paymentMethod}/>
                    <GPEInput title={'Paid'} placeholder={'0.0€'} width='80%' height={5} marginTop='10%'
                              onChange={this.paidAmoutChange} keyboardType={'numeric'} delete={this.eraseContent}/>
                    <GPELabel title={'Total'} content={this.state.order.Total} width='80%' height={5} marginTop='10%'
                              getValue={this.state.order.Total}/>
                    <GPELabel title={'Client'} width='80%' height={5} marginTop='10%' content={this.state.order.Name}/>
                    <GPELabel title={'Contact Name'} width='80%' height={5} marginTop='10%'
                              content={this.state.order.ContactName}/>
                </View>
            </View>
        );
    }
}
