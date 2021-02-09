import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {NavigationBar} from '../components/NavigationBar';
import {GPELabel} from '../components/GPELabel';
import {GPELogo} from '../components/GPELogo';
import {axios, GPEApi, style} from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            employee: {},
        };
    }

    componentDidMount() {
        this.getEmployees();
        this.getEmployeeInfo();
        this.restoreEmployee();
    }

    getEmployees = () => {
        axios.get(GPEApi + 'Employees').then((response) => {
            this.setState({employees: response.data});
        });
    };

    getEmployeeInfo = (e) => {
        this.state.employees.forEach(item => {
            if (item.Name === e) {
                this.setState({employee: item}, () => this.storeEmployee(this.state.employee));
            }
        });
    };

    async storeEmployee(value) {
        try {
            await AsyncStorage.setItem('employee', JSON.stringify(value));
        } catch (e) {
            Alert.alert('Something went wront, try again.');
        }
    };

    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        jsonValue != null ? this.setState({employee: JSON.parse(jsonValue)}) : null;
    };

    render() {
        return (
            <View style={[style.container]}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Settings'}
                               pressLeftIcon={() => this.props.navigation.goBack()}/>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <View style={{margin: '10%'}}>
                        <GPELogo/>
                    </View>
                    <GPEPicker pickerSize={'75%'} sendIcon={'perm-identity'} getItemsList={this.state.employees}
                               getOption={this.getEmployeeInfo} getScreen={'SettingsScreen'}/>
                </View>
                <View style={{margin: '5%'}}>
                    <GPELabel title={'Worker\'s name'} content={this.state.employee.Name}/>
                </View>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <GPELabel title={'Worker\'s function'} content={this.state.employee.Type}/>
                </View>
            </View>
        );
    }
}
