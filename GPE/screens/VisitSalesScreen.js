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
            allClients: [],
            clients: [],
            order: [],
            orderLines: [],
            employeeId: 8,
            filter: '',
        };
    }

    componentDidMount() {
        this.getClients();
        this.getInfo();
    }

    getClients = () => {
        axios.get(GPEApi + 'Clients').then((response) => {
            this.setState({ allClients: response.data });
            this.setState({ clients: response.data });
        });
    };

    getInfo = () => {
        //this.setState({employeeId: this.props.route.params.employeeId});
        if (this.props.route.params.orderLines !== undefined) {
            this.setState({ orderLines: this.props.route.params.orderLines });
        }
        if (this.props.route.params.order !== undefined) {
            this.setState({ order: this.props.route.params.order });
        }
    }

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
                    || element.ContactName.toUpperCase().includes(filterText) ) {
                    clientList.push(element);
                }
            });
            this.setState({ clients: clientList });
        }
    };

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
                                    onPress={() => this.props.navigation.navigate('OrderArticlesScreen', { client: item, employeeId: this.state.employeeId, order: this.state.order, orderLines: this.state.orderLines })}>
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
