import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Icon } from "react-native-elements";

export class NavigationBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.item}>
                    <View style={styles.icon}>
                        <Icon
                            name='add'
                            type='material'
                            color='#ffcc57'
                            size={55} />
                    </View>
                    <View style={styles.icon}>
                        <Text>T.Pagina</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            name='add'
                            type='material'
                            color='#ffcc57'
                            size={55} />
                    </View>
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
        height: "30%",
        flexDirection: "row",
    },

})