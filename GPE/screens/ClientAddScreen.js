import React, {Component} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {GPEInput} from '../components/GPEInput';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class ClientAddScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            conName: '',
            nif: '',
            phone: '',
            address: '',
            province: '',
            postalCode: '',
            city: '',
        };
    }

    getName = (n) => {
        this.setState({name: n});
    };
    getEmail = (s) => {
        this.setState({email: s});
    };
    getConName = (b) => {
        this.setState({conName: b});
    };
    getNif = (n) => {
        this.setState({nif: n});
    };
    getPhone = (p) => {
        this.setState({phone: p});
    };
    getAddress = (l) => {
        this.setState({address: l});
    };
    getCity = (l) => {
        this.setState({city: l});
    };
    getPostalCode = (l) => {
        this.setState({postalCode: l});
    };
    getProvince = (l) => {
        this.setState({province: l});
    };
    onPressRightIcon = () => {
        if (this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '') {
            Alert.alert('You have empty inputs');
        } else {
            this.newClient();
        }
    };

    newClient = () => {
        let client = {
            Name: this.state.name,
            Address: this.state.address,
            City: this.state.city,
            PostalCode: this.state.postalCode,
            Province: this.state.province,
            Phone: this.state.phone,
            Email: this.state.email,
            NIF: this.state.nif,
            ContactName: this.state.contactName,
        };
            console.log(client.Name);
            console.log(client.Address);
            console.log(client.City);
            console.log(client.PostalCode);
            console.log(client.Province);
            console.log(client.Phone);
            console.log(client.Email);
            console.log(client.NIF);
            console.log(client.ContactName);
        // axios.post(GPEApi + 'Clients', client).then(console.log(GPEApi + 'Clients', client));
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pageName={'Add Client'} rightIcon={'done'} rightIconSize={50}
                               pressRightIcon={this.onPressRightIcon}/>
                <View style={{alignItems: 'center'}}>
                    <ScrollView>
                        <GPEInput title={'Name'} placeholder={'example name'} width='90%' height={5} marginTop='10%'
                                  onChangeText={this.getName}/>
                        <GPEInput title={'Email'} placeholder={'example email'} width='90%' height={5} marginTop='5%'
                                  onChangeText={this.getEmail}/>
                        <GPEInput title={'Contact Name'} placeholder={'example contact name'} width='90%' height={5}
                                  marginTop='5%'
                                  onChangeText={this.getConName}/>
                        <GPEInput title={'NIF/NIE'} placeholder={'example nif/nie'} width='90%' height={5}
                                  marginTop='5%'
                                  onChangeText={this.getNif}/>
                        <GPEInput title={'Phone number'} placeholder={'example phone number'} width='90%' height={5}
                                  marginTop='5%' onChangeText={this.getPhone}/>
                        <GPEInput title={'City'} placeholder={'example city'} width='90%' height={5} marginTop='5%'
                                  onChangeText={this.getCity}/>
                        <GPEInput title={'Postal Code'} placeholder={'example postal Code'} width='90%' height={5}
                                  marginTop='5%'
                                  onChangeText={this.getPostalCode}/>
                        <GPEInput title={'Province'} placeholder={'example province'} width='90%' height={5}
                                  marginTop='5%'
                                  onChangeText={this.getProvince}/>
                        <GPEInput title={'Adress'} placeholder={'example adress'} width='90%' height={5} marginTop='5%'
                                  onChangeText={this.getAddress}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}




