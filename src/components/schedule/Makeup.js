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
            changeMonth, saveInput, disableLoading, enableLoading} = this.props;
        selectedDate = selectedDate || new Date();
        let sceneKey = 'Schedule';
        logger.debug("Props in Makeup render: ", this.props);
        let showMonth = (delta) => {
            let targetDate = addMonths(selectedDate, delta);
            saveInput(sceneKey,
                {selectedDate: targetDate},
                () => {
                    changeMonth({startingDate: targetDate});
                }
            );
        };
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
                                    logger.debug("setting refreshing to false")
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
                <TextNotice>已选日期: {helpers.yearMonthDayWeekText(selectedDate)}</TextNotice>
                <components.ButtonWithBg
                    text='查看详情'
                    onPress={() => Actions.SelectClass({selectable: eventDates.find((v) => {
                            return isSameDay(v.date, selectedDate);
                        }) || {date: selectedDate, hasClass: false}})}
                    textStyle={{fontSize: 16}}
                    containerStyle={{marginTop: 20}}
                />
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
});

const calendarStyle = StyleSheet.create({
    day: {
        fontSize: 15,
        textAlign: 'center'
    },
    calendarControls: {
        backgroundColor: COLOR.backgroundNormal,
    },
    calendarHeading: {
        backgroundColor: COLOR.backgroundNormal,
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