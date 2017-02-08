/**
 * Created by peter on 14/12/2016.
 */

import React, {Component} from 'react';
import {View, StyleSheet, SegmentedControlIOS,
    ScrollView, InteractionManager, RefreshControl} from 'react-native';
import Calendar from 'react-native-calendar';
import {Actions} from 'react-native-router-flux';
import isSameDay from 'date-fns/is_same_day';
import addMonths from 'date-fns/add_months';
import moment from 'moment';

import * as helpers from '../helpers';
import * as components from '../';
import {COLOR, customDayHeadings, customMonthNames} from '../../config';
import {TextNotice} from '../common';
import logger from '../../logger';
import * as utils from '../../utils';

export default class Makeup extends Component {
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
        let {selectedDate, eventDates,
            changeMonth, saveInput, disableLoading, enableLoading, selectMakeup} = this.props;
        selectedDate = selectedDate || new Date();
        let sceneKey = 'Schedule';

        let showMonth = (delta) => {
            let targetDate = addMonths(selectedDate, delta);
            saveInput(sceneKey,
                {selectedDate: targetDate},
                () => {
                    changeMonth({startingDate: targetDate});
                }
            );
        };

        let day = eventDates.find((v) => {
            return isSameDay(v.date, selectedDate);
        }) || {classes: []};

        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: COLOR.backgroundNormal
                }}
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

                <View
                    style={styles.container}
                >
                    <SegmentedControlIOS
                        values={['Regular选课', 'Makeup选课']}
                        selectedIndex={1}
                        onChange={(event) => saveInput('Schedule',
                                {selectedScheduleType: event.nativeEvent.selectedSegmentIndex}
                                )}
                        tintColor={COLOR.theme}
                        style={styles.segmentedControl}
                    />
                </View>

                <Calendar
                    scrollEnabled={true}              // False disables swiping. Default: False
                    startDate={selectedDate}
                    selectedDate={selectedDate}
                    showControls={true}               // False hides prev/next buttons. Default: False
                    eventDates={eventDates.map((v) => {
                            return v.date;
                        })}       // Optional array of moment() parseable dates that will show an event indicator
                    events={[]}// Optional array of event objects with a date property and custom styles for the event indicator
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    titleFormat={'YYYY MMMM'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    monthNames={customMonthNames}                // Defaults to english names of months
                    prevButtonText={'上个月'}           // Text for previous button. Default: 'Prev'
                    onSwipeNext={() => showMonth(1)}
                    onTouchNext={() => showMonth(1)}
                    onSwipePrev={() => showMonth(-1)}
                    onTouchPrev={() => showMonth(-1)}
                    nextButtonText={'下个月'}           // Text for next button. Default: 'Next'
                    onDateSelect={(date) => saveInput(sceneKey, {selectedDate: date})} // Callback after date selection
                    customStyle={calendarStyle} // Customize any pre-defined styles
                    weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                />
                <TextNotice style={{marginTop: 10, paddingBottom: 0, color: COLOR.theme}}>
                    已选日期: {helpers.yearMonthDayWeekText(selectedDate)
                    + (day.classes.length > 0 ? ', 当天可选课程: ' : ', 当天没有可选课程')}
                </TextNotice>
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
                                    margin:5,
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
                                    onPress={() => {selectMakeup({
                                        kcbxxbh: "" + aClass.kcbxxbh,
                                        date: moment(day.date).format("YYYY-MM-DD"),
                                    })}}
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
            </ScrollView>
        )
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

const calendarStyle = StyleSheet.create({
    day: {
        fontSize: 15,
        textAlign: 'center'
    },
    calendarControls: {
        backgroundColor: COLOR.backgroundLighter,
    },
    calendarHeading: {
        backgroundColor: COLOR.backgroundLighter,
    },
    controlButtonText: {
        color: COLOR.theme,
    },
    currentDayCircle: {
        backgroundColor: COLOR.theme,
    },
    currentDayText: {
        color: COLOR.textHighlight,
        fontSize: 16,
    },
    eventIndicator: {
        backgroundColor: COLOR.theme,
    },
    selectedDayCircle: {
        backgroundColor: COLOR.textHighlight,
    },
});