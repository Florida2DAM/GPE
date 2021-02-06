import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export class GPEPicker extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: '',
        };
    }

    updateSelectedOption = (e) => {
        this.setState({selectedOption: e});

        this.props.getItemsList.forEach(item => {
            if (item.Name === e) {
                this.props.getOption(item);
            }
        });
    };

    render() {
        let itemsList = this.props.getItemsList;
        return (
            <View style={styles.view}>
                <Picker selectedValue={this.state.selectedOption} onValueChange={this.updateSelectedOption}
                        style={[styles.picker, {width: this.props.pickerSize}]} itemStyle={styles.item}>
                    <Picker.Item label={'Select An Option'}/>
                    {itemsList.map((item, index) => {
                        return (
                            <Picker.Item label={item.Name} value={item.Name} key={index}/>
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
