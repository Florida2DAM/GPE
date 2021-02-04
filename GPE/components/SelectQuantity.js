import React, { Component } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
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
                <Overlay isVisible={true} overlayStyle={{ backgroundColor: '#333333', borderColor: '#ffcc57', borderWidth: 2 }}
                    backdropStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <View style={{ alignSelf: 'center' }}>                    
                        <Text style={styles.text}>Article: {itemInfo.name}</Text>
                        <GPEPicker sendIcon={'table-rows'} getOption={this.getLot} />
                        <GPEInput title={'Units'} placeholder={'0'} width='90%' height={5} getValue={this.changeUnits}
                            delete={this.deleteUnits}  value={this.state.units} width='90%' height={5} marginTop='2%'/>
                        <GPELabel title={'Unit price'} content={this.state.items[0].price.toString()} width='90%' height={5}
                            marginTop='2%'/>
                        <GPEInput title={'Discount'} placeholder={'0'} width='90%' height={5} marginTop='2%' getValue={this.changeDiscount}
                            delete={this.deleteDiscount} value={this.state.discount}/>
                        <View style={styles.buttonView}>
                            <Pressable onPress={this.hideModal}>
                                <Text style={styles.textButton}>CANCEL</Text>
                            </Pressable>
                            <Pressable>
                                <Text style={styles.textButton}>ACCEPT</Text>
                            </Pressable>
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
