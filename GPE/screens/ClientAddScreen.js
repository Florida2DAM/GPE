import React, {Component} from 'react';
import {Alert, View} from 'react-native';
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
        console.log('Se pulsa el de la izquierda');
        this.props.navigation.goBack()
    };
    onPressRightIcon = () => {
        console.log('Se pulsa el de la derecha');
       
        if (this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '' || this.state.name == '') {
            Alert.alert('You have empty inputs');
        } else {
            if(this.state.postalCode.length!=5){
                Alert.alert('Postal code must have 5 digits');
            }else{
                if( this.nifTest(this.state.nif)==false){
                    Alert.alert('Write a correct Nif');
                }
                else{
                    this.initAxios();
                }
                
            }
        }
    };

    nifTest = (nif) => {

        var dni = nif;
        var letraDNI = dni.substring(8, 9);
        var numDNI = parseInt(dni.substring(0, 8));
        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        var letraCorrecta = letras[numDNI % 23];
 
        if(letraDNI.toUpperCase() != letraCorrecta){
        console.log("Has introducido una letra incorrecta" + "\n" + "Tu letra debería ser: " + letraCorrecta);
        return false;
        }
         else{
         console.log("Enhorabuena hemos podido validar tu DNI");
         return true;
         }
        
    };
    //Se pide el número completo del DNI (12345678X)


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
        });
        this.props.navigation.goBack()
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50} pressLeftIcon={this.onPressLeftIcon}
                               pageName={'Add Client'} rightIcon={'done'} rightIconSize={50}
                               pressRightIcon={this.onPressRightIcon}/>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
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
                                  marginTop='5%' keyboardType='numeric' onChangeText={this.getPhone}/>
                        <GPEInput title={'City'} placeholder={'example city'} width='90%' height={5} marginTop='5%'
                                  onChangeText={this.getCity}/>
                        <GPEInput title={'Postal Code'} placeholder={'example postal Code'} width='90%' height={5}
                                  marginTop='5%' keyboardType='numeric'
                                  onChangeText={this.getPostalCode}/>
                        <GPEInput title={'Province'} placeholder={'example province'} width='90%' height={5}
                                  marginTop='5%'
                                  onChangeText={this.getProvince}/>
                        <GPEInput title={'Adress'} placeholder={'example adress'} width='90%' height={5} marginTop='5%'
                                  onChangeText={this.getAddress}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


