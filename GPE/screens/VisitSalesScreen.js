import React, {Component} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import ClientCard from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {axios, GPEApi, style} from '../components/GPEConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class VisitSalesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            allClients: [],
            clients: [],
            filter: '',
            cofirmValue: -1,
            toConfirm: false,
            orderLines: [],
        };
    }

    // When we navigate to this screen we restore the object employee and get the clientsList
    componentDidMount() {
        this.getClients();
        this.restoreEmployee();
    }

    // This methods looks if the last visited screen was OrderConfirmScreen and in that case changes a variable
    // to make sure that when the user clicks a user, the app navigates to OrderConfirmScreen instead of navigating
    // to OrderArticlesScreen
    componentDidUpdate() {
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.cofirmValue !== undefined && this.state.toConfirm === false) {
                if (this.props.route.params.cofirmValue !== this.state.cofirmValue) {
                    this.setState({toConfirm: true});
                    this.setState({orderLines: this.props.route.params.orderLines});
                }
            }
        }
    }

    // Restore from storage the employee object
    async restoreEmployee() {
        const jsonValue = await AsyncStorage.getItem('employee');
        jsonValue != null ? this.setState({employee: JSON.parse(jsonValue)}) : null;
    };

    // Promise used to get all clients and save them into our states to show them as a clientsList
    getClients = () => {
        axios.get(GPEApi + 'Clients').then((response) => {
            this.setState({allClients: response.data});
            this.setState({clients: response.data});
        });
    };

    // Methods used to filter items in the screen using the GPEFiler component
    setFilter = (filter) => {
        this.setState({filter}, () => {
            this.filter();
        });
    };

    filter = () => {
        let clientList = [];
        if (this.state.filter === '') {
            this.setState({clients: this.state.allClients});
        } else {
            this.state.allClients.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.Name.toUpperCase().includes(filterText)
                    || element.Address.toUpperCase().includes(filterText)
                    || element.City.toUpperCase().includes(filterText)
                    || element.Phone.toUpperCase().includes(filterText)
                    || element.ContactName.toUpperCase().includes(filterText)) {
                    clientList.push(element);
                }
            });
            this.setState({clients: clientList});
        }
    };

    // Method used to choose the screen according to the toConfirm state value
    navigateToScreen = (item) => {
        let screen;
        if (this.state.toConfirm) {
            screen = 'OrderConfirmsScreen';
        } else {
            screen = 'OrderArticlesScreen';
        }
        this.setState({toConfirm: false});
        this.props.navigation.navigate(screen, {client: item, orderLines: this.state.orderLines});
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                               rightIconSize={50}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                />
                <GPEFilter onChange={this.setFilter}/>
                <View style={[style.container, {flexDirection: 'column', flex: 5}]}>
                    <FlatList
                        data={this.state.clients}
                        keyExtractor={(item) => item.ClientId.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <Pressable
                                    onPress={() => this.navigateToScreen(item)}>
                                    <ClientCard
                                        index={index}
                                        client={item}
                                    />
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
