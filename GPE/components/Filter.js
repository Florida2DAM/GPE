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
                        size={40}
                        onPress={this.eraseContent} />
                </View>
                <TextInput style={{color: 'white', fontSize: 20}} placeholder='Filter'></TextInput>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#98a5ad',
        padding: '2%',
        width: '80%',        
    }
});