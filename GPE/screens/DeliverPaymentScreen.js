import {NavigationBar} from '../components/NavigationBar';
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPEInput} from '../components/GPEInput';
import {axios, GPEApi, style} from '../components/GPEConst';
import {GPELabel} from '../components/GPELabel';
import {GPEModal} from '../components/GPEModal';

export default class DeliverPaymentScreen extends Component {

    constructor() {
        super();
        this.state = {
            order: [],
            paidAmount: '',
            methodSelected: '',
            paymentMethod: ['Cash', 'Credit Card', 'Pending'],
            isReady: false,
            visible: false,
        };
    }

    componentDidMount() {
        this.setState({order: this.props.route.params.item}, () => this.setState({isReady: true}));
    }

    updateOrderState = () => {
        const deliverPending = GPEApi + 'Orders/Deliver?OrderId=' + this.state.order.OrderId + '&Paid=0&PayingMethod=' + this.state.methodSelected;
        const deliver = GPEApi + 'Orders/Deliver?OrderId=' + this.state.order.OrderId + '&Paid=' + this.state.paidAmount + '&PayingMethod=' + this.state.methodSelected;

        if (this.checkFields()) {
            this.state.methodSelected === 'Pending'
                ? axios.put(deliverPending).then(this.props.navigation.navigate('VisitDeliverScreen'))
                : axios.put(deliver).then(this.props.navigation.navigate('VisitDeliverScreen'));
        } else {
            alert('Please fill all fields first');
        }
    };

    eraseContent = () => {
        this.setState({paidAmount: ''});
    };

    getPaidAmount = (text) => {
        this.setState({paidAmount: text});
    };

    getOption = (e) => {
        this.setState({methodSelected: e});
    };

    checkFields() {
        let flag = true;

        if (this.state.methodSelected === '' || this.state.methodSelected === undefined || this.state.methodSelected === null) {
            flag = false;
        }
        if ((this.state.paidAmount === '' || this.state.paidAmount === undefined || this.state.paidAmount === null) && this.state.methodSelected !== 'Pending') {
            flag = false;
        }
        if ((this.state.methodSelected === 'Cash' || this.state.methodSelected === 'Credit Card') && this.state.paidAmount === '0') {
            flag = false;
        }
        return flag;
    };

    visible = () => {
        this.setState({visible: true});
    };
    invisible = () => {
        this.setState({visible: false});
    };

    render() {
        return (
            <View style={style.container}>
                {this.state.isReady === true ?
                    <View>
                        <NavigationBar leftIcon={'navigate-before'} leftIconSize={50}
                                       pageName={'Payment'} rightIcon={'done'} rightIconSize={50}
                                       pressLeftIcon={() => this.props.navigation.goBack()}
                                       pressRightIcon={this.visible}/>
                        <GPEModal isVisible={this.state.visible} content='Are you sure to continue?'
                                  leftButtonTitle='Cancel' leftButtonPress={this.invisible}
                                  rightButtonTitle='Continue' rightButtonPress={this.updateOrderState}/>
                        <ScrollView>
                            <View style={style.flexColumnCenter}>
                                <GPEPicker pickerSize={'80%'} marginTop={'10%'} getScreen={'DeliverPaymentScreen'}
                                           getItemsList={this.state.paymentMethod} getOption={this.getOption}/>
                                <GPEInput title={'Paid'} placeholder={'0.0€'} width='80%' height={5} marginTop='10%'
                                          onChangeText={this.getPaidAmount} keyboardType={'numeric'}
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
