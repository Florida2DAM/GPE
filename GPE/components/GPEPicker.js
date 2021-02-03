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
                <Icon name={this.props.sendIcon} type='material' size={40} color={'#ef802f'}
                      style={{marginLeft: '12%', marginTop: '7%'}}/>
                <Picker selectedValue={this.state.selectedOption} onValueChange={this.updateSelectedOption}
                        style={styles.picker} itemStyle={styles.item}>
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
        width: '70%',
        fontSize: 28,
    },
    item: {
        color: '#f7f7f7',
    },
    view: {
        borderColor: '#ef802f',
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: '#3b3b3b',
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
