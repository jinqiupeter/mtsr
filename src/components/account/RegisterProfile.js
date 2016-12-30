import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import * as containers from '../../containers';
import * as components from '../';
import logger from '../../logger';

export default class RegisterProfile extends Component {
  render() {
    logger.debug("RegisterProfile props: ", this.props);
    let {sceneKey, error, submit, ...otherProps} = this.props;
    return (
      <containers.Layout
        sceneKey={sceneKey}
        renderTitle={() => components.NavBarTitle({title: '完善资料'})}
      >
        <ScrollView>
          <components.TextNotice>帐号注册成功，请完善小朋友资料。</components.TextNotice>
          <components.Profile
            sceneKey={sceneKey}
            error={error}
            {...otherProps}
          />
          <components.ButtonWithBg
            text='完成'
            onPress={() => submit()}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </containers.Layout>
    );
  }
}

const styles = StyleSheet.create({});
