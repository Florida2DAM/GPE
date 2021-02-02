import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const AddItemToCarrito = () => {
    console.log("Furula");//Cambiar por funcion para abrir el componente de añadir items
}

export class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.text}>
                    <View style={styles.info}>
                        <Text style={styles.text}>Name</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.text}>Id</Text>
                    </View>
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='add'
                        type='material'
                        color='#ffcc57'
                        size={55}
                        onPress={AddItemToCarrito} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        borderColor: "#ffcc57",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        height: "12%",
        flexDirection: "row"
    },
    icon: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "flex-end",
        paddingRight: "5%",
    },
    info: {
        flex: 1,
    },
    text: {
        flex: 1,
        fontSize: 20,
        color: "#f7f7f7",
        textAlignVertical: "center",
        paddingLeft: "5%",
    }

})