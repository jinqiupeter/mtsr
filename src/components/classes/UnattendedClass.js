import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, ListView, Text
} from 'react-native';
import isAfter from 'date-fns/is_after';
import diffInDays from 'date-fns/difference_in_calendar_days';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import logger from '../../logger';
import {TextNotice} from '../common';
import * as helpers from '../helpers';

export default class UnattendedClass extends Component {
    render() {
        let {day} = this.props;
        logger.debug("rendering day: ", day);
        return (
            <components.Block containerStyle={styles.container}>
                <TextNotice
                    style={{
                        color: COLOR.theme,
                        textAlign: 'center',
                        paddingTop: 0,
                    }}
                >{helpers.yearMonthDayWeekText(day.date)}</TextNotice>
                {day.classes.map((aClass) => { return (
                    <components.Block containerStyle={[styles.container, styles.card]} key={aClass.id} >
                        <TextNotice
                            style={{fontSize: 18, color: COLOR.textHighlight}}
                        >
                            {'课程：' + aClass.kcjc.toUpperCase()}
                        </TextNotice>
                        <View  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TextNotice>{'开始时间：' + aClass.kckssj}</TextNotice>
                            <TextNotice>{'结束时间：' + aClass.kcjssj}</TextNotice>
                            <TextNotice>{'教室：' + aClass.kcjss}</TextNotice>
                        </View>
                        <View  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextNotice
                                style={{fontSize: 10, color: COLOR.textPrompt}}
                            >
                                {'选课类型：' + (aClass.type == 1 ? 'Regular' : 'Makeup')}
                            </TextNotice>
                            { (aClass.type ==2 && isAfter(day.date, new Date())
                            || aClass.type ==1 && diffInDays(day.date, new Date()) >= 7)
                                &&  <components.Button
                                text='请假'
                                onPress={() => Actions.EditProfile()}
                                containerStyle={{margin: 0, padding: 5}}
                                textStyle={{fontSize: 12}}
                            />}

                        </View>


                    </components.Block>
                    )})
                }
            </components.Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
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

