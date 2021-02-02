import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export class BuyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: 1,
        }
    }

    increaseUnits = () => {
        this.setState({ units: this.state.units + 1 });
    }

    decreaseUnits = () => {
        if (this.state.units > 1) this.setState({ units: this.state.units - 1 });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>{this.props.name}</Text>
                        <Text style={[styles.text, styles.smallText]}>ID: {this.props.id}</Text>
                        <Text style={[styles.text, styles.smallText]}>Price: {this.props.price}€</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <View style={{ flexDirection: "row", alignItems: 'center', height: '50%' }}>
                            <Button title='-' type='clear' titleStyle={[styles.button]} onPress={this.decreaseUnits}></Button>
                            <Text style={styles.text}>{this.state.units}</Text>
                            <Button title='+' type='clear' titleStyle={[styles.button]} onPress={this.increaseUnits}></Button>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button title='Remove' type='clear' titleStyle={[styles.button, {fontSize: 28}]} />
                    <Text style={styles.text}>Total: 20€</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffcc57',
        backgroundColor: '#2a2a2a',
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        paddingTop: '2%',
        paddingBottom: '4%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    text: {
        color: '#f7f7f7',
        fontSize: 24
    },
    smallText: {
        fontSize: 18
    },
    button: {
        color: '#ffcc57',
        fontSize: 50,
    }
});