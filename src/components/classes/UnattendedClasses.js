/**
 * Created by peter on 24/11/2016.
 */

import React , {Component} from 'react';
import {StyleSheet, View, Platform, ListView, ScrollView, RefreshControl, InteractionManager} from 'react-native';

import UnattendedClass from './UnattendedClass';
import {TextNotice} from '../common';
import * as helpers from '../helpers';
import logger from '../../logger';
import * as utils from '../../utils';

import isAfter from 'date-fns/is_after';
import isSameDay from 'date-fns/is_same_day';

import * as components from '../';

export default class UnattendedClasses extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsUnattendedClass();
        logger.debug("componentWillMount render rows: ", rows);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.hasClass != r2.hasClass
            || !isSameDay(r1.date, r2.date)
            || r1.classes.length != r2.classes.length
        }).cloneWithRows(rows);
    }

    _getRowsUnattendedClass(props) {
        props = props || this.props;
        let {object} = props;
        let {startDate} = props;
        let Ids = props.unattendedClasses;
        logger.debug("class id to read from cache: ", Ids);
        let cachedClasses = Ids.map((v) => helpers.unattendClassFromCache(object, v))
                .filter((v) => v !== null);

        return cachedClasses.filter((day) => {
            return isAfter(day.date, startDate) || isSameDay(day.date, startDate);
        });
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsUnattendedClass(nextProps);
        logger.debug("will render rows: ", rows);
        this.ds = this.ds.cloneWithRows(rows);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {sceneKey, network} = this.props;
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {getUnattendedClasses} = props;

        setSceneLastRefreshTime({sceneKey});

            let finished = 0;
        getUnattendedClasses({
                cbFinish: () => finished++,
            });
        utils.waitingFor({
                condition: () => finished == 1,
                cbFinish,
            });
    }

    render () {
        let {account, unattendedClasses,
            enableLoading, disableLoading, errorFlash, moreClass
            } = this.props;
        logger.debug("props in unattended classes render: ", this.props);

        if (unattendedClasses.length > 0) {
            return (

                <ListView
                    dataSource={this.ds}
                    enableEmptySections={true}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={(day) =>
                        <UnattendedClass
                            account={account}
                            day={day}
                            errorFlash={errorFlash}
                            containerStyle={styles.class}
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
                        logger.debug("reaching end, unattendedClasses.length: ", unattendedClasses.length)
                        moreClass({offset: unattendedClasses.length});
                    }}
                    />

            )
        } else {
            return (
                <TextNotice>
                    小朋友还没有选课哦！
                </TextNotice>
            )
        }
    }
}

const styles = StyleSheet.create({
    class: {
        marginBottom: 5,
    },
});
