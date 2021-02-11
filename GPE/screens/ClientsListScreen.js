import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {ClientCard} from '../components/ClientCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class ClientsListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClients: [],
            clients: [],
            filter: '',
        };
    }

    componentDidMount() {
        this.getClients();
    }

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
            this.state.allClients.forEach(item => {
                const filterText = this.state.filter.toUpperCase();
                if (item.Name.toUpperCase().includes(filterText)
                    || item.Address.toUpperCase().includes(filterText)
                    || item.City.toUpperCase().includes(filterText)
                    || item.Phone.toUpperCase().includes(filterText)
                    || item.ContactName.toUpperCase().includes(filterText)) {
                    clientList.push(item);
                }
            });
            this.setState({clients: clientList});
        }
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'arrow-back-ios'} leftIconSize={40} pageName={'Clients'} rightIcon={'add'}
                               rightIconSize={50} marginLeft={'2%'}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={() => this.props.navigation.navigate('ClientAddScreen')}
                />
                <GPEFilter onChange={this.setFilter}/>
                <View style={[style.container, {flexDirection: 'column', flex: 5}]}>
                    <FlatList
                        data={this.state.clients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <ClientCard
                                    index={index}
                                    client={item}
                                />
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
