import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export default ({onPress, style, containerStyle, ...props}) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <Image {...props} style={style} />
      </TouchableOpacity>
    );
  } else {
    return (
      <Image {...props} style={[style, containerStyle]} />
    );
  } 
}

const styles = StyleSheet.create({});
