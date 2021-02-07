/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ClientCard extends Component {
    render() {
        let client = this.props.client;
        return (
            <View
                style={parseInt(this.props.index) % 2 === 0 ? [styles.clientCard, {backgroundColor: '#ef802f'}] : [styles.clientCard, {backgroundColor: 'white'}]}>
                <View style={{width: '32%'}}>
                    <View
                        style={parseInt(this.props.index) % 2 === 0 ? [styles.phoneInfo, {backgroundColor: '#ef802f'}] : [styles.phoneInfo, {backgroundColor: 'white'}]}>
                        <Text
                            style={parseInt(this.props.index) % 2 === 0 ? [styles.text, {color: 'white'}] : [styles.text]}>
                            {client.ContactName}
                        </Text>
                        <Text
                            style={parseInt(this.props.index) % 2 === 0 ? [styles.text, {color: 'white'}] : [styles.text]}>
                            {client.Phone}
                        </Text>
                    </View>
                </View>

                <View style={styles.clientInfo}>
                    <View style={{flex: 1}}>
                        <Text style={{marginLeft: '5%', fontSize: 30, fontWeight: 'bold'}}>
                            {client.Name}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: '5%'}}>
                            <Text style={{fontSize: 15}}>{client.Address}</Text>
                            <Text style={{fontSize: 15}}>{client.City}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    clientInfo: {
        flexDirection: 'column',
    },
    clientCard: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 17,
        textAlign: 'center',
    },
    phoneInfo: {
        margin: '12%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
});
