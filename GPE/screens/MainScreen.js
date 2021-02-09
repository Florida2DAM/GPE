import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {GPEButton} from '../components/GPEButton';
import {GPELogo} from '../components/GPELogo';
import ClientAddScreen from './ClientAddScreen';
import DeliverPaymentScreen from './DeliverPaymentScreen';
import ItemsListScreen from './ItemsListScreen';
import OrderAddItemsScreen from './OrderAddItemsScreen';
import OrderArticlesScreen from './OrderArticlesScreen';
import OrderConfirmsScreen from './OrderConfirmsScreen';
import SettingsScreen from './SettingsScreen';
import VisitDeliverScreen from './VisitDeliverScreen';
import VisitSalesScreen from './VisitSalesScreen';
import ClientsListScreen from './ClientsListScreen';
import DeliverCheckScreen from './DeliverCheckScreen';
import {style} from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stack = createStackNavigator();

export default class MainScreen extends Component {
    constructor() {
        super();
        this.state = {
            employee: {},
            isReady: false,
        };
    }
    
    componentWillMount() {
        this.restoreEmployee().then(response=>{
            this.setState({employee: response}, () =>console.log(this.getName())  && console.log(this.state.employee))
        })


    componentDidMount() {
        this.restoreEmployee();

    }

    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        this.setState({employee: JSON.parse(jsonValue)});
        this.setState({isReady: true});

    };

    mainScreen = ({navigation},{employee}) => {
        return (
            <View style={style.container}>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <View style={{marginTop: '20%', marginBottom: '20%', marginRight: '10%', marginLeft: '10%'}}>
                        <GPELogo/>
                    </View>
                </View>
                <View style={[style.flexRowCenter, {justifyContent: 'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName='local-shipping' iconSize={60} buttonName='VISIT'
                               onPress={this.state.employee.Type === 'Salesman' ? () => navigation.navigate('VisitSalesScreen') : () => navigation.navigate('VisitDeliverScreen')}/>
                    <GPEButton iconName='contact-page' iconSize={60} buttonName='CLIENTS'
                               onPress={() => navigation.navigate('ClientsListScreen')}/>
                </View>
                <View style={[style.flexRowCenter, {justifyContent: 'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName='category' iconSize={60} buttonName='ITEMS'
                               onPress={() => navigation.navigate('ItemsListScreen')}/>
                    <GPEButton iconName='settings' iconSize={60} buttonName='SETTINGS'
                               onPress={() => navigation.navigate('SettingsScreen')}/>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Text style={{color: 'white', fontSize: 20}}>Employee:{employee.Name}</Text>
                </View>
            </View>
        );
    };


    render() {
        if (this.state.isReady) {
            return (
                <NavigationContainer>
                    <stack.Navigator headerMode={'none'}>
                        <stack.Screen name='MainScreen' component={this.mainScreen}/>
                        <stack.Screen name='ClientAddScreen' component={ClientAddScreen}/>
                        <stack.Screen name='ClientsListScreen' component={ClientsListScreen}/>
                        <stack.Screen name='DeliverPaymentScreen' component={DeliverPaymentScreen}/>
                        <stack.Screen name='DeliverCheckScreen' component={DeliverCheckScreen}/>
                        <stack.Screen name='ItemsListScreen' component={ItemsListScreen}/>
                        <stack.Screen name='OrderAddItemsScreen' component={OrderAddItemsScreen}/>
                        <stack.Screen name='OrderArticlesScreen' component={OrderArticlesScreen}/>
                        <stack.Screen name='OrderConfirmsScreen' component={OrderConfirmsScreen}/>
                        <stack.Screen name='SettingsScreen' component={SettingsScreen}/>
                        <stack.Screen name='VisitDeliverScreen' component={VisitDeliverScreen}/>
                        <stack.Screen name='VisitSalesScreen' component={VisitSalesScreen}/>
                    </stack.Navigator>
                </NavigationContainer>
            );
        }
        return <View/>;

    }
}
