import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import {COLOR} from '../../config';

export default ({notification, containerStyle}) => {
  let {message} = notification;
  if (message) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Animatable.Text animation="rubberBand" iterationCount='infinite' easing='linear'>
          <Icon name='info-circle' style={styles.icon} />
        </Animatable.Text>
        <Text style={styles.task}>{message}</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundNotice,
  },
  icon: {
    fontSize: 16,
    color: COLOR.theme,
  },
  task: {
    marginLeft: 8,
    fontSize: 14,
    color: COLOR.textEmpha,
  }
});
