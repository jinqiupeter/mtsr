import React from 'react';
import {StyleSheet, View, Text, TextInput, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import flattenStyle from 'flattenStyle';

import {COLOR} from '../../config';

export default ({onRef, style, multiline = false, ...props}) => {
  let {fontSize} = flattenStyle(style || styles.input);
  return (
    <TextInput
      placeholderTextColor={COLOR.textPrompt}
      autoCapitalize='none'
      autoCorrect={false}
      returnKeyType='done'
      {...props}
      ref={onRef}
      multiline={multiline}
      style={[styles.input, Platform.select({ios: {height: (fontSize + 10)}}), style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 14,
    color: COLOR.textEmpha,
  }
});
