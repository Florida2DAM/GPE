/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

export class ModifyQuantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: 1,
        };
    }

    componentDidMount() {
        this.setState({ units: this.props.units });
    }

    increaseUnits = () => {
        this.setState({units: this.state.units + 1});
    };

    decreaseUnits = () => {
        if (this.state.units > 1) {
            this.setState({units: this.state.units - 1});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.name}</Text>
                        <Text style={[styles.text, styles.smallText]}>ID: {this.props.id}</Text>
                        <Text style={[styles.text, styles.smallText]}>Price: {this.props.price}€</Text>
                    </View>
                    <View style={{alignItems: 'flex-end' }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: '50%'}}>
                            <Button title='-' type='clear' titleStyle={styles.button}
                                    onPress={this.decreaseUnits}/>
                            <Text style={styles.text}>{this.state.units}</Text>
                            <Button title='+' type='clear' titleStyle={styles.button}
                                    onPress={this.increaseUnits}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Button title='Remove' type='clear' titleStyle={[styles.button, {fontSize: 28}]}
                            onPress={this.props.remove}/>
                    <Text style={styles.text}>Total: {this.props.total}</Text>
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
        backgroundColor: '#3b3b3b',
        height: '95%',
        width: '100%',
        alignSelf: 'center',
        paddingTop: '2%',
        paddingBottom: '4%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    text: {
        color: '#f7f7f7',
        fontSize: 24,
    },
    smallText: {
        fontSize: 18,
    },
    button: {
        color: '#ffcc57',
        fontSize: 50,
    },
});
