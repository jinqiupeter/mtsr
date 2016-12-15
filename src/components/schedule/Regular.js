/**
 * Created by peter on 14/12/2016.
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import isSameDay from 'date-fns/is_same_day';

import * as helpers from '../helpers';
import * as components from '../';
import {COLOR, customDayHeadings, customMonthNames} from '../../config';
import {TextNotice} from '../common';

export default class Regular extends Component {
    render() {
        let {selectedDate, eventDates} = this.props;
        return (
            <View style={{flex: 1, paddingTop: 20, backgroundColor: COLOR.backgroundNormal}}>
                <TextNotice>Regular 选课</TextNotice>
                <TextNotice>
                    已选日期: {helpers.yearMonthDayWeekText(selectedDate)}
                </TextNotice>
                <components.ButtonWithBg
                    text='查看详情'
                    onPress={() => Actions.SelectClass({selectable: eventDates.find((v) => {
                            return isSameDay(v.date, selectedDate);
                        }) || {date: selectedDate, hasClass: false}})}
                    textStyle={{fontSize: 16}}
                    containerStyle={{marginTop: 20}}
                />
            </View>
        )
    }
}

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