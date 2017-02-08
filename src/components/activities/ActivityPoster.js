/**
 * Created by peter on 07/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView, RefreshControl,
    ScrollView,InteractionManager
} from 'react-native';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import {TextNotice} from '../common';
import * as containers from '../../containers';
import * as components from '../';
import logger from '../../logger';
import {COLOR} from '../../config';

export default class ActivityPoster extends Component {
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

    _refresh({cbFinish}={}) {
        let {getActivityDescription, activityId} = this.props;

        let finished = 0;
        getActivityDescription({
            activityId,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, activityDescription, enableLoading, disableLoading} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '活动介绍'})}
                renderBackButton={components.NavBarBack}
            >
                {!!activityDescription ?
                    <WebView
                        source={{html: activityDescription}}
                    />
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
                        <TextNotice style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            {loading.loadingCount > 0 ? "加载中" : '暂无活动介绍！'}
                        </TextNotice>
                    </ScrollView>
                }
            </containers.Layout>
        );
    }
}

