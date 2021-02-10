import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEButton} from '../components/GPEButton';
import {GPELogo} from '../components/GPELogo';
import ItemsListScreen from './ItemsListScreen';
import LoggingScreen from './LoggingScreen';
import VisitDeliverScreen from './VisitDeliverScreen';
import VisitSalesScreen from './VisitSalesScreen';
import ClientsListScreen from './ClientsListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {style} from '../components/GPEConst';

export default class MainScreen extends Component {
    constructor() {
        super();
        this.state = {
            employee: {},
        };
    }

    componentDidMount() {
        this.restoreEmployee().then(response => {
            this.setState({employee: response});
        });
    }

    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    render() {
        return (
            <View style={style.container}>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <View style={{marginTop: '20%', marginBottom: '20%', marginRight: '10%', marginLeft: '10%'}}>
                        <GPELogo/>
                    </View>
                </View>
                <View style={[style.flexRowCenter, {justifyContent: 'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName='local-shipping' iconSize={60} buttonName='VISIT'
                               onPress={this.state.employee.Type === 'Salesman' ? () => this.props.navigation.navigate('VisitSalesScreen') : () => this.props.navigation.navigate('VisitDeliverScreen')}/>
                    <GPEButton iconName='contact-page' iconSize={60} buttonName='CLIENTS'
                               onPress={() => this.props.navigation.navigate('ClientsListScreen')}/>
                </View>
                <View style={[style.flexRowCenter, {justifyContent: 'space-evenly', marginTop: '5%'}]}>
                    <GPEButton iconName='category' iconSize={60} buttonName='ITEMS'
                               onPress={() => this.props.navigation.navigate('ItemsListScreen')}/>
                    <GPEButton iconName='logout' iconSize={60} buttonName='LOGOUT'
                               onPress={() => this.props.navigation.navigate('LoggingScreen')}/>
                </View>
            </View>
        );
    }
}
