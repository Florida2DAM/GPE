import React, {Component} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {GPEPicker} from '../components/GPEPicker';
import {GPELabel} from '../components/GPELabel';
import {GPELogo} from '../components/GPELogo';
import {axios, GPEApi, style} from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';

export default class LoggingScreen extends Component {
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
    }

    getEmployees = () => {
        axios.get(GPEApi + 'Employees').then((response) => {
            this.setState({employees: response.data});
        });
    };

    getEmployeeInfo = (e) => {
        this.state.employees.forEach(item => {
            if (item.Name === e) {
                this.setState({employee: item});
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

    gpeLog = () => {
        this.storeEmployee(this.state.employee).then(this.props.navigation.navigate('MainScreen'));
    };

    render() {
        return (
            <View style={[style.container]}>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <View style={{margin: '10%'}}>
                        <GPELogo/>
                    </View>
                    <GPEPicker pickerSize={'75%'} sendIcon={'perm-identity'} getItemsList={this.state.employees}
                               getOption={this.getEmployeeInfo} getScreen={'LoggingScreen'}/>
                </View>
                <View style={{margin: '5%'}}>
                    <GPELabel title={'Worker\'s name'} content={this.state.employee.Name}/>
                </View>
                <View style={{marginLeft: '5%', marginRight: '5%'}}>
                    <GPELabel title={'Worker\'s function'} content={this.state.employee.Type}/>
                </View>
                <View style={{alignSelf: 'center', marginTop: '5%'}}>
                    <Pressable style={styles.button} onPress={() => this.gpeLog()}>
                        <Icon name={'login'} type='material' size={60} color={'#ffcc57'}/>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        paddingRight: '8%',
        paddingLeft: '6%',
        marginTop: '15%',
    },
});
