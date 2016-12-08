import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';

export default class AttendedClass extends Component {
    render() {
        let {aClass, containerStyle} = this.props;

        return (
            <components.Block containerStyle={containerStyle}>
                <components.BlockItem
                    leftText={aClass.kcjss + ' '
                        + aClass.kcjc
                    }
                    rightText={
                       aClass.skqkrq + ' '
                      + aClass.kckssj
                    }
                    rightIcon='angle-right'
                    onPress={() => Actions.AfterClassInstruction({
                        ...aClass
                    })}
                    containerStyle={{borderTopWidth: 0}}
                />
            </components.Block>
        );
    }
}

