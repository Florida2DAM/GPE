import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {SeparatorLine} from './SeparatorLine';

export class NavigationBar extends Component {
    render() {
        return (
            <>
                <View style={styles.item}>
                    <View style={[styles.part, {alignItems: 'flex-start', marginLeft: this.props.marginLeft}]}>
                        <Icon
                            name={this.props.leftIcon}
                            type='material'
                            color='#ffcc57'
                            size={this.props.leftIconSize}
                            onPress={this.props.pressLeftIcon}/>
                    </View>
                    <View style={styles.part}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{this.props.pageName}</Text>
                    </View>
                    <View style={[styles.part, {alignItems: 'flex-end', marginRight: this.props.marginRight}]}>
                        <Icon
                            name={this.props.rightIcon}
                            type='material'
                            color='#ffcc57'
                            size={this.props.rightIconSize}
                            onPress={this.props.pressRightIcon}/>
                    </View>
                </View>
                <View style={{alignItems: 'center', marginTop: '3%'}}>
                    <SeparatorLine/>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    part: {
        flex: 1,
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
        color: '#f7f7f7',
    },
});
