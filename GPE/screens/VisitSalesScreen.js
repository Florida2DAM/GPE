/* eslint-disable prettier/prettier */
'use strict';
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import ClientCard from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {Divider} from 'react-native-elements';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class VisitSalesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeType: this.props.employeeType,
            ClientData: [],
            visible: true,

        };
    }
    componentDidMount() {
        this.getClient();
    }

    getClient = () => {
        let client = [];

        axios.get(GPEApi + 'Clients').then((response) => {
            response.data.forEach(info => {
                client.push(info);
                console.log(info);
            });
            this.setState({ClientData: client});
            console.log(this.state.ClientData);
        });
    };

    invisible = () => {
        this.setState({visible: false});
    };
    visible = () => {
        this.setState({visible: true});
    };

    render() {
        return (
            <>
                <View style={[style.container, {flex: 1}]}>
                    <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                                   rightIconSize={50}
                                   pressLeftIcon={() => this.props.navigation.goBack()}
                                   pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                    />
                    <GPEFilter onFocus={this.invisible} onBlur={this.visible}/>
                </View>

                {this.state.visible ? <View style={[style.container, {flexDirection: 'column', flex: 5}]}>
                        <Divider style={{height: 10, backgroundColor: 'none'}}/>
                        <FlatList
                            data={this.state.ClientData}
                            keyExtractor={(item) => item.ClientId.toString()}
                            renderItem={({item, index}) => {
                                return (
                                    <Pressable
                                        onPress={() => this.props.navigation.navigate('OrderArticlesScreen', {client: item})}>
                                        <ClientCard
                                            index={index}
                                            client={item}
                                        />
                                    </Pressable>
                                );
                            }}
                        />
                    </View> :
                    <View/>}
            </>
        );
    }
}
