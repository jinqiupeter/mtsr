/**
 * Created by peter on 19/12/2016.
 */
import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

import * as helpers from '../helpers';
import * as components from '../';
import {COLOR, GENDERS} from '../../config';
import logger from '../../logger';

export default class CreateReferral extends Component {
    render() {
        let {sceneKey, loading, processing, error, input,
            saveInput, createReferral, sceneState, cbOk, setSceneState} = this.props;

        logger.debug("props in createReferral: ", this.props);
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '推荐朋友'})}
                renderBackButton={components.NavBarCancel}
            >
                <components.TextNotice>
                    小朋友信息
                </components.TextNotice>
                <components.Block>
                    <components.BlockItem
                        leftText='姓名'
                        leftIcon="child"
                        rightText={input[sceneKey].xm ? input[sceneKey].xm : '未填写'}
                        rightIcon='angle-right'
                        onPress={() => Actions.TakeInput({
                            loading, processing, error, input, saveInput,
                            parentSceneKey: sceneKey,
                            title: '小朋友姓名',
                            placeholder: '请输入小朋友的姓名',
                            inputKey: 'xm',
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
                                date={input[sceneKey].csrq}
                                mode="date"
                                showIcon={true}
                                customStyles={{
                                    dateInput: {borderWidth: 0},
                                    btnTextConfirm: {color: COLOR.theme}}}
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2026-06-01"
                                onDateChange={(date) => {
                                    saveInput(sceneKey, {csrq: date});
                                }}
                            />
                        }
                        onPress={() => Actions.DatePick({
                            loading, processing, error, saveInput,
                            title: '出生日期',
                            parentSceneKey: sceneKey,
                            inputKey: 'csrq',
                            selectedDate: input[sceneKey].csrq,
                        })}
                    />
                </components.Block>

                <components.TextNotice
                    style={{marginTop: 30}}
                >
                    请至少填写小朋友父母亲中一位的姓名和联系方式。如果您不愿意透露父母亲的真实姓名，可以以'爸爸'或者'妈妈'替代。
                </components.TextNotice>
                <components.Block containerStyle={{paddingTop: 0}}>
                    <components.BlockItem
                        leftText='母亲姓名'
                        leftIcon="female"
                        rightText={input[sceneKey].mqxm ? input[sceneKey].mqxm : '未填写'}
                        rightIcon='angle-right'
                        onPress={() => Actions.TakeInput({
                            loading, processing, error, input, saveInput,
                            title: '母亲姓名',
                            placeholder: '请输入小朋友母亲姓名',
                            parentSceneKey: sceneKey,
                            inputKey: 'mqxm',
                            iconName: 'user'
                        })}
                    />
                    <components.BlockItem
                        leftText='母亲电话'
                        leftIcon="phone-square"
                        rightText={input[sceneKey].mqdh ? input[sceneKey].mqdh : '未填写'}
                        rightIcon='angle-right'
                        onPress={() => Actions.TakeInput({
                            loading, processing, error, input, saveInput,
                            title: '母亲电话',
                            placeholder: '请输入小朋友母亲电话',
                            parentSceneKey: sceneKey,
                            inputKey: 'mqdh',
                            iconName: 'phone-square'
                        })}
                    />
                    <components.BlockItem
                        leftText='父亲姓名'
                        leftIcon="male"
                        rightText={input[sceneKey].fqxm ? input[sceneKey].fqxm : '未填写'}
                        rightIcon='angle-right'
                        onPress={() => Actions.TakeInput({
                            loading, processing, error, input, saveInput,
                            title: '父亲姓名',
                            placeholder: '请输入小朋友父亲姓名',
                            parentSceneKey: sceneKey,
                            inputKey: 'fqxm',
                            iconName: 'user'
                        })}
                    />
                    <components.BlockItem
                        leftText='父亲电话'
                        leftIcon="phone-square"
                        rightText={input[sceneKey].fqdh ? input[sceneKey].fqdh : '未填写'}
                        rightIcon='angle-right'
                        onPress={() => Actions.TakeInput({
                            loading, processing, error, input, saveInput,
                            title: '父亲电话',
                            placeholder: '请输入小朋友父亲姓名',
                            parentSceneKey: sceneKey,
                            inputKey: 'fqdh',
                            iconName: 'phone-square'
                        })}
                    />
                </components.Block>
                <components.ButtonWithBg
                    text='提交'
                    disabled={!input[sceneKey].validity}
                    onPress={() => {
                        dismissKeyboard();
                        createReferral(sceneKey, () => {
                            Actions.pop();
                            if(cbOk) {
                                cbOk();
                            }
                        });
                    }}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />

                <components.GenderPicker
                    visible={sceneState[sceneKey].genderPickerVisible}
                    setVisible={(visible) => setSceneState(sceneKey, {genderPickerVisible: visible})}
                    items={GENDERS}
                    selectedValue={input[sceneKey].gender}
                    onShow={() => saveInput(sceneKey, {gender: input[sceneKey].gender})}
                    onValueChange={(value, index) => saveInput(sceneKey, {gender: value})}
                    submit={() => setSceneState(sceneKey, {genderPickerVisible: false})}
                />
            </components.Layout>
        );
    }
}