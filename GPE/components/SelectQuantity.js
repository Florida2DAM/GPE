import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { GPELabel } from './GPELabel';
import { GPEInput } from './GPEInput';
import { GPEPicker } from './GPEPicker';

export class SelectQuantity extends Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            items: [
                {
                    id: 1,
                    name: 'item1',
                    price: 10.5,
                    stock: 1000,
                    lot: 'LOT-01',

                },
                {
                    id: 1,
                    name: 'item1',
                    price: 10.5,
                    stock: 10,
                    lot: 'LOT-02',
                },
                {
                    id: 1,
                    name: 'item1',
                    price: 10.5,
                    stock: 5000,
                    lot: 'LOT-03',
                },
            ],
            selectedLot: '',
            discount: '',
        };
    }

    getLot = (e) => {
        this.setState({ selectedLot: e });
    };

    hideModal = () => {
        this.setState({ visible: false });
    };

    hideAndAdd = () => {
        this.setState({ visible: false }, () => console.log("Guardaría el objeto."));
    };

    changeUnits = (units) => {
        this.setState({ units });
    };

    changeDiscount = (discount) => {
        this.setState({ discount });
    };

    deleteUnits = () => {
        this.setState({ units: "" });
    };

    deleteDiscount = () => {
        this.setState({ discount: "" });
    };

    render() {
        let itemInfo = this.props.getItemInfo;
        return (
            <View style={styles.defaultView}>
                <Overlay isVisible={this.state.visible} overlayStyle={{ backgroundColor: '#333333', borderColor: '#ffcc57', borderWidth: 2 }}
                    backdropStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onBackdropPress={this.hideModal}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.text}>Article: {itemInfo.name}</Text>
                        <GPEPicker sendIcon={'table-rows'} getOption={this.getLot} pickerSize='69%' />
                        <GPEInput title={'Units'} placeholder={'0'} width='90%' height={5}
                            getValue={this.changeUnits} delete={this.deleteUnits} value={this.state.units}
                            width='90%' height={5} marginTop='2%' keyboardType='numeric' />
                        <GPELabel title={'Unit price'} content={this.state.items[0].price.toString()}
                            width='90%' height={5} marginTop='2%' />
                        <GPEInput title={'Discount'} placeholder={'0'} width='90%' height={5} marginTop='2%' marginBottom='2%'
                            getValue={this.changeDiscount} delete={this.deleteDiscount}
                            value={this.state.discount} keyboardType='numeric' />
                        <View style={styles.buttonView}>
                            <Button titleStyle={styles.textButton} title='CANCEL' onPress={this.hideModal}
                                type='clear' />
                            <Button titleStyle={styles.textButton} title='ACCEPT' onPress={this.hideAndAdd}
                                type='clear'/>
                        </View>
                    </View>
                </Overlay>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        marginLeft: '8%',
        marginRight: '2%',
    },
    text: {
        fontSize: 20,
        color: '#f7f7f7',
        marginBottom: '2%'
    },
    textButton: {
        fontSize: 20,
        color: '#ffcc57',
        fontWeight: 'bold',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
