import React, {Component} from 'react';
import {Image} from 'react-native';

export class GPELogo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image
                style={{width: this.props.width === '' ? '100%' : this.props.width, resizeMode: 'contain'}}
                source={require('../assets/transparentLogo.png')}
            />
        );
    }
}
