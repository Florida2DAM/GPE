'use strict';
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import ClientCard from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {Divider} from 'react-native-elements';

const style = require('../components/Styles');

export default class VisitSalesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeType: this.props.employeeType,
            ClientData: [
                {
                    id: 1,
                    name: 'Lemon Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Wei Luo',
                },
                {
                    id: 2,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 3,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 4,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 5,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 6,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 7,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 8,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 9,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 10,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
                {
                    id: 11,
                    name: 'Sanwhich Bar',
                    address: 'Calle Valencia 19',
                    city: 'Valencia',
                    province: 'Valencia',
                    country: 'España',
                    codePostal: '46480',
                    phone: '123456789',
                    contactName: 'Jesus',
                },
            ],
            visible: true,

        };
    }

    invisible = () => {
        this.setState({visible: false});
    };
    visible = () => {
        this.setState({visible: true});
    };

    render() {
        return (
            <>
                <View style={[style.container, {flex: 1}]}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                                   rightIconSize={50}
                                   pressLeftIcon={() => this.props.navigation.goBack()}
                                   pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                    />
                    <GPEFilter onFocus={this.invisible} onBlur={this.visible}/>
                </View>

                {this.state.visible ? <View style={[style.container, {flexDirection: 'column', flex: 5}]}>
                        <Divider style={{height: 10, backgroundColor: 'none'}}/>
                        <FlatList
                            data={this.state.ClientData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return (
                                    <Pressable
                                        onPress={() => this.props.navigation.navigate('OrderArticlesScreen')}>
                                        <ClientCard
                                            id={item.id}
                                            name={item.name}
                                            address={item.address}
                                            city={item.city}
                                            country={item.country}
                                            province={item.province}
                                            contactName={item.contactName}
                                            phone={item.phone}
                                            codePostal={item.codePostal}
                                        />
                                    </Pressable>
                                );
                            }}
                        />
                    </View> :
                    <View/>}
            </>
        );
    }
}
