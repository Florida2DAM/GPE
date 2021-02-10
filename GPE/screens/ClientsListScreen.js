'use strict';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ClientCard from '../components/ClientCard';
import { NavigationBar } from '../components/NavigationBar';
import { GPEFilter } from '../components/GPEFilter';
import { Divider } from 'react-native-elements';
import { axios, GPEApi } from '../components/GPEConst';


const style = require('../components/Styles');

export default class ClientsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allClients: [],
            clients: [],
            filter: ''
        };
    }

    componentDidMount() {
        this.getClients();
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
    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                    rightIconSize={50} marginLeft={'2%'}
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
                                    <ClientCard
                                        index={index}
                                        client={item}
                                    />
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
