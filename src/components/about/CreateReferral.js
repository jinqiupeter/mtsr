/**
 * Created by peter on 19/12/2016.
 */
import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {Actions} from 'react-native-router-flux';

import * as components from '../';
import {SCREEN_HEIGHT} from '../../config';

export default class CreateReferral extends Component {
    render() {
        let {sceneKey, loading, processing, error, input, saveInput, createFeedback, cbOk} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '推荐朋友'})}
                renderBackButton={components.NavBarCancel}
                renderRightButton={() => components.NavBarDone({
                    onPress: () => {
                        dismissKeyboard();
                        createFeedback(sceneKey, () => {
                            Actions.pop();
                            if(cbOk) {
                                cbOk();
                            }
                        });
                    },
                })}
            >
                <components.Form>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='小朋友姓名'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].xm}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {xm: text.trim()})}
                        />
                    </components.FormItem>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='出生日期'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].csrq}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {csrq: text.trim()})}
                        />
                    </components.FormItem>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='母亲姓名'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].mqxm}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {mqxm: text.trim()})}
                        />
                    </components.FormItem>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='母亲电话'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].mqdh}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {mqdh: text.trim()})}
                        />
                    </components.FormItem>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='父亲姓名'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].fqxm}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {fqxm: text.trim()})}
                        />
                    </components.FormItem>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='父亲电话'
                            returnKeyType='done'
                            defaultValue={input[sceneKey].fqdh}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {fqdh: text.trim()})}
                        />
                    </components.FormItem>
                </components.Form>
                <components.ButtonWithBg
                    text='提交'
                    onPress={() => {
                        dismissKeyboard();
                        createFeedback(sceneKey, () => {
                            Actions.pop();
                            if(cbOk) {
                                cbOk();
                            }
                        });
                    }}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />
            </components.Layout>
        );
    }
}