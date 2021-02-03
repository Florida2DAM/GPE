import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';

export class GPEInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
    }



    eraseContent = () => {
        this.setState({text: ''});
    };

    render() {
        return (
            <View style={[styles.input, {aspectRatio: this.props.height, width: this.props.width}]}>
                <View style={{width: '80%'}}>
                    <Text style={{color: 'white', fontSize: 15, marginLeft: '2%'}}>{this.props.title}</Text>
                    <TextInput style={{color: 'white', fontSize: 20}} placeholder={this.props.placeholder}
                               placeholderTextColor='#7c7c7c' onChangeText={(text)=>{this.props.callback(text)}}
                               keyboardType={this.props.keyboardType}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Icon
                        name='cancel'
                        type='material'
                        color='#ffcc57'
                        size={40}
                        onPress={this.eraseContent}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ffcc57',
        backgroundColor: '#3b3b3b',
    },
});
