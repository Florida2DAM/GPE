/* eslint-disable prettier/prettier */
'use strict';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import ClientCard from '../components/ClientCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { Divider } from 'react-native-elements';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class VisitSalesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeType: this.props.employeeType,
            ClientData: [],
        };
    }
    
    componentDidMount() {
        this.getClient();
    }

    getClient = () => {
        let client = [];

        axios.get(GPEApi + 'Clients').then((response) => {
            response.data.forEach(info => {
                client.push(info);
            });
            this.setState({ ClientData: client });
        });
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={60} pageName={'Clients'} rightIcon={'add'}
                    rightIconSize={50}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                />
                <GPEFilter onChange={this.setFilter}/>
                <View style={[style.container, { flexDirection: 'column', flex: 5 }]}>
                    <FlatList
                        data={this.state.ClientData}
                        keyExtractor={(item) => item.ClientId.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable
                                    onPress={() => this.props.navigation.navigate('OrderArticlesScreen', { client: item })}>
                                    <ClientCard
                                        index={index}
                                        client={item}
                                    />
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
