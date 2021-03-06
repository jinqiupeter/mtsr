/**
 * Created by peter on 16/12/2016.
 */
import React, {Component} from 'react';
import {ListView, View, InteractionManager,
    RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {TextNotice, TextWithIcon} from '../common';
import logger from '../../logger';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import * as components from '../';
import * as containers from '../../containers';
import {COLOR} from '../../config';
import {Actions} from 'react-native-router-flux';

export default class Referral extends Component {
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
        let {getReferral} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getReferral({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, object, referralIds,
            disableLoading, enableLoading} = this.props;

        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '推荐朋友'})}
                renderBackButton={components.NavBarBack}
                containerStyle={{flex: 1}}
            >
                <ScrollView
                    {...this.props}
                    contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
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
                    >
                        如果您喜欢蒙特索利，可以把您的朋友推荐给我们！
                    </TextNotice>
                    {referralIds.length > 0 && <TextNotice>推荐历史：</TextNotice>}
                {referralIds.length > 0
                    ? referralIds.map((id) => {
                        let referral = helpers.referralFromCache(object, id);
                        return (
                            <components.Block key={id} containerStyle={{borderTopWidth: 1, borderColor: COLOR.linePrompt,}}>
                                <View style={{flexDirection: 'row'}}>
                                    <TextNotice>{'小朋友：' + referral.xm }</TextNotice>
                                    <TextNotice>{referral.gender=='m' ? '男' : '女'}</TextNotice>
                                    <TextNotice>{'生日：' + helpers.yearMonthDayText(referral.csrq)}</TextNotice>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {referral.mqxm != '' && <TextNotice>{'妈妈：' + referral.mqxm }</TextNotice>}
                                    {referral.fqxm != '' && <TextNotice>{'爸爸：' + referral.fqxm }</TextNotice>}
                                </View>

                                <TextNotice
                                    style={{fontSize: 10, color: COLOR.textPrompt}}
                                >
                                    {'推荐时间：' + helpers.yearMonthDayText(referral.txsj)}
                                </TextNotice>
                            </components.Block>
                        )
                    })
                    :
                    <TextNotice>
                        {loading.loadingCount > 0 ? "加载中" : '您还没有推荐过朋友！'}
                    </TextNotice>
                }

                <components.ButtonWithBg
                    text='推荐'
                    onPress={() => Actions.CreateReferral({cbOk: () => this._refresh()})}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />
                </ScrollView>
            </containers.Layout>
        );
    }
}

const style = StyleSheet.create({
    icon: {
        marginRight: 5,
        fontSize: 16,
        color: COLOR.theme,
    },
});