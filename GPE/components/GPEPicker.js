import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';

export class GPEPicker extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: '',
            options: ['DefaultValue1', 'DefaultValue2', 'DefaultValue3'],
        };
    }

    updateSelectedOption = (e) => {
        this.setState({selectedOption: e});
        this.props.getOption(e);
    };

    render() {
        return (
            <View style={styles.view}>
                <Icon name={this.props.sendIcon} type='material' size={40} color={'#ffcc57'}
                      style={{marginLeft: '3%', marginTop: '7%'}}/>
                <Picker selectedValue={this.state.selectedOption} onValueChange={this.updateSelectedOption}
                        style={[styles.picker, {width: this.props.pickerSize}]} itemStyle={styles.item}>
                    <Picker.Item label={'Select An Option'}/>
                    {this.state.options.map((item, index) => {
                        return (
                            <Picker.Item label={item} value={item} key={index}/>
                        );
                    })}
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: '#3b3b3b',
        color: '#f7f7f7',
        marginLeft: '5%'
    },
    item: {
        color: '#f7f7f7',
    },
    view: {
        borderColor: '#ffcc57',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: '#3b3b3b',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
