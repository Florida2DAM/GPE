import React, {Component} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {GPELabel} from './GPELabel';
import {GPEInput} from './GPEInput';
import {GPEPicker} from './GPEPicker';

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

    // Introduce here the method for charge all lots, prices and its quantities avaliables
    getLot = (e) => {
        this.setState({selectedLot: e});
    };

    hideModal = () => {
        this.setState({visible: false});
    };

    render() {
        let itemInfo = this.props.getItemInfo;
        return (
            <View style={styles.defaultView}>
                <Modal animationType={'slide'} visible={this.state.visible} transparent={true}>
                    <Text style={styles.text}>Article: {itemInfo.name}</Text>
                    <GPEPicker sendIcon={'table-rows'} getOption={this.getLot}/>
                    <GPEInput title={'Units'} placeholder={'0'}/>
                    <GPELabel title={'Unit price'} content={this.state.items[0].price.toString()}/>
                    <GPEInput title={'Discount'} placeholder={'0'}/>
                    <View style={styles.buttonView}>
                        <Pressable onPress={this.hideModal}>
                            <Text style={styles.textButton}>CANCEL</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.textButton}>ACCEPT</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultView: {
        marginLeft: '8%',
        marginRight: '2%',
    },
    text: {
        fontSize: 20,
        color: '#f7f7f7',
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
