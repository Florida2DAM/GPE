import React, {Component} from 'react';
import {View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {NavigationBar} from '../components/NavigationBar';
import {GPELabel} from '../components/GPELabel';
import {GPELogo} from '../components/GPELogo';
import {GPEApi, axios, style} from '../components/GPEConst'

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
    }

    getEmployees = () => {
        axios.get(GPEApi + 'Employee').then((response) => {
            this.setState({employees: response.data});
        });
    };

    getEmployeeInfo = (e) => {
        this.setState({employee: e})
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
                    <GPELabel title={'Worker Function'} content={this.state.employee.Type}/>
                </View>
            </View>
        );
    }
}
