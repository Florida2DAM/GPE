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
                    <Text>Item name</Text>
                    <Text>ID: 1</Text>
                    <Text>Price: 10€</Text>
                    <Button title='Remove'></Button>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{flexDirection: 'row'}}>
                        <Button title='-'></Button>
                        <Text>2</Text>
                        <Button title='+'></Button>
                    </View>
                    <Text>Total: 20€</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bet: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#E6D6D3',
        height: 125,
        width: '80%',
        alignSelf: 'center',
        marginTop: 13,
        marginBottom: 7,
        flexDirection: 'row',
    },
});