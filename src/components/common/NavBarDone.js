/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR} from '../../config';
import * as components from '../';

export default ({onPress}) => {
  return <components.NavBarRightButton
    text='完成'
    onPress={onPress}
  />;
}

const styles = StyleSheet.create({});
