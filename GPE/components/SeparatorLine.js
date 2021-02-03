import React, {Component} from 'react';
import {View} from 'react-native';

export class SeparatorLine extends Component {
    render() {
        return (
            <View
                style={{
                    height: 1.5,
                    width: '70%',
                    backgroundColor: 'white',
                }}
            />
        );
    }
}

