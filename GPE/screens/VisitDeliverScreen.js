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
            orders: [],
            employee: 'Jesus',
        };
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        axios.get(GPEApi + 'Orders/GetDeliver').then((response) => {
            response.data.forEach(item => {
                if (item.Deliverer === this.state.employee) {
                    this.setState({orders: response.data});
                }
            });
        });
    };

    render() {
        return (
            <>
                <View style={style.container}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Orders'}
                                   pressLeftIcon={() => this.props.navigation.goBack()}/>
                    <GPEFilter/>
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
