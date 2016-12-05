/**
 * Created by peter on 24/11/2016.
 */

import React , {Component} from 'react';
import {StyleSheet, View, Platform, ListView, ScrollView, RefreshControl, InteractionManager} from 'react-native';
import parse from 'date-fns/parse';
import isAfter from 'date-fns/is_after';
import eachDay from 'date-fns/each_day'
import isSameDay from 'date-fns/is_same_day';

import UnattendedClass from './UnattendedClass';
import {TextNotice} from '../common';
import * as helpers from '../helpers';
import logger from '../../logger';
import * as utils from '../../utils';

import * as components from '../';

export default class UnattendedClasses extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsUnattendedClass();
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
        let cachedClasses = Ids.map((v) => helpers.unattendClassFromCache(object, v))
                .filter((v) => v !== null);

        let expanded = cachedClasses.reduce((accumulated, cachedClass) => {
            if (cachedClass.type == 1) {
                // regular class
                let endDate = parse(cachedClass.enddate);
                if (isAfter(endDate, accumulated.endDate)) {
                    // extend end range
                    let newDays = eachDay(accumulated.endDate, endDate).map((v) => {
                        return {hasClass: false, date: v, classes: []};
                    });

                    accumulated.days = accumulated.days.concat(newDays);
                    accumulated.endDate = endDate;
                }

                accumulated.days = accumulated.days.map((v) => {
                    if (v.date.getDay() == cachedClass.kcxq) {
                        let classes = v.classes || [];
                        classes.push({...cachedClass});
                        return {hasClass: true, date: v.date, classes: classes}
                    } else {
                        return v;
                    }
                });
            }
            else if (cachedClass.type == 2) {
                // makeup class
                let found = false;
                cachedClass.date = parse(cachedClass.date);

                accumulated.days = accumulated.days.map((v) => {
                    if (isSameDay(v.date, cachedClass.date)) {
                        let classes = v.classes || [];
                        classes.push({...cachedClass});
                        found = true;
                        return {hasClass: true, date: v.date, classes: classes}
                    } else {
                        return v;
                    }
                });

                if (!found) {
                    // this makeup class is not in the range of regular classes
                    accumulated.days.push({hasClass: true,
                        date: cachedClass.date,
                        classes: [cachedClass]})
                }
            }

            return accumulated;
        }, {days: [], endDate: startDate});

        return expanded.days.filter((day) => {
            return isAfter(day.date, startDate)
        }).filter((v) => v !== null);
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsUnattendedClass(nextProps);
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
        let {input, account, unattendedClasses,
            enableLoading, disableLoading, errorFlash,
            sceneState, setSceneState, saveInput, submitDay} = this.props;
        logger.debug("props in unattended classes render: ", this.props);
        let {startDate} = this.props;
        let sceneKey = 'Classes';

        if (unattendedClasses.length > 0) {
            return (

                <ListView
                    dataSource={this.ds}
                    enableEmptySections={true}
                    scrollRenderAheadDistance={200}
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
