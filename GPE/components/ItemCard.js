import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
        };
    }

    render() {
        return (
            <View elevation={4} style={{backgroundColor: '#3b3b3b'}}>
                <View style={styles.itemFlat}>
                    <View style={styles.container3}>
                        <Text style={styles.fontFlat}>
                            Name:
                        </Text>
                        <Text style={styles.fontFlat4}>
                            {this.props.element.item.Description}
                        </Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.fontFlat3}>
                            Brand: {this.props.element.item.Brand}
                        </Text>
                        <Text style={styles.fontFlat2}>
                            ID: {this.props.element.item.ArticleId}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemFlat: {
        paddingTop: '3%',
        paddingBottom: '3%',
        paddingRight: '2%',
        paddingLeft: '2%',
        borderColor: '#ffcc57',
        borderTopWidth: 1,
        borderBottomWidth: 2,
    },
    fontFlat: {
        marginBottom: '7%',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    fontFlat4: {
        marginBottom: '7%',
        color: '#f7f7f7',
        fontSize: 20,

    },
    fontFlat3: {
        marginBottom: '1%',
        color: '#f7f7f7',
        fontSize: 17,

    },
    fontFlat2: {
        color: '#f7f7f7',
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontSize: 17,
        fontWeight: 'bold',
    },
    container2: {
        flex: 4,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    container3: {
        flex: 4,
        flexDirection: 'row',
    },
});
