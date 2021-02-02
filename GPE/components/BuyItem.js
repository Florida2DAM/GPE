import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export class BuyItem extends Component {
    render() {
        return (
            <View style={styles.bet}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>Item name</Text>
                    <Text style={[styles.text, styles.smallText]}>ID: 1</Text>
                    <Text style={[styles.text, styles.smallText]}>Price: 10€</Text>
                    <Button title='Remove' type='clear' titleStyle={styles.button}></Button>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Button title='-' type='clear' titleStyle={styles.button}></Button>
                        <Text style={styles.text}>1</Text>
                        <Button title='+' type='clear' titleStyle={styles.button}></Button>
                    </View>
                    <Text style={styles.text}>Total: 20€</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bet: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffcc57',
        backgroundColor: '#2a2a2a',        
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',       
        paddingTop: '3%',
        paddingBottom: '4%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    text: {
        color: '#f7f7f7',
        fontSize: 24
    },
    smallText: {
        fontSize: 18
    },
    button: {
        color: '#ffcc57',
        fontSize: 28
    }
});