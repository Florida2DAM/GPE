import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ClientAddScreen from '../screens/ClientAddScreen';
import DeliverPaymentScreen from '../screens/DeliverPaymentScreen';
import ItemsListScreen from '../screens/ItemsListScreen';
import OrderAddItemsScreen from '../screens/OrderAddItemsScreen';
import OrderArticlesScreen from '../screens/OrderArticlesScreen';
import OrderConfirmsScreen from '../screens/OrderConfirmsScreen';
import VisitDeliverScreen from '../screens/VisitDeliverScreen';
import VisitSalesScreen from '../screens/VisitSalesScreen';
import ClientsListScreen from '../screens/ClientsListScreen';
import DeliverCheckScreen from '../screens/DeliverCheckScreen';
import LoggingScreen from '../screens/LoggingScreen';
import MainScreen from '../screens/MainScreen';

const stack = createStackNavigator();

export default class GPENavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <stack.Navigator headerMode={'none'}>
                    <stack.Screen name='LoggingScreen' component={LoggingScreen}/>
                    <stack.Screen name='MainScreen' component={MainScreen}/>
                    <stack.Screen name='ClientAddScreen' component={ClientAddScreen}/>
                    <stack.Screen name='ClientsListScreen' component={ClientsListScreen}/>
                    <stack.Screen name='DeliverPaymentScreen' component={DeliverPaymentScreen}/>
                    <stack.Screen name='DeliverCheckScreen' component={DeliverCheckScreen}/>
                    <stack.Screen name='ItemsListScreen' component={ItemsListScreen}/>
                    <stack.Screen name='OrderAddItemsScreen' component={OrderAddItemsScreen}/>
                    <stack.Screen name='OrderArticlesScreen' component={OrderArticlesScreen}/>
                    <stack.Screen name='OrderConfirmsScreen' component={OrderConfirmsScreen}/>
                    <stack.Screen name='VisitDeliverScreen' component={VisitDeliverScreen}/>
                    <stack.Screen name='VisitSalesScreen' component={VisitSalesScreen}/>
                </stack.Navigator>
            </NavigationContainer>
        );
    }
}