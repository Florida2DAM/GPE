import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class ArticleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.getItemLine;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.Description}</Text>
                        <Text style={styles.smallText}>ID: {item.ArticleId}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.smallText}>Price: {item.Price}€</Text>
                        <Text style={styles.text}>Quantity: {item.Quantity}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.smallText}>Brand: {item.Brand}</Text>
                        <Text style={styles.text}>Total: {item.TotalLine}€</Text>
                    </View>
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
        padding: '4%',
        margin: '2%',
    },
    text: {
        color: '#f7f7f7',
        fontSize: 24,
    },
    smallText: {
        fontSize: 18,
        color: '#f7f7f7',
    },
});
