import {NavigationBar} from '../components/NavigationBar';
import React, {Component} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';
import {axios, GPEApi, style} from '../components/GPEConst';
import {GPELabel} from '../components/GPELabel';

export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            order: [],
            paidAmount: '',
            methodSelected: '',
            paymentMethod: ['Cash', 'Credit Card', 'Pending'],
            isReady: false,
        };
    }

    componentDidMount() {
        this.setState({order: this.props.route.params.item}, () => this.setState({isReady: true}));
    }

    updateOrderState = () => {
        console.log(this.state.order.OrderId);
        console.log(this.state.paidAmount);
        console.log(this.state.methodSelected);

        axios.put(GPEApi + 'Orders/Deliver?OrderId' + this.state.order.OrderId + 'Paid' + this.state.paidAmout + 'PayingMethod' + this.state.methodSelected);
    };

    eraseContent = () => {
        this.setState({paidAmount: ''});
    };

    getPaidAmound = (text) => {
        this.setState({paidAmount: text},()=>console.log(this.state.paidAmount));
    };

    getOption = (e) => {
        this.setState({methodSelected: e});
    };

    checkFields = () => {
        let flag = true;

        if (this.state.methodSelected === undefined) {
            flag = false;
        }
        if (this.state.paidAmount === undefined) {
            flag = false;
        }
        if ((this.state.methodSelected === 'Cash' || this.state.methodSelected === 'Credit Card') && this.state.paidAmout === '0') {
            flag = false;
        }

        if (flag) {
            this.updateOrderState();
            this.props.navigation.navigate('VisitDeliverScreen');
        } else {
            Alert.alert('Please fill all fields first');
        }
    };

    render() {
        return (
            <View style={style.container}>
                {this.state.isReady === true ?
                    <View>
                        <NavigationBar leftIcon={'navigate-before'} leftIconSize={50}
                                       pageName={'Payment'} rightIcon={'done'} rightIconSize={50}
                                       pressLeftIcon={() => this.props.navigation.goBack()}
                                       pressRightIcon={this.checkFields}/>
                        <ScrollView>
                            <View style={style.flexColumnCenter}>
                                <GPEPicker pickerSize={'80%'} marginTop={'10%'} getScreen={'DeliverPaymentScreen'}
                                           getItemsList={this.state.paymentMethod} getOption={this.getOption}/>
                                <GPEInput title={'Paid'} placeholder={'0.0€'} width='80%' height={5} marginTop='10%'
                                          onChangeText={this.getPaidAmound}
                                          delete={this.eraseContent}/>
                                <GPELabel title={'Total'} content={this.state.order.Total} width='80%' height={5}
                                          marginTop='10%'/>
                                <GPELabel title={'Client'} width='80%' height={5} marginTop='10%'
                                          content={this.state.order.Client.Name}/>
                                <GPELabel title={'Contact Name'} width='80%' height={5} marginTop='10%'
                                          content={this.state.order.Client.ContactName}/>
                            </View>
                        </ScrollView>
                    </View> : <View/>}
            </View>
        );
    }
}
