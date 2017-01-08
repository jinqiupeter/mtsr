import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import {BUTTON} from '../../config';

export default ({text, disabled=false, onPress, containerStyle, textStyle}) => {
  let children = <Text style={[styles.text, (disabled ? styles.textDisable : null), textStyle]}>{text}</Text>;
  if (onPress) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, (disabled ? styles.containerDisable : null), containerStyle]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.container, (disabled ? styles.containerDisable : null), containerStyle]}>
       {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: BUTTON.margin,
    padding: BUTTON.padding,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.theme,
    borderRadius: BUTTON.borderRadius,
  },
  containerDisable: {
    backgroundColor: COLOR.backgroundDarker,
  },
  text: {
    color: COLOR.textLightNormal,
    fontSize: 14,
  },
  textDisable: {
    color: COLOR.textPrompt,
  },
});
