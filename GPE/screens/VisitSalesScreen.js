/* eslint-disable prettier/prettier */
'use strict';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import ClientCard from '../components/ClientCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { axios, GPEApi, style } from '../components/GPEConst';

export default class VisitSalesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeType: this.props.employeeType,
            allClients: [],
            clients: [],
            filter: '',
            juanjo: -1,
            toConfirm: false,
            orderLines: []
        };
    }

    componentDidMount() {
        this.getClients();
    }

    componentDidUpdate() {
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.juanjo !== undefined && this.state.toConfirm === false) {                
                if (this.props.route.params.juanjo !== this.state.juanjo) {
                    this.setState({ toConfirm: true });
                    this.setState({ orderLines: this.props.route.params.orderLines });
                }
            }
        }
    }

    getClients = () => {
        axios.get(GPEApi + 'Clients').then((response) => {
            this.setState({ allClients: response.data });
            this.setState({ clients: response.data });
        });
    };

    setFilter = (filter) => {
        this.setState({ filter }, () => {
            this.filter();
        });
    };

    filter = () => {
        let clientList = [];
        if (this.state.filter === '') {
            this.setState({ clients: this.state.allClients });
        } else {
            this.state.allClients.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.Name.toUpperCase().includes(filterText)
                    || element.Address.toUpperCase().includes(filterText)
                    || element.City.toUpperCase().includes(filterText)
                    || element.Phone.toUpperCase().includes(filterText)
                    || element.ContactName.toUpperCase().includes(filterText)) {
                    clientList.push(element);
                }
            });
            this.setState({ clients: clientList });
        }
    };

    navigateJuanjo = (item) => {
        let screen;
        if (this.state.toConfirm) screen = 'OrderConfirmsScreen';
        else screen = 'OrderArticlesScreen';
        this.setState({ toConfirm: false });
        console.log(screen);
        this.props.navigation.navigate(screen, { client: item, orderLines: this.state.orderLines });
    }

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                    rightIconSize={50}
                    pressLeftIcon={() => this.props.navigation.goBack()}
                    pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                />
                <GPEFilter onChange={this.setFilter} />
                <View style={[style.container, { flexDirection: 'column', flex: 5 }]}>
                    <FlatList
                        data={this.state.clients}
                        keyExtractor={(item) => item.ClientId.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable
                                    onPress={() => this.navigateJuanjo(item)}>
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
