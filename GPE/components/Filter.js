import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

export class Filter extends Component {
    render() {
        return (
            <View style={styles.input}>
                <View style={{justifyContent: 'center'}}>
                    <Icon
                        name='search'
                        type='material'
                        color='#98a5ad'
                        size={30}
                        style={{marginLeft: '3%'}}
                        onPress={this.eraseContent} />
                </View>
                <TextInput style={{color: 'white', fontSize: 20, paddingBottom: '2.5%'}} placeholder='Filter' placeholderTextColor='#7c7c7c'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#98a5ad',
        width: '90%',
        aspectRatio: 8
    }
});