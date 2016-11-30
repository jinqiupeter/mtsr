/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import * as components from '../';

export default class EditProfile extends Component {
  render() {
    let {sceneKey, loading, processing, error, ...otherProps} = this.props;
    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '编辑资料'})}
      >
        <ScrollView>
          <components.Profile
            sceneKey={sceneKey}
            error={error}
            {...otherProps}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
