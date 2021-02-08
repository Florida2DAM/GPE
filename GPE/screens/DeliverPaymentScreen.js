import {NavigationBar} from '../components/NavigationBar';
import React, {Component} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';
import {GPELabel} from '../components/GPELabel';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            order: [],
            paidAmout: '',
            methodSelected: '',
            paymentMethod: ['Cash', 'Credit Card', 'Pending'],
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({order: this.props.route.params.item});
    }

    updateOrderState = () => {
        let updatedOrder = this.state.order;
        updatedOrder.Paid = this.state.paidAmout;
        updatedOrder.PayingMethod = this.state.methodSelected;
        updatedOrder.Delivered = true;

        axios.put(GPEApi + 'Orders' + updatedOrder).then(r => Alert.alert('Order Delivered.'));
    };

    eraseContent = () => {
        this.setState({paidAmount: ''});
    };

    paidAmoutChange = (e) => {
        this.setState({paidAmount: e});
    };

    getOption = (e) => {
        this.setState({methodSelected: e});
    };

    checkFields = () => {
        console.log(this.state.methodSelected.toString());
        console.log(this.state.paidAmout.toString());
        if (this.state.methodSelected === '' || this.state.paidAmount === '' || (this.state.methodSelected === 'Cash' || this.state.methodSelected === 'Credit Card') && this.state.paidAmout === '0') {
            Alert.alert('Please fill all fields first');
        } else {
            Alert.alert('Todo okey');
        }
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50}
                               pageName={'Payment'} rightIcon={'done'} rightIconSize={50}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={() => this.props.navigation.navigate('VisitDeliverScreen', () => {
                                   this.updateOrderState()})}/>
                <ScrollView>
                    <View style={style.flexColumnCenter}>
                        <GPEPicker pickerSize={'80%'} marginTop={'10%'} getScreen={'DeliverPaymentScreen'}
                                   getItemsList={this.state.paymentMethod} getOption={this.getOption}/>
                        <GPEInput title={'Paid'} placeholder={'0.0€'} width='80%' height={5} marginTop='10%'
                                  onChange={this.paidAmoutChange} keyboardType={'numeric'} delete={this.eraseContent}/>
                        <GPELabel title={'Total'} content={this.state.order.Total} width='80%' height={5}
                                  marginTop='10%'/>
                        <GPELabel title={'Client'} width='80%' height={5} marginTop='10%'
                                  content={this.state.order.Client.Name}/>
                        <GPELabel title={'Contact Name'} width='80%' height={5} marginTop='10%'
                                  content={this.state.order.Client.ContactName}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
