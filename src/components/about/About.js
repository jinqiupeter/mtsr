import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR, VERSION} from '../../config';
import * as components from '../';
import * as containers from '../../containers';

export default class About extends Component {
  render() {
    let {sceneKey} = this.props;

    return (
      <containers.Layout
        sceneKey={sceneKey}
        renderTitle={() => components.NavBarTitle({title: '关于'})}
      >
        <ScrollView>
          <components.Image
            source={require('zaiqiuchang/res/img/mtsr_icon_middle.png')}
            style={styles.logo}
          />
          <components.Block>
            <components.BlockItem
              leftText='皇家蒙特梭利'
              rightText={VERSION}
              containerStyle={{borderTopWidth: 0}}
            />
            {Platform.OS == 'android' ?
            <components.BlockItem
              leftText='新版更新'
              rightText='无新版'
            /> :
            null
            }
          </components.Block>
          <components.TextNotice>Copyright © 苏州蒙特索利教育咨询有限公司 All Rights Reserved.</components.TextNotice>
        </ScrollView>
      </containers.Layout>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
