import React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR} from '../../config';
import * as components from '../';

export default ({onPress, disabled}) => {
    return <components.NavBarRightButton
        textStyle={disabled ? styles.textDisable : null}
        disabled={disabled}
        text='完成'
        onPress={disabled ? ()=>{} : onPress}
    />;
}

const styles = StyleSheet.create({
    textDisable: {
        color: COLOR.backgroundDarker,
    },
});
