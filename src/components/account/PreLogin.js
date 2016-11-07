/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as components from '../';

export default ({sceneKey, loading, processing, error}) => {
  return (
    <components.Layout 
      sceneKey={sceneKey} 
      loading={loading} 
      processing={processing} 
      error={error}
      hideStatusBar={true}
      hideNavBar={true}
      containerStyle={{justifyContent: 'center'}}
    >
      <components.Image
        source={require('zaiqiuchang/res/img/mtsr_icon.png')}
        style={{alignSelf: 'center', borderRadius: 15}}
      />
      <components.Button
        text='登录'
        onPress={() => Actions.Login()}
        containerStyle={{marginTop: 100}}
        textStyle={{fontSize: 18}}
      />
      <components.Button
        text='注册'
        onPress={() => Actions.RegisterMobile()}
        containerStyle={{marginTop: 30}}
        textStyle={{fontSize: 18}}
      />
    </components.Layout>
  );
}

const styles = StyleSheet.create({});
