/**
 * Created by peter on 24/11/2016.
 */

import React , {Component} from 'react';
import {StyleSheet, View, Platform, ListView,
    ScrollView, RefreshControl, InteractionManager,SegmentedControlIOS
} from 'react-native';

import UnattendedClass from './UnattendedClass';
import {TextNotice} from '../common';
import * as helpers from '../helpers';
import logger from '../../logger';
import * as utils from '../../utils';

import isAfter from 'date-fns/is_after';
import parse from 'date-fns/parse';
import isSameDay from 'date-fns/is_same_day';
import addDays from 'date-fns/add_days'

import * as components from '../';
import {COLOR} from '../../config';

export default class UnattendedClasses extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsUnattendedClass();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.hasClass != r2.hasClass
            || !isSameDay(r1.date, r2.date)
            || r1.classes.length != r2.classes.length
            || !!r1.classes.find((r1c) => {
                let r2aClass = r2.classes.find(r2c => {
                    return r2c.kcbxxbh == r1c.kcbxxbh
                        && r2c.appliedAbsence == r1c.appliedAbsence
                });
                return !!r2aClass;
            })
        }).cloneWithRows(rows);
    }

    _getRowsUnattendedClass(props) {
        props = props || this.props;
        let {object} = props;
        let {startDate} = props;
        let Ids = props.unattendedClasses;
        let cachedClasses = Ids
            .map((v) => helpers.unattendClassFromCache(object, v))
            .filter((v) => v !== null)
            .filter((day) => {
                return day.hasClass && (isAfter(day.date, startDate) || isSameDay(day.date, startDate));
            });

        return cachedClasses;
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsUnattendedClass(nextProps);
        this.ds = this.ds.cloneWithRows(rows);
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
        let {object, unattendedClasses, saveInput, enableLoading, disableLoading,
            errorFlash, moreClass, changeStartDay, startDate, getUnattendedClasses,
            updateAbsence, signInClass, deselectRegular, deselectMakeup
        } = this.props;

        let lastDayId = unattendedClasses[unattendedClasses.length -1];
        let lastDay = helpers.unattendClassFromCache(object, lastDayId);
        logger.debug("lastday and startDate: ", lastDay, startDate);

        if (unattendedClasses.length > 0) {
            return (
                <ListView
                    dataSource={this.ds}
                    enableEmptySections={true}
                    pageSize={5}
                    initialListSize={5}

                    renderHeader={() =>
                        <View
                            style={styles.container}
                        >
                        <SegmentedControlIOS
                            values={['未上课程', '已上课程']}
                            selectedIndex={0}
                            onChange={(event) => saveInput('Classes',
                                {selectedClassType: event.nativeEvent.selectedSegmentIndex}
                                )}
                            tintColor={COLOR.theme}
                            style={styles.segmentedControl}
                        />
                        <View style={styles.titleContainer}>
                                <components.ButtonWithBg
                                    text='今天'
                                    onPress={() => {
                                        changeStartDay(new Date());
                                    }}
                                    containerStyle={{flex: 1}}
                                    textStyle={{fontSize: 12}}
                                />
                                <components.ButtonWithBg
                                    text='下周'
                                    disabled={isAfter(addDays(startDate, 7), lastDay.date)}
                                    onPress={() => {
                                        changeStartDay(addDays(startDate, 7));
                                    }}
                                    containerStyle={{flex: 1}}
                                    textStyle={{fontSize: 12}}
                                />
                                <components.ButtonWithBg
                                    text='下个月'
                                    disabled={isAfter(addDays(startDate, 30), lastDay.date)}
                                    onPress={() => {
                                        changeStartDay(addDays(startDate, 30));
                                    }}
                                    containerStyle={{flex: 1}}
                                    textStyle={{fontSize: 12}}
                                />
                            </View>
                        </View>
                    }

                    renderRow={(day) =>
                        <UnattendedClass
                            day={day}
                            updateAbsence={updateAbsence}
                            signInClass={signInClass}
                            deselectRegular={deselectRegular}
                            deselectMakeup={deselectMakeup}
                            cbOkAbsence={() => {
                                getUnattendedClasses({});
                            }}
                            errorFlash={errorFlash}
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
                        moreClass({
                            currentLength: unattendedClasses.length,
                            sceneKey: 'Classes'
                        });
                    }}
                    />
            )} else {
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
                        小朋友还没有选课哦！
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
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    titleContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLOR.backgroundLighter,
    },
});