import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {ItemCard} from '../components/ItemCard';
import {NavigationBar} from '../components/NavigationBar';
import {GPEFilter} from '../components/GPEFilter';
import {axios, GPEApi, style} from '../components/GPEConst';

export default class ItemsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            items: [],
            filter: '',
        };
    }

    componentDidMount() {
        axios.get(GPEApi + 'articles').then((response) => {
            this.setState({allItems: response.data});
            this.setState({items: this.state.allItems});
        }, (rejectedResult) => {
            console.error(rejectedResult.statusText);
        });
    }

    setFilter = (filter) => {
        this.setState({filter}, () => {
            this.filter();
        });
    };

    filter = () => {
        let itemList = [];
        if (this.state.filter === '') {
            this.setState({items: this.state.allItems});
        } else {
            this.state.allItems.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.Description.toUpperCase().includes(filterText) || element.Brand.toUpperCase().includes(filterText) || element.ArticleId === filterText) {
                    itemList.push(element);
                }
            });
            this.setState({items: itemList});
        }
    };

    render() {
        return (
            <View style={style.container}>
                <NavigationBar leftIcon={'navigate-before'} leftIconSize={60}
                               pageName={'Item List'}
                               pressLeftIcon={() => this.props.navigation.goBack()}
                               pressRightIcon={this.onPressRightIcon}/>
                <GPEFilter onChange={this.setFilter}/>
                <FlatList
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => (<ItemCard element={item}/>)}
                />
            </View>

        );
    }
}
