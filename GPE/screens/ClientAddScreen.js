'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationBar } from "../components/NavigationBar";
import { GPEInput } from "../components/GPEInput";


const style = require('../components/Styles');

export default class ClientAddScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            barName: '',
            nif: '',
            phone: '',
            location: '',
        }
    }

    getName = (n) => {
        this.setState({ name: n });
    };
    getSurname = (s) => {
        this.setState({ surname: s })
    };
    getBarName = (b) => {
        this.setState({ barName: b })
    };
    getNif = (n) => {
        this.setState({ nif: n })
    };
    getPhone = (p) => {
        this.setState({ phone: p })
    };
    getLocation = (l) => {
        this.setState({ location: l })
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={"navigate-before"} leftIconSize={50} pageName={"Add Client"} rightIcon={"done"} rightIconSize={50} />
                <View style={{alignItems: 'center'}}>
                    <GPEInput title={'Name'} placeholder={'example name'} width='90%' height={5} marginTop='10%' getValue={this.getName} />
                    <GPEInput title={'Surname'} placeholder={'example surname'} width='90%' height={5} marginTop='5%' getValue={this.getSurname} />
                    <GPEInput title={'Bar Name'} placeholder={'example bar name'} width='90%' height={5} marginTop='5%' getValue={this.getBarName} />
                    <GPEInput title={'NIF/NIE'} placeholder={'example nif/nie'} width='90%' height={5} marginTop='5%' getValue={this.getNif} />
                    <GPEInput title={'Phone number'} placeholder={'example phone number'} width='90%' height={5} marginTop='5%' getValue={this.getPhone} />
                    <GPEInput title={'Location'} placeholder={'example location'} width='90%' height={5} marginTop='5%' getValue={this.getLocation} />
                </View>
            </View>
        );
    }
}
