import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationBar} from '../components/NavigationBar';
import {axios, GPEApi, style} from '../components/GPEConst';
import {ArticleCard} from '../components/ArticleCard';

export default class DeliverCheckScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: []
        };
    }

    componentDidMount() {
        this.setState({order: this.props.route.params.item}, () => {
            this.getOrderLines();
        });
    }

    getOrderLines = () => {
        let newLines = [];
        axios.get(GPEApi + 'OrderLines?orderId=' + this.state.order.OrderId).then((response) => {
            response.data.forEach(item => {
                newLines.push(item);
            });
            this.setState({orderLines: newLines});
        });
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pageName={'Checkout'} rightIcon={'navigate-next'} rightIconSize={60}
                               pressRightIcon={() => this.props.navigation.navigate('DeliverPaymentScreen', {item: this.state.order})}/>
                <View style={{marginTop: '5%'}}>
                    <FlatList
                        data={this.state.orderLines}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1}}>
                                    <ArticleCard getItemLine={item}/>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
