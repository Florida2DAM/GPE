import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

export class ArticleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.selectedItem;
        return (
            <View style={styles.item}>
                <View style={styles.text}>
                    <View style={styles.info}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <View style={[styles.info, {paddingBottom: '4%'}]}>
                        <Text style={styles.text}>{item.id}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        borderColor: '#ffcc57',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        flexDirection: 'row',
    },
    icon: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-end',
        paddingRight: '5%',
    },
    info: {
        flex: 1,
    },
    text: {
        flex: 1,
        fontSize: 20,
        color: '#f7f7f7',
        textAlignVertical: 'center',
        paddingLeft: '5%',
    },

});
