import React, {Component} from 'react';
import {
    StyleSheet,    ListView, InteractionManager,
    ScrollView, RefreshControl
} from 'react-native';

import {COLOR} from '../config';
import * as components from './';
import * as containers from '../containers';
import * as helpers from './helpers';
import * as utils from '../utils';
import logger from '../logger';
import {TextNotice} from './common';
import {Activity} from './activities';

export default class Activities extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsActivities();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
            || r1.ondate != r2.ondate
            || r1.starttime != r2.starttime
            || r1.endtime != r2.endtime
            || r1.participantscount != r2.participantscount
            || r1.attendstatus != r2.attendstatus
            || r1.costsclass != r2.costsclass
            || r1.maxparticipants != r2.maxparticipants
        }).cloneWithRows(rows);
    }

    _getRowsActivities(props) {
        props = props || this.props;
        logger.debug("props in _getRowsActivities: ", props);
        let {object} = props;
        let Ids = props.activities;
        let rows = Ids
            .map((v) => helpers.activitiesFromCache(object, v))
            .filter((v) => v !== null);

        return rows;
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsActivities(nextProps);
        this.ds = this.ds.cloneWithRows(rows);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {sceneKey, network, account} = this.props;
            if (network.isConnected
                && helpers.isNeedRefresh({sceneKey, network})
                && account.khbh && account.xpybh) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {getActivities} = this.props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getActivities({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let { account, network, activities, sceneKey,
            enableLoading, disableLoading, updateAttendStatus, getActivities
        } = this.props;
        logger.debug("props in activities render: ", this.props);

        if (!account.khbh || !account.xpybh) {
            return (
                <components.NoXpyAssociated
                    sceneKey={sceneKey}
                    currentTab={2}
                    title={'活动'}
                />
            )
        } else {
            return (
                <containers.Layout
                    sceneKey={sceneKey}
                    hideNavBar={false}
                    hideTabBar={false}
                    statusBarBgColor={COLOR.theme}
                    currentTab={2}
                    renderBackButton={() => null}
                    renderTitle={() => components.NavBarTitle({title: '活动'})}
                >
                    {activities.length > 0
                        ?
                        <ListView
                            contentContainerStyle={{flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 5}}
                            dataSource={this.ds}
                            enableEmptySections={true}
                            pageSize={5}
                            initialListSize={5}
                            renderRow={(activity) =>
                            <Activity
                                activity={activity}
                                updateAttendStatus={updateAttendStatus}
                            />
                        }
                            renderScrollComponent={(props) =>
                            <ScrollView
                                {...props}
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
                            />
                        }
                            onEndReached={() => {
                            if (network.isConnected && activities.length > 0) {
                                getActivities({
                                    offset: activities.length,
                                });
                            }
                        }}
                        />
                        :
                        <ScrollView
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
                        <components.TextNotice>
                            还没有活动！
                        </components.TextNotice>
                        </ScrollView>
                    }
                </containers.Layout>
            )
        }
    }
}

const styles = StyleSheet.create({
    class: {
        marginBottom: 1,
    },
});
