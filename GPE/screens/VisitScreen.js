'use strict';

import React, { Component } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import ClientCard from '../components/ClientCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';

const style = require('../components/Styles');

export default class VisitScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                    name: 'Sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
                    name: 'sandwhich Bar',
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
        this.setState({ visible: false });
    };
    visible = () => {
        this.setState({ visible: true });
    };

    render() {
        return (
            <>
                <View style={[style.container, { flex: 1 }]}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Settings'} rightIcon={'add'}
                        rightIconSize={50} />
                    <GPEFilter onFocus={this.invisible} onBlur={this.visible} />
                </View>

                {this.state.visible ? <View style={[style.container, { flexDirection: 'column', flex: 5 }]}>
                    <FlatList
                        data={this.state.ClientData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Pressable onPress={() => console.log(item.city)}>
                                    <ClientCard
                                        id={item.id}
                                        name={item.name}
                                        address={item.address}
                                        city={item.city}
                                        country={item.country}
                                        province={item.province}
                                        contactName={item.contactName}
                                        phone={item.phone}
                                        codePos
                                        tal={item.codePostal}
                                    />
                                </Pressable>
                            );
                        }}
                    />

                </View> :
                    <View />}
            </>
        );
    }
}