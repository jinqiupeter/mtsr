import React, {Component} from 'react';
import {
    StyleSheet, View,Alert, ScrollView, RefreshControl,Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import {COLOR} from '../config';

import * as containers from '../containers';
import * as components from './';
import * as helpers from './helpers';

export default class Me extends Component {
    render() {
        let {
            sceneKey, clearCache, editProfileAvatarSubmit
        } = this.props;
        let {account, logoutRequest, disassociateXpy} = this.props;

        if (!account) {
            return null;
        }

        return (
            <containers.Layout
                sceneKey={sceneKey}
                hideTabBar={false}
                currentTab={3}
                renderTitle={() => components.NavBarTitle({title: '我'})}
                renderBackButton={() => null}
                refresh={() => this._refresh()}
            >
                <ScrollView>
                    <components.Block containerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <components.Image
                            source={helpers.accountAvatarSource(account, 'middle')}
                            style={styles.userAvatar}
                            containerStyle={{marginRight: 5}}
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
                                (picker) => editProfileAvatarSubmit({picker}),
                              );
                            }}
                        />
                        {(!account.xpybh || !account.khbh) ?
                            <components.Button
                                text='绑定学员'
                                onPress={() => {
                                    Actions.AssociateXpy();
                                }}
                                containerStyle={{flex: 1, margin: 0, padding: 5}}
                                textStyle={{fontSize: 12}}
                            />
                            :
                            <View
                                style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center'}}
                            >
                                <components.Text>已绑定学员：</components.Text>
                                <components.TextWithIcon
                                    iconName={account.gender == 'm' ? 'mars' : 'venus'}
                                    text={account.realname}
                                    styleKind='emphaBig'
                                    containerStyle={{flex: 1}}
                                />
                                <components.Text style={{flex: 1}}>{account.nickname}</components.Text>
                                <components.Text
                                    style={{flex: 1}}>{helpers.monthAgeInYears(account.monthage)}</components.Text>
                                <components.Button
                                    text='解除绑定'
                                    onPress={() => {
                                        Alert.alert(
                                            '确定解除绑定吗？',
                                            "",
                                            [
                                                {text: '取消', onPress: () => {}},
                                                {text: '确定', onPress: () => {
                                                    disassociateXpy();
                                                    Actions.AssociateXpy();
                                                }},
                                            ],
                                        );
                                    }}
                                    containerStyle={{flex: 1, margin: 0, padding: 5}}
                                    textStyle={{fontSize: 12}}
                                />
                            </View>
                        }
                    </components.Block>
                    <components.Block containerStyle={{marginTop: 10}}>
                        <components.BlockItem
                            leftIcon='info-circle'
                            leftText='关于蒙特梭利'
                            rightIcon='angle-right'
                            onPress={() => Actions.About()}
                            leftIconStyle={{color: COLOR.theme}}
                            containerStyle={{borderTopWidth: 0}}
                        />
                        <components.BlockItem
                            leftIcon='question-circle'
                            leftText='常见问题'
                            rightIcon='angle-right'
                            onPress={() => Actions.FAQ()}
                            leftIconStyle={{color: COLOR.theme}}
                            containerStyle={{height: 50}}
                        />
                        <components.BlockItem
                            leftIcon='comments'
                            leftText='留言反馈'
                            rightIcon='angle-right'
                            onPress={() => Actions.Feedback()}
                            leftIconStyle={{color: COLOR.theme}}

                        />
                    </components.Block>
                    <components.TextNotice
                        style={{paddingBottom: 5}}
                    >
                        帐号与安全
                    </components.TextNotice>
                    <components.Block>
                        <components.BlockItem
                            leftIcon='lock'
                            leftText='修改密码'
                            rightIcon='angle-right'
                            onPress={() => Actions.EditProfilePassword()}
                            leftIconStyle={{color: COLOR.theme}}
                            containerStyle={{borderTopWidth: 0, height: 30}}
                        />
                        <components.BlockItem
                            leftIcon='eraser'
                            leftText='清除缓存'
                            rightIcon='angle-right'
                            onPress={ () => {
                                Alert.alert(
                                    '清除缓存',
                                    '清除缓存并重新登录？',
                                    [
                                        {text: '取消', onPress: () => {}},
                                        {text: '确定', onPress: () => clearCache()},
                                    ],
                                );
                            }}
                            leftIconStyle={{color: COLOR.theme}}
                            containerStyle={{borderTopWidth: 0, height: 30}}
                        />
                    </components.Block>

                    <components.TextNotice
                        style={{paddingBottom: 5}}
                    >
                        分享
                    </components.TextNotice>
                    <components.Block>
                        <components.BlockItem
                            leftIcon='share-alt-square'
                            leftText='推荐朋友'
                            rightIcon='angle-right'
                            onPress={() => Actions.Referral()}
                            leftIconStyle={{color: COLOR.theme}}
                            containerStyle={{borderTopWidth: 0}}
                        />
                        <components.BlockItem
                            leftIcon='shopping-bag'
                            leftText='优惠商家'
                            rightIcon='angle-right'
                            onPress={() => Actions.Sponsor()}
                            leftIconStyle={{color: COLOR.theme}}
                        />
                        <components.BlockItem
                            leftIcon='home'
                            leftText='蒙特索利托班'
                            rightIcon='angle-right'
                            onPress={() => Actions.Appointment()}
                            leftIconStyle={{color: COLOR.theme}}
                        />
                    </components.Block>
                    <components.ButtonWithBg
                        text='退出当前帐号'
                        onPress={ () => {
                            Alert.alert(
                                '退出',
                                '确定退出当前帐号吗？',
                                [
                                    {text: '取消', onPress: () => {}},
                                    {text: '确定', onPress: () => logoutRequest()},
                                ],
                            );
                        }}
                        textStyle={{fontSize: 16}}
                        containerStyle={{marginTop: 20}}
                    />
                </ScrollView>
            </containers.Layout>
        );
    }
}

const styles = StyleSheet.create({
    userAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
});
