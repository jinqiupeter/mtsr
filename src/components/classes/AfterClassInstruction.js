/**
 * Created by peter on 07/12/2016.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager
    , RefreshControl,ScrollView
} from 'react-native';

import {COLOR} from '../../config';
import * as utils from '../../utils';
import * as helpers from '../helpers';
import {TextNotice} from '../common';
import * as containers from '../../containers';
import * as components from '../';
import logger from '../../logger';

export default class AfterClassInstruction extends Component {
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
        let {sceneKey} = props;
        let {getAfterClassInstruction, kcbxxbh, skqkrq, kckssj, kcjssj} = props;

        let finished = 0;
        getAfterClassInstruction({
            kcbxxbh,
            skqkrq,
            kckssj,
            kcjssj,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, instruction, disableLoading, enableLoading} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '课后指南'})}
                renderBackButton={components.NavBarBack}
            >
                {instruction.hasInstruction ?
                <WebView
                    source={{html: instruction.instruction}}
                >
                </WebView>
                    :
                <ScrollView
                    style={{
                    flex: 1,
                    backgroundColor: COLOR.backgroundLighter,
                }}

                    {...this.props}
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
                    <TextNotice>
                        {loading.loadingCount > 0 ? "加载中" : '老师还没有发布课后指南哦！'}
                    </TextNotice>
                </ScrollView>
                }
            </containers.Layout>
        );
    }
}

