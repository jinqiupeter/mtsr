/**
 * Created by peter on 24/11/2016.
 */

import React , {Component} from 'react';
import {StyleSheet, View, Platform, ListView, ScrollView,
    RefreshControl, InteractionManager, SegmentedControlIOS
} from 'react-native';

import AttendedClass from './AttendedClass';
import {TextNotice} from '../common';
import * as helpers from '../helpers';
import logger from '../../logger';
import * as utils from '../../utils';
import {COLOR} from '../../config';

export default class AttendedClasses extends Component {
    componentWillMount() {
        this.refreshing = false;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(this._getRowsAttendedClass());
    }

    _getRowsAttendedClass(props) {
        props = props || this.props;
        let {object} = props;
        let {attendedClasses} = props;
        let rows = attendedClasses.map((v) => helpers.attendClassFromCache(object, v))
                .filter((v) => v !== null);

        return rows;
    }

    componentWillReceiveProps(nextProps) {
        this.ds = this.ds.cloneWithRows(this._getRowsAttendedClass(nextProps));
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
        let {getAttendedClasses} = props;

        setSceneLastRefreshTime({sceneKey});

            let finished = 0;
            getAttendedClasses({
                cbFinish: () => finished++,
            });
        utils.waitingFor({
                condition: () => finished == 1,
                cbFinish,
            });
    }

    render () {
        let {account, attendedClasses, network,
            enableLoading, disableLoading, saveInput,
            getAttendedClasses} = this.props;
        if (attendedClasses.length > 0) {
            return (
                <ListView
                    dataSource={this.ds}
                    enableEmptySections={true}
                    initialListSize={5}
                    pageSize={5}

                    renderRow={(aClass) =>
                        <AttendedClass
                            account={account}
                            aClass={aClass}
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
                        if (network.isConnected && attendedClasses.length > 0) {
                            getAttendedClasses({
                                offset: attendedClasses.length,
                            });
                        }
                    }}
                    />
            )
        } else {
            return (
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
                <TextNotice>
                    小朋友还没有上过课哦！
                </TextNotice>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.backgroundLighter,
        marginBottom: 10,
        paddingBottom: 10,
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
});
