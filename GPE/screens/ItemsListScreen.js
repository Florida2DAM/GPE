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
        this.getArticles();
    }

    // Promise to get all items
    getArticles = () => {
        axios.get(GPEApi + 'Articles').then((response) => {
            this.setState({allItems: response.data});
            this.setState({items: this.state.allItems});
        });
    };

    // Methods used to filter items in the screen using the GPEFiler component
    setFilter = (e) => {
        this.setState({e}, () => {
            this.filter();
        });
    };

    filter = () => {
        let itemList = [];
        if (this.state.filter === '') {
            this.setState({items: this.state.allItems});
        } else {
            this.state.allItems.forEach(item => {
                const filterText = this.state.filter.toUpperCase();
                if (item.Description.toUpperCase().includes(filterText)
                    || item.Brand.toUpperCase().includes(filterText)
                    || item.Category.toUpperCase().includes(filterText)
                    || item.ArticleId === filterText) {
                    itemList.push(item);
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
                               pressLeftIcon={() => this.props.navigation.goBack()}/>
                <GPEFilter onChange={this.setFilter}/>
                <FlatList
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (<ItemCard getArticle={item}/>);
                    }}
                />
            </View>
        );
    }
}
