import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export class BuyItem extends Component {
    constructor(props){
        super(props);
        this.state={
            units: 1,
        }
    }

    increaseUnits = () => {
        this.setState({units: this.state.units+1});
    }

    decreaseUnits = () => {
        if (this.state.units > 1) this.setState({units: this.state.units-1});
    }

    render() {
        return (
            <View style={styles.bet}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text style={[styles.text, styles.smallText]}>ID: {this.props.id}</Text>                    
                    <Text style={[styles.text, styles.smallText]}>Price: {this.props.price}€</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Button title='Remove' type='clear' titleStyle={styles.button} style={{ size: 10 }}/>                        
                    </View>                    
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button title='-' type='clear' titleStyle={styles.button} onPress={this.decreaseUnits}></Button>
                        <Text style={styles.text}>{this.state.units}</Text>
                        <Button title='+' type='clear' titleStyle={styles.button} onPress={this.increaseUnits}></Button>
                    </View>
                    <Text style={styles.text}>Total: 20€</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bet: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ffcc57',
        backgroundColor: '#2a2a2a',
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
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
        fontSize: 28,
    }
});