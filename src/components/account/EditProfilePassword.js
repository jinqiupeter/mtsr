/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR} from '../../config';
import * as components from '../';

export default class EditProfilePassword extends Component {
    componentDidMount() {
        let {sceneKey,saveInput} = this.props;
        saveInput(sceneKey, {
            currentPassword: "",
            newPassword: "",
            newPasswordRepeat: ""
        });
    }

    render() {
        let {sceneKey, loading, processing, error, saveInput, changePassword} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '修改密码'})}
                renderBackButton={components.NavBarCancel}
                renderRightButton={() => components.NavBarDone({
                    onPress: () => {dismissKeyboard(); changePassword(sceneKey);},
                })}
            >
                <components.Form>
                    <components.FormItem iconName='lock' containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='当前密码'
                            returnKeyType='done'
                            defaultValue=""
                            autoFocus={true}
                            secureTextEntry={true}
                            onChangeText={(text) => saveInput(sceneKey, {currentPassword: text.trim()})}
                        />
                    </components.FormItem>
                </components.Form>
                <components.Form>
                    <components.FormItem
                        iconName='lock'
                        containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='新密码'
                            returnKeyType='done'
                            autoFocus={false}
                            secureTextEntry={true}
                            onChangeText={(text) => saveInput(sceneKey, {newPassword: text.trim()})}
                        />
                    </components.FormItem>
                </components.Form>
                <components.Form>
                    <components.FormItem
                        iconName='lock'
                        containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='再次输入新密码'
                            returnKeyType='done'
                            autoFocus={false}
                            secureTextEntry={true}
                            onChangeText={(text) => saveInput(sceneKey, {newPasswordRepeat: text.trim()})}
                        />
                    </components.FormItem>
                </components.Form>
            </components.Layout>
        );
    }
}

const styles = StyleSheet.create({});