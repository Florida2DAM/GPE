import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {ModifyQuantity} from '../components/ModifyQuantity';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class DeliverCheckScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: [],
            orderLines: [],
        };
    }

    componentDidMount() {
        this.setState({order: this.props.route.params.item});
        this.getOrderLines();
    }

    getOrderLines = () => {
        axios.get(GPEApi + 'OrderLines' + this.state.order.ClientId).then((response) => {
            response.data.forEach(item => {
                this.setState({orderLines: item});
            });
        });
    };


    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pageName={'Checkout'} rightIcon={'navigate-next'} rightIconSize={60}
                               pressRightIcon={() => this.props.navigation.navigate('DeliverPaymentScreen')}/>
                <View style={{marginTop: '5%'}}>
                    <FlatList
                        data={this.state.orderLines}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1}}>
                                    <ModifyQuantity name={item.name} price={item.price} id={item.id}/>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
