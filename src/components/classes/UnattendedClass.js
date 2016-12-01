/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View,
} from 'react-native';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';

export default class UnattendedClass extends Component {
    render() {
        let {aClass, containerStyle} = this.props;

        return (
            <components.Block containerStyle={containerStyle}>
                <View style={{flexDirection: 'row', paddingBottom: 2.5}}>
                    <View style={{flex: 1}}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                            <components.Text styleKind='emphaBig' containerStyle={{paddingVertical: 5}} >
                                {aClass.kcjss + ' '
                                + aClass.kcjc + ' '
                                + aClass.kckssj + ' - '
                                + aClass.kcjssj + ' '
                                + aClass.skrq + ' '
                                + aClass.qdsj}
                            </components.Text>
                        </View>
                    </View>
                </View>
            </components.Block>
        );
    }
}

let smallImageSize = Math.floor((SCREEN_WIDTH - 30) / 3);
let middleImageSize = Math.floor((SCREEN_WIDTH - 25) / 2);
let largeImageSize = (SCREEN_WIDTH - 20);

const styles = StyleSheet.create({
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    postText: {
        marginTop: 5,
        lineHeight: 16,
    },
    postImages: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallImage: {
        width: smallImageSize,
        height: smallImageSize,
    },
    middleImage: {
        width: middleImageSize,
        height: middleImageSize,
    },
    largeImage: {
        width: largeImageSize,
        height: largeImageSize * 9 / 16,
    },
});

