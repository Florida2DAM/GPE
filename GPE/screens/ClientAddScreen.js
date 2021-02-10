import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {GPEInput} from '../components/GPEInput';
import {axios, GPEApi, style} from '../components/GPEConst';
import {ScrollView} from 'react-native-gesture-handler';

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
    onPressLeftIcon = () => {
        this.props.navigation.goBack();
    };
    onPressRightIcon = () => {
        if (this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '' || this.state.name === '') {
            alert('You have empty inputs');
        } else {
            if (this.state.postalCode.length !== 5) {
                alert('Postal code must have 5 digits');
            } else {
                if (this.nifTest(this.state.nif) === false) {
                    alert('Write a correct Nif');
                } else {
                    this.initAxios();
                }
            }
        }
    };

    nifTest = (nif) => {

        const NIF = nif;
        const NIFLetter = NIF.substring(8, 9);
        const NIFNumber = parseInt(NIF.substring(0, 8));
        const letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        const rightLetter = letters[NIFNumber % 23];

        if (NIFLetter.toUpperCase() !== rightLetter) {
            alert('Letter incorrect' + '\n' + 'Maybe the right one is this: ' + rightLetter);
            return false;
        } else {
            return true;
        }
    };

    initAxios = () => {
        axios.post(GPEApi + 'Clients', {
            'Name': this.state.name,
            'Address': this.state.address,
            'City': this.state.city,
            'PostalCode': this.state.postalCode,
            'Province': this.state.province,
            'Country': this.state.Country,
            'Phone': this.state.phone,
            'Email': this.state.email,
            'NIF': this.state.nif,
            'ContactName': this.state.conName,
        }).then(this.props.navigation.goBack());
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50} pressLeftIcon={this.onPressLeftIcon}
                               pageName={'Add Client'} rightIcon={'done'} rightIconSize={50}
                               pressRightIcon={this.onPressRightIcon}/>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <GPEInput title={'Name'} placeholder={'Name'} height={5} marginTop='10%'
                                  onChangeText={this.getName}/>
                        <GPEInput title={'Email'} placeholder={'Email'} height={5} marginTop='5%'
                                  onChangeText={this.getEmail}/>
                        <GPEInput title={'Contact Name'} placeholder={'Contact name'} height={5}
                                  marginTop='5%'
                                  onChangeText={this.getConName}/>
                        <GPEInput title={'NIF'} placeholder={'NIF'} height={5}
                                  marginTop='5%'
                                  onChangeText={this.getNif}/>
                        <GPEInput title={'Phone number'} placeholder={'Phone number'} height={5}
                                  marginTop='5%' keyboardType='numeric' onChangeText={this.getPhone}/>
                        <GPEInput title={'City'} placeholder={'City'} height={5} marginTop='5%'
                                  onChangeText={this.getCity}/>
                        <GPEInput title={'Postal Code'} placeholder={'Postal Code'} height={5}
                                  marginTop='5%' keyboardType='numeric'
                                  onChangeText={this.getPostalCode}/>
                        <GPEInput title={'Province'} placeholder={'Province'} height={5}
                                  marginTop='5%'
                                  onChangeText={this.getProvince}/>
                        <GPEInput title={'Address'} placeholder={'Address'} height={5} marginTop='5%'
                                  onChangeText={this.getAddress}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


