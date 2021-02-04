import React, {Component} from 'react';
import {Image, View} from 'react-native';

export class GPELogo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image
                    style={{width: this.props.width === '' ? '100%' : this.props.width, resizeMode: 'contain'}}
                    source={require('../assets/gpe_transparente_pequeño.png')}
                />
            </View>
        );
    }
}
