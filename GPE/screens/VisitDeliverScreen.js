import React, {Component} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import ClientCard from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {axios, GPEApi, style} from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class VisitDeliverScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],
            orders: [],
            filter: '',
            employee: {},
        };
    }

    // When the screen is mounted we get from the storage the logged employee and after that we charge his orders.
    componentDidMount() {
        this.restoreEmployee().then(this.getOrders());
    }

    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        jsonValue != null ? this.setState({employee: JSON.parse(jsonValue)}) : null;
    };

    // Here we push into our orders objects only the orders which our employee has to deliver checking the Deliverer field
    // from Order
    getOrders = () => {
        let newOrders = [];

        axios.get(GPEApi + 'Orders/GetDeliver').then((response) => {
            response.data.forEach(item => {
                if (item.Deliverer === this.state.employee.Name) {
                    newOrders.push(item);
                }
            });
            this.setState({allOrders: newOrders});
            this.setState({orders: newOrders});
        });
    };

    // Methods used to filter items in the screen using the GPEFiler component
    setFilter = (filter) => {
        this.setState({filter}, () => {
            this.filter();
        });
    };

    filter = () => {
        let orderList = [];
        if (this.state.filter === '') {
            this.setState({orders: this.state.allOrders});
        } else {
            this.state.allOrders.forEach(item => {
                const filterText = this.state.filter.toUpperCase();
                if (item.Name.toUpperCase().includes(filterText)
                    || item.Client.ContactName.toUpperCase().includes(filterText)
                    || item.Client.Phone.includes(filterText)
                    || item.Client.Address.toUpperCase().includes(filterText)
                    || item.Client.City.toUpperCase().includes(filterText)) {
                    orderList.push(item);
                }
            });
            this.setState({orders: orderList});
        }
    };

    render() {
        return (
            <>
                <View style={style.container}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Orders'}
                                   pressLeftIcon={() => this.props.navigation.goBack()}/>
                    <GPEFilter onChange={this.setFilter}/>
                    <FlatList
                        data={this.state.orders}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <Pressable
                                    onPress={() => this.props.navigation.navigate('DeliverCheckScreen', {item: item})}>
                                    <ClientCard
                                        client={item.Client}
                                        index={index}
                                    />
                                </Pressable>
                            );
                        }}/>
                </View>
            </>
        );
    }
}
