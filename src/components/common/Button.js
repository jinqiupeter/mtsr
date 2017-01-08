import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import {BUTTON} from '../../config';

export default ({text, disabled = false, onPress, containerStyle, textStyle}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}
                          style={[styles.container, (disabled ? styles.containerDisable : null), containerStyle]}>
            <Text style={[styles.text, (disabled ? styles.textDisabled : null), textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: BUTTON.margin,
        padding: BUTTON.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLOR.theme,
        borderRadius: BUTTON.borderRadius
    },

    containerDisable: {
        borderColor: COLOR.backgroundDarker,
        backgroundColor: COLOR.backgroundDarker,
    },
    text: {
        color: COLOR.theme,
        fontSize: 14
    },
    textDisabled: {
        color: COLOR.textLightPrompt,
        fontSize: 14
    }
});
