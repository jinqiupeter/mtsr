import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import {BUTTON} from '../../config';

export default ({text, onPress, containerStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
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
  text: {
    color: COLOR.theme,
    fontSize: 14
  }
});
