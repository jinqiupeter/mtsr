import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import * as containers from '../../containers';
import * as components from '../';
import logger from '../../logger';
import * as helpers from '../helpers';
import {COLOR, GENDERS} from '../../config';

export default class AssociateXpy extends Component {
    render() {
        let {sceneKey, input, object, account, saveInput, sceneState, setSceneState, xpyFound} = this.props;
        let {searchXpy, associateXpy} = this.props;

        let user = helpers.userFromCache(object, account.userId);
        logger.debug("props in AssociateXpy", this.props);
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '绑定学员'})}
            >
                <ScrollView>
                    <components.TextNotice>帐号注册成功，请绑定小朋友。</components.TextNotice>
                    <components.TextNotice>基本资料</components.TextNotice>
                    <components.Block>
                        <components.BlockItem
                            leftText='姓名'
                            leftIcon="child"
                            rightText={input[sceneKey].realname ? input[sceneKey].realname : '未填写'}
                            rightIcon='angle-right'
                            onPress={() => Actions.TakeInput({
                                input, saveInput,
                                parentSceneKey: sceneKey,
                                title: '小朋友姓名',
                                placeholder: '请输入小朋友的姓名',
                                inputKey: 'realname',
                                iconName: 'user'
                            })}
                            containerStyle={{borderTopWidth: 0}}
                        />
                        <components.BlockItem
                            leftText='性别'
                            leftIcon="transgender-alt"
                            rightText={input[sceneKey].gender ? (input[sceneKey].gender == 'm' ? '男' : '女') : '未选择'}
                            rightIcon='angle-right'
                            onPress={() => setSceneState(sceneKey, {genderPickerVisible: true})}
                        />
                        <components.BlockItem
                            leftText='出生日期'
                            leftIcon="birthday-cake"
                            rightIcon='angle-right'
                            renderRightComponent={() =>
                                <DatePicker
                                    style={{ backgroundColor: COLOR.backgroundLighter}}
                                    date={input[sceneKey].dateOfBirth}
                                    mode="date"
                                    showIcon={true}
                                    customStyles={{
                                        dateInput: {borderWidth: 0},
                                        btnTextConfirm: {color: COLOR.theme}}}
                                    format="YYYY-MM-DD"
                                    minDate="2000-05-01"
                                    maxDate="2026-06-01"
                                    onDateChange={(date) => {
                                        logger.debug("saving date: ", date);
                                        saveInput(sceneKey, {dateOfBirth: moment(date).format("YYYY-MM-DD")});
                                    }}
                                />
                            }
                        />
                    </components.Block>
                    <components.GenderPicker
                        visible={sceneState[sceneKey].genderPickerVisible}
                        setVisible={(visible) => setSceneState(sceneKey, {genderPickerVisible: visible})}
                        items={GENDERS}
                        selectedValue={input[sceneKey].gender}
                        onValueChange={(value, index) => saveInput(sceneKey, {gender: value})}
                        submit={() => setSceneState(sceneKey, {genderPickerVisible: false})}
                    />

                    <components.ButtonWithBg
                        text='查找'
                        onPress={() => searchXpy(sceneKey)}
                        textStyle={{fontSize: 16}}
                    />

                    <components.TextNotice>可选信息</components.TextNotice>
                    <components.Block>
                        <components.BlockItem
                            leftText='头像'
                            rightImage={helpers.userAvatarSource(user)}
                            rightIcon='angle-right'
                            onPress={() => Actions.EditProfileAvatar()}
                            imageStyle={{borderRadius: 5}}
                            containerStyle={{height: 60}}
                        />
                    </components.Block>
                    {account.xpyFound &&
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <components.TextNotice>{'姓名：' + xpyFound.realname}</components.TextNotice>
                            <components.TextNotice>{'昵称：' + xpyFound.nickname}</components.TextNotice>
                            <components.TextNotice>{'月龄：' + xpyFound.monthage}</components.TextNotice>
                            <components.TextNotice>{'总课时数：' + xpyFound.totalclasses}</components.TextNotice>
                        </View>
                    }
                    <components.ButtonWithBg
                        text='绑定'
                        disabled={!account.xpyFound}
                        onPress={() => associateXpy(sceneKey)}
                        textStyle={{fontSize: 16}}
                    />
                    <components.ButtonWithBg
                        text='跳过'
                        onPress={() => Actions.Classes()}
                        textStyle={{fontSize: 16}}
                    />
                </ScrollView>
            </containers.Layout>
        );
    }
}
