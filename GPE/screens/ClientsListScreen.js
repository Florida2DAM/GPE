'use strict';

import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import ClientCard from '../components/ClientCard';

const style = require('../components/Styles');

export default class ClientsListScreen extends Component {

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
        };
    }

    render() {
        return (
            <>
                <View style={[style.container, {flex: 1}]}>

                </View>
                <View style={[style.container, {flexDirection: 'column', flex: 5}]}>
                    <FlatList
                        data={this.state.ClientData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => {
                            return (
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
                            );
                        }}
                    />
                </View>
            </>
        );
    }
}
