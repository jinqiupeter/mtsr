import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import * as containers from '../../containers';
import * as components from '../';

export default class EditProfileNickname extends Component {
  componentDidMount() {
    let {sceneKey, object, account, saveInput} = this.props;
    let user = object.users[account.userId];
    if (user.nickname) {
      saveInput(sceneKey, {nickname: user.nickname});  
    }
  }

  render() {
    let {sceneKey, input, saveInput, submit} = this.props;
    return (
      <containers.Layout
        sceneKey={sceneKey}
        renderTitle={() => components.NavBarTitle({title: '修改昵称'})}
        renderBackButton={components.NavBarCancel}
        renderRightButton={() => components.NavBarDone({
          onPress: () => {dismissKeyboard(); submit(sceneKey);},
        })}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入昵称'
              returnKeyType='done'
              defaultValue={input[sceneKey].nickname}
              autoFocus={true}
              onChangeText={(text) => saveInput(sceneKey, {nickname: text.trim()})}
            />
          </components.FormItem>
        </components.Form>
      </containers.Layout>
    );
  }
}

const styles = StyleSheet.create({});
