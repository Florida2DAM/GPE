import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

export class ModifyQuantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLine: [],
        };
    }

    componentDidMount() {
        this.setState({ orderLine: this.props.orderLine });
        this.setState({ units: this.props.orderLine.Quantity });
        this.setState({ price: this.props.orderLine.Price });
        this.setState({ id: this.props.orderLine.ArticleId });
    }

    increaseUnits = () => {
        this.changeOrderLine(parseInt(this.state.orderLine.Quantity) + 1);
        this.updateTotal();
    };

    decreaseUnits = () => {
        if (this.state.orderLine.Quantity > 1) {
            this.changeOrderLine(this.state.orderLine.Quantity - 1);
            this.updateTotal();
        }
    };

    updateTotal = () => {
        const priceQuantity = this.state.orderLine.Price * this.state.orderLine.Quantity;
        const priceDiscount = priceQuantity - (priceQuantity * (this.state.orderLine.Discount / 100));
        const priceIva = priceDiscount + (priceDiscount * (this.state.orderLine.Iva / 100));
        let orderLine = this.state.orderLine;
        orderLine.TotalLine = Math.trunc(priceIva * 100) / 100;
        this.setState({ orderLine });
    }

    changeOrderLine = (quantity) => {
        let orderLine = this.state.orderLine;
        orderLine.Quantity = quantity;
        this.setState({ orderLine });
    }

    /*juanjo = () => {
        (item) => this.props.itemChange();
    }*/

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.orderLine.Description}</Text>
                        <Text style={[styles.text, styles.smallText]}>ID: {this.props.orderLine.ArticleId}</Text>
                        <Text style={[styles.text, styles.smallText]}>Price: {this.props.orderLine.Price}€</Text>
                    </View>
                    <View style={{alignItems: 'flex-end' }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: '50%'}}>
                            <Button title='-' type='clear' titleStyle={styles.button}
                                    onPress={this.decreaseUnits}/>
                            <Text style={styles.text}>{this.state.orderLine.Quantity}</Text>
                            <Button title='+' type='clear' titleStyle={styles.button}
                                    onPress={this.increaseUnits}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Button title='Remove' type='clear' titleStyle={[styles.button, {fontSize: 28}]}
                            onPress={this.props.remove}/>
                    <Text style={styles.text}>Total: {this.state.orderLine.TotalLine}€</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffcc57',
        backgroundColor: '#3b3b3b',
        height: '95%',
        width: '100%',
        alignSelf: 'center',
        paddingTop: '2%',
        paddingBottom: '4%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    text: {
        color: '#f7f7f7',
        fontSize: 24,
    },
    smallText: {
        fontSize: 18,
    },
    button: {
        color: '#ffcc57',
        fontSize: 50,
    },
});
