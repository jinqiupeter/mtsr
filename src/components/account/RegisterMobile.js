import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import * as containers from '../../containers';
import * as components from '../';

export default class RegisterMobile extends Component {
  render() {
    let {sceneKey, input, saveInput, submit} = this.props;
    return (
      <containers.Layout
        sceneKey={sceneKey}
        renderTitle={() => components.NavBarTitle({title: '手机号注册'})}
      >
        <components.TextNotice>注册帐号后，您可以预约试听和体验我们的课程及活动</components.TextNotice>
        <components.Form>
          <components.FormItem iconName='mobile-phone' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              keyboardType='numeric'
              returnKeyType='next'
              defaultValue={input[sceneKey].mobile}
              autoFocus={true}
              onRef={(ref) => this.refMobile = ref}
              onChangeText={(text) => saveInput(sceneKey, {mobile: text.trim()})}
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </components.FormItem>
          <components.FormItem iconName='lock'>
            <components.TextInput
              placeholder='设置登录密码，不少于6位'
              returnKeyType='done'
              secureTextEntry={true}
              defaultValue={input[sceneKey].password}
              onRef={(ref) => this.refPassword = ref}
              onChangeText={(text) => saveInput(sceneKey, {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(sceneKey);}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='下一步'
          onPress={() => {dismissKeyboard(); submit(sceneKey);}}
          textStyle={{fontSize: 16}}
        />
      </containers.Layout>
    );
  }
}

const styles = StyleSheet.create({});
