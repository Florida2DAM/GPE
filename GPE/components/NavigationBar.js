/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Icon } from "react-native-elements";

const pressLeftIcon = () =>{
    console.log("Click al de la otra derecha")
}

const pressRightIcon = () =>{
    console.log("Click al de la otra Izquierda")
}

// NOMBRES DE LOS ICONOS:
// Izquierda: "navigate-before" flecha atras.  "" dejarlo en blanco
// Derecha: "navigate-next" felcha adelante. "add" sgno suma. "" dejarlo en blanco

export class NavigationBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.item}>
                    <View style={[styles.part, {alignItems: "flex-start"}]}>
                        <Icon
                            name={this.props.lIcon}
                            type='material'
                            color='#ffcc57'
                            size={70}
                            onPress={pressLeftIcon} />
                    </View>
                    <View style={styles.part}>
                        <Text style={[styles.text, {textAlign:"center"}]}>{this.props.pageName}</Text>
                    </View>
                    <View style={[styles.part, {alignItems: "flex-end"}]}>
                        <Icon
                            name={this.props.rIcon}
                            type='material'
                            color='#ffcc57'
                            size={70}
                            onPress={pressRightIcon} />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        height: "30%",
        flexDirection: "row",
    },
    part: {
        flex: 1,
        alignSelf: "center",
    },
    text: {
        fontSize: 25,
        color: "#f7f7f7",
    },

})