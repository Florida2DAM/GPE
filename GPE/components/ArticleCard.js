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
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.name}</Text>
                        <Text style={[styles.text, styles.smallText]}>ID: {this.props.id}</Text>
                        <Text style={[styles.text, styles.smallText]}>Price: {this.props.price}€</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text style={styles.text}>Total: 20€</Text>
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
