/**
 * Created by peter on 14/12/2016.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ListView, SegmentedControlIOS,
    ScrollView, Text, RefreshControl, InteractionManager} from 'react-native';

import {Actions} from 'react-native-router-flux';

import * as helpers from '../helpers';
import * as components from '../';
import {COLOR} from '../../config';
import {TextNotice} from '../common';
import logger from '../../logger';
import * as utils from '../../utils';

export default class Regular extends Component {
    componentWillMount() {
        this.refreshing = false;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {network} = this.props;
            let sceneKey = 'Schedule';
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {setSceneLastRefreshTime} = props;
        let {input, account, getSelectable} = props;
        let sceneKey = 'Schedule';

        if (!account.khbh || !account.xpybh) {
            return;
        }

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        let startingDate = input[sceneKey].selectedDate;
        getSelectable({
            startingDate,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {disableLoading, enableLoading,
            saveInput, selectRegular} = this.props;

        logger.debug("props in Regular: ", this.props);

        let {packedSelectableClasses} = this.props;

        let reduced = packedSelectableClasses.sort((a, b) => {
            return a.kcxq > b.kcxq ? 1 : a.kcxq == b.kcxq ? 0 : -1;
        }).reduce((accumulator, v) => {
            accumulator[v.kcxq] = (accumulator[v.kcxq] || []).concat([v]);
            return accumulator;
        }, {});

        logger.debug("got reduced: ", reduced);

        let rows = Object.keys(reduced).map((v) => {
            return {kcxq: v, classes: reduced[v]};
        });

        let daysWithClasses = Object.values(rows);

        logger.debug("got daysWithClasses: ", daysWithClasses, this.refreshing);

        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: COLOR.backgroundLighter,
                }}

                {...this.props}
                contentContainerStyle={{
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}

                refreshControl={
                    <RefreshControl
                       refreshing={this.refreshing}
                        onRefresh={() => {
                            disableLoading();
                            this.refreshing = true;
                            this._refresh({
                                cbFinish: () => {
                                    logger.debug("setting refreshing to false")
                                    this.refreshing = false;
                                    enableLoading();
                                },
                            });
                        }}
                    />
                 }
            >
                <View style={styles.container}>
                    <SegmentedControlIOS
                        values={['Regular选课', 'Makeup选课']}
                        selectedIndex={0}
                        onChange={(event) => saveInput('Schedule',
                                {selectedScheduleType: event.nativeEvent.selectedSegmentIndex}
                                )}
                        tintColor={COLOR.theme}
                        style={styles.segmentedControl}
                    />
                </View>

                <View style={{borderBottomWidth: 1, borderColor: COLOR.linePrompt}}>
                    <components.TextNotice >
                        以Regular方式选定的课程会在该课程适合的月龄内为学员自动排课，如果您不确定是否喜欢该课程，建议以Makeup方式选课。以下是适合学员学龄的Regular课程：
                    </components.TextNotice>
                </View>

                {daysWithClasses.map((day, index) =>
                    <components.Block
                        key={day.kcxq}
                        containerStyle={{
                            marginLeft: 8,
                            marginRight: 20,
                            marginTop: 5,
                            padding: 0,
                            paddingBottom: 5,
                            borderBottomWidth: 1,
                            borderColor: COLOR.linePrompt,
                            borderRadius: 8,
                            backgroundColor: (index %2 == 0) ? COLOR.linePrompt : COLOR.backgroundDarker,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TextNotice style={{
                            flex: 1,
                            fontSize: 14,
                            paddingLeft: 2,
                            color: COLOR.theme,}}>
                            {helpers.WEEK_DAYS[day.kcxq]}
                        </TextNotice>

                        <View style={{
                            flex: 10,
                            flexDirection: 'column',
                        }}>
                        {day.classes.sort((a, b) => {
                            // sort by kckssj, from morning to afternoon
                            let matchA = a.kckssj.match(/(\d+):(\d+)/);
                            let matchB = b.kckssj.match(/(\d+):(\d+)/);

                            if (matchA[1] > matchB[1]) {
                                return 1;
                            } else if (matchA[1] == matchB) {
                                // compare minutes if hours are equal
                                return matchA[2] > matchB[2]
                                    ?   1
                                    : matchA[2] == matchB[2]
                                        ?  0
                                        :  -1;
                            } else {
                                return -1;
                            }
                        }).map(aClass =>
                            <components.Block
                                key={aClass.id}
                                containerStyle={[
                                    {flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    marginBottom:4,
                                    marginTop:4,
                                    },
                                    styles.card
                                ]}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingBottom: 0,
                                }}>
                                    <components.TextNotice style={{flex: 1.5}}>
                                        { aClass.kckssj + '-' + aClass.kcjssj }
                                    </components.TextNotice >
                                    <components.TextNotice style={{flex: 1, fontSize: 14, color: COLOR.textHighlight}}>
                                        {aClass.kcmc.toUpperCase()}
                                    </components.TextNotice>
                                    <components.TextNotice style={{flex: 1.5}}>
                                        {'月龄: ' + aClass.kcksyl + '-' + aClass.kcjsyl}
                                    </components.TextNotice>
                                </View>
                                <View style={{paddingTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                                    <components.TextNotice >
                                        {'教室: ' + aClass.kcjss}
                                    </components.TextNotice>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <components.Button
                                        text={'选定'}
                                        onPress={() => {selectRegular({kcbxxbh: "" + aClass.kcbxxbh})}}
                                        containerStyle={{margin: 10, padding: 5}}
                                        textStyle={{fontSize: 12}}
                                    />
                                    <components.Button
                                        text={'详情'}
                                        onPress={() => Actions.ClassDescription({kcbxxbh: aClass.kcbxxbh})}
                                        containerStyle={{margin: 0, padding: 5, }}
                                        textStyle={{fontSize: 12}}
                                    />
                                    </View>
                                </View>

                            </components.Block>
                        )}
                        </View>
                    </components.Block>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.backgroundLighter,

        borderColor: COLOR.linePrompt
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    titleContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLOR.backgroundLighter,
    },
    card: {
        borderRadius: 8,
        shadowColor: COLOR.backgroundDarkLighter,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
});