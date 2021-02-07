import React, {Component} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import ClientCard from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class VisitDeliverScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],
            orders: [],
            filter: '',
            employee: 'Jesus',
        };
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        let newOrders = [];

        axios.get(GPEApi + 'Orders/GetDeliver').then((response) => {
            response.data.forEach(item => {
                if (item.Deliverer === this.state.employee) {
                    newOrders.push(item);
                }
            });
            this.setState({allOrders: newOrders});
            this.setState({orders: newOrders});
        });
    };

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
                    || item.ContactName.toUpperCase().includes(filterText)
                    || item.Phone.includes(filterText)
                    || item.Address.toUpperCase().includes(filterText)
                    || item.City.toUpperCase().includes(filterText)) {
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
                        keyExtractor={(item) => item.OrderId.toString()}
                        renderItem={({item}) => {
                            return (
                                <Pressable
                                    onPress={() => this.props.navigation.navigate('DeliverCheckScreen')}>
                                    <ClientCard
                                        client={item}
                                    />
                                </Pressable>
                            );
                        }}/>
                </View>
            </>
        );
    }
}
