/**
 * Created by peter on 16/12/2016.
 */
import React, {Component} from 'react';
import {View, InteractionManager,
    RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {TextNotice, TextWithIcon} from '../common';
import logger from '../../logger';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import * as components from '../';
import * as containers from '../../containers';
import {COLOR} from '../../config';
import {Actions} from 'react-native-router-flux';

export default class Appointment extends Component {
    componentWillMount() {
        this.refreshing = false;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {network, sceneKey} = this.props;
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {getAppointment} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getAppointment({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, object, appointmentIds,
            disableLoading, enableLoading} = this.props;

        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '蒙特梭利托班'})}
                renderBackButton={components.NavBarBack}
                containerStyle={{flex: 1}}
            >
                <ScrollView
                    {...this.props}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',}}
                    refreshControl={
                                <RefreshControl
                                   refreshing={this.refreshing}
                                    onRefresh={() => {
                                        disableLoading();
                                        this.refreshing = true;
                                        this._refresh({
                                            cbFinish: () => {
                                                this.refreshing = false;
                                                enableLoading();
                                            },
                                        });
                                    }}
                                />
                              }
                >
                    <TextNotice
                        numberOfLines={3}
                    >
                        佳艺教育机构创办于1986年，是一家具有二十年多年品牌的幼教机构、中国社会音乐研究会理事单位、中国幼儿音乐艺术(全国)示范基地、中国民办学校“守诚信.重教学质量”双保障示范单位。
                    </TextNotice>
                    <TextNotice>
                        欢迎您以及朋友预约参观！
                    </TextNotice>
                    {appointmentIds.length > 0 && <TextNotice>预约历史：</TextNotice>}
                    {appointmentIds.length > 0
                    ? appointmentIds.map((id) => {
                        let appointment = helpers.appointmentFromCache(object, id);
                        return (
                            <components.Block key={id} containerStyle={{borderTopWidth: 1, borderColor: COLOR.linePrompt,}}>
                                <View style={{flexDirection: 'row'}}>
                                    <TextNotice>{'小朋友：' + appointment.name }</TextNotice>
                                    <TextNotice>{appointment.gender=='m' ? '男' : '女'}</TextNotice>
                                    <TextNotice>{'生日：' + helpers.yearMonthDayText(appointment.dateofbirth)}</TextNotice>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {appointment.mothername != '' && <TextNotice>{'妈妈：' + appointment.mothername }</TextNotice>}
                                    {appointment.fathername != '' && <TextNotice>{'爸爸：' + appointment.fathername }</TextNotice>}
                                </View>

                                <TextNotice
                                    style={{fontSize: 10, color: COLOR.textPrompt}}
                                >
                                    {'预约时间：' + helpers.yearMonthDayText(appointment.createdat)}
                                </TextNotice>
                            </components.Block>
                        )
                    })
                    :
                    <TextNotice>
                        {loading.loadingCount > 0 ? "加载中" : '您还没有预约过'}
                    </TextNotice>
                }

                <components.ButtonWithBg
                    text='预约参观'
                    onPress={() => Actions.CreateAppointment({cbOk: () => this._refresh()})}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />
                </ScrollView>
            </containers.Layout>
        );
    }
}