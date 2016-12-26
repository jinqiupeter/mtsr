import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({children, style, numberOfLines = 1, ellipsizeMode = 'tail'}) => {
    return <Text numberOfLines={numberOfLines}
                 ellipsizeMode={ellipsizeMode}
                 style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 12,
        lineHeight: 16,
        color: COLOR.textNormal,
    }
});
