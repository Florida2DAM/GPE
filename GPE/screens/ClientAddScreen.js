import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { GPEInput } from '../components/GPEInput';
import { GPEModal } from '../components/GPEModal';
import { axios, GPEApi, style } from '../components/GPEConst';
import { ScrollView } from 'react-native-gesture-handler';

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
            visible: false
        };
    }
    getName = (n) => {
        this.setState({ name: n });
    };
    getEmail = (s) => {
        this.setState({ email: s });
    };
    getConName = (b) => {
        this.setState({ conName: b });
    };
    getNif = (n) => {
        this.setState({ nif: n });
    };
    getPhone = (p) => {
        this.setState({ phone: p });
    };
    getAddress = (l) => {
        this.setState({ address: l });
    };
    getCity = (l) => {
        this.setState({ city: l });
    };
    getPostalCode = (l) => {
        this.setState({ postalCode: l });
    };
    getProvince = (l) => {
        this.setState({ province: l });
    };


    delName = () => {
        this.setState({ name: '' });
    };
    delEmail = () => {
        this.setState({ email: '' });
    };
    delConName = () => {
        this.setState({ conName: '' });
    };
    delNif = () => {
        this.setState({ nif: '' });
    };
    delPhone = () => {
        this.setState({ phone: '' });
    };
    delAddress = () => {
        this.setState({ address: '' });
    };
    delCity = () => {
        this.setState({ city: '' });
    };
    delPostalCode = () => {
        this.setState({ postalCode: '' });
    };
    delProvince = () => {
        this.setState({ province: '' });
    };

    onPressLeftIcon = () => {
        this.props.navigation.goBack();
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

    addNewClient = () => {
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

    checkFields = () => {
        let flag = true;
        if (this.state.name === '') {
            flag = false;
        }else if (this.state.email === '') {
            flag = false;
        }else if (this.state.conName === '') {
            flag = false;
        }else if (this.state.nif === '' || this.nifTest(this.state.nif) === false) {
            flag = false;
            alert('Write a correct Nif');
        }else if (this.state.phone === '') {
            flag = false;
        }else if (this.state.address === '') {
            flag = false;
        }else if (this.state.province === '') {
            flag = false;
        }else if (this.state.postalCode === '' || this.state.postalCode.length !== 5) {
            alert("Postal code requires 5 numbers")
            flag = false;
        }else if (this.state.city === '') {
            flag = false;
        }
        
        if (flag) {
            this.visible()
        } else {
            alert('Please fill all fields first');
        }
    };


    visible = () => {
        this.setState({ visible: true });
    }
    invisible = () => {
        this.setState({ visible: false });
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={50} pressLeftIcon={this.onPressLeftIcon}
                    pageName={'Add Client'} rightIcon={'done'} rightIconSize={50} 
                    pressRightIcon={this.checkFields} />
                <GPEModal isVisible={this.state.visible} content='Do you want to add a new client?'
                    leftButtonTitle='Cancel' leftButtonPress={this.invisible}
                    rightButtonTitle='Continue' rightButtonPress={this.addNewClient}
                />
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <GPEInput title={'Name'} placeholder={'Name'} height={5} marginTop='10%'
                            onChangeText={this.getName} delete={this.delName} value={this.state.name}/>
                        <GPEInput title={'Email'} placeholder={'Email'} height={5} marginTop='5%'
                            onChangeText={this.getEmail} delete={this.delEmail} value={this.state.email}/>
                        <GPEInput title={'Contact Name'} placeholder={'Contact name'} height={5}
                            marginTop='5%'
                            onChangeText={this.getConName} delete={this.delConName} value={this.state.conName}/>
                        <GPEInput title={'NIF'} placeholder={'NIF'} height={5}
                            marginTop='5%'
                            onChangeText={this.getNif} delete={this.delNif} value={this.state.nif}/>
                        <GPEInput title={'Phone number'} placeholder={'Phone number'} height={5}
                            marginTop='5%' keyboardType='numeric' onChangeText={this.getPhone} delete={this.delPhone} value={this.state.phone}/>
                        <GPEInput title={'City'} placeholder={'City'} height={5} marginTop='5%'
                            onChangeText={this.getCity} delete={this.delCity} value={this.state.city}/>
                        <GPEInput title={'Postal Code'} placeholder={'Postal Code'} height={5}
                            marginTop='5%' keyboardType='numeric'
                            onChangeText={this.getPostalCode} delete={this.delPostalCode} value={this.state.postalCode}/>
                        <GPEInput title={'Province'} placeholder={'Province'} height={5}
                            marginTop='5%'
                            onChangeText={this.getProvince} delete={this.delProvince} value={this.state.province}/>
                        <GPEInput title={'Address'} placeholder={'Address'} height={5} marginTop='5%'
                            onChangeText={this.getAddress} delete={this.delAddress} value={this.state.address}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


