/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {
    StyleSheet, View, Text,
    SegmentedControlIOS, InteractionManager
} from 'react-native';

import {COLOR, customDayHeadings, customMonthNames} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as utils from '../utils';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import {TextNotice} from './common';


export default class Schedule extends Component {
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {network, sceneKey} = this.props;
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                logger.debug("refreshing ", sceneKey);
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {getSelectable} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getSelectable({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {input, sceneKey, loading, processing, error,
            saveInput, submitDay} = this.props;
        let {eventDates} = this.props;

        eventDates = eventDates || [];
        let selectedDate = input[sceneKey].selectedDate;
        logger.debug("props in Schedule: ", this.props);

        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                hideNavBar={false}
                hideTabBar={false}
                statusBarBgColor={COLOR.theme}
                currentTab={1}
                renderBackButton={() => null}
                renderTitle={() => components.NavBarTitle({title: '选课'})}
            >
                <View style={{flex: 1, paddingTop: 20, backgroundColor: '#f7f7f7'}}>
                    <Calendar
                        scrollEnabled={true}              // False disables swiping. Default: False
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
                        nextButtonText={'下个月'}           // Text for next button. Default: 'Next'
                        onDateSelect={(date) => saveInput(sceneKey, {selectedDate: date})} // Callback after date selection
                        customStyle={styles} // Customize any pre-defined styles
                        weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                    />
                    <TextNotice>Selected Date: {moment(selectedDate).format('MMMM DD YYYY')}</TextNotice>
                </View>
            </components.Layout>
        );
    }
}

const styles = StyleSheet.create({
    day: {
        fontSize: 15,
        textAlign: 'center'
    },
    calendarControls: {
        backgroundColor: COLOR.backgroundNormal,
    },
    calendarHeading: {
        backgroundColor: COLOR.theme,
    },
    controlButtonText: {
        color: COLOR.theme,
    },
    currentDayCircle: {
        backgroundColor: COLOR.theme,
    },
    currentDayText: {
        color: COLOR.textHighlight,
    },
});

