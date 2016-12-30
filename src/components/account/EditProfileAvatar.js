import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {COLOR, RES_USER_AVATARS} from '../../config';
import * as components from '../';
import * as containers from '../../containers';
import * as helpers from '../helpers';
import logger from '../../logger'

export default class EditProfileAvatar extends Component {
  componentDidMount() {
    let {sceneKey, object, account, saveInput} = this.props;
    let {profileImageUrl} = helpers.userFromCache(object, account.userId);
    saveInput(sceneKey, {profileImageUrl});
  }

  render() {
    let {sceneKey, input, saveInput} = this.props;
    let {selectCustomAvatar, submit} = this.props;
    return (
      <containers.Layout
        sceneKey={sceneKey}
        renderTitle={() => components.NavBarTitle({title: '设置头像'})}
        renderBackButton={components.NavBarCancel}
        renderRightButton={() => components.NavBarDone({
          onPress: () => submit(sceneKey),
        })}
      >
        <ScrollView>
          <components.Image source={helpers.userAvatarSource(input[sceneKey], 'middle')} style={styles.avatar} />
          <components.TextNotice>从内置里选取</components.TextNotice>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 5}}>
            {Array.from(
              RES_USER_AVATARS.entries(),
              ([k, v]) => <components.Image
                key={k}
                source={v}
                onPress={() => saveInput(sceneKey, {avatarType: 'builtin', avatarName: k})}
                containerStyle={{margin: 5}}
                style={styles.avatarBuiltin}
              />
            )}
          </View>
          <components.TextNotice>从相册里选取</components.TextNotice>
          <components.ButtonWithBg
            text='打开相册'
            onPress={() => {
              ImagePicker.showImagePicker(
                {
                  title: '设置头像',
                  takePhotoButtonTitle: '拍照',
                  chooseFromLibraryButtonTitle: '相册',
                  cancelButtonTitle: '取消',
                  mediaType: 'photo',
                  allowsEditing: true,
                  noData: true,
                  storageOptions: {},
                },
                (picker) => selectCustomAvatar(sceneKey, picker),
              );
            }}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </containers.Layout>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  avatarBuiltin: {
    width: 40, 
    height: 40,
  },
});
