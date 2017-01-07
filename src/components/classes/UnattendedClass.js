import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, ListView, Text, Alert
} from 'react-native';
import isAfter from 'date-fns/is_after';
import diffInDays from 'date-fns/difference_in_calendar_days';
import isSameDay from 'date-fns/is_same_day';
import moment from 'moment';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import logger from '../../logger';
import {TextNotice} from '../common';
import * as helpers from '../helpers';

export default class UnattendedClass extends Component {
    render() {
        let {day, updateAbsence, signInClass, cbOkAbsence, deselectRegular} = this.props;
        return (
            <components.Block containerStyle={styles.container}>
                <TextNotice
                    style={{
                        color: COLOR.theme,
                        textAlign: 'center',
                        padding: 0,
                    }}
                >{helpers.yearMonthDayWeekText(day.date)}</TextNotice>
                {day.classes.map((aClass) => {
                    let absenceOnPress = () => {
                        updateAbsence({
                            date: moment(day.date).format("YYYY-MM-DD hh:mm:ss"),
                            kcbxxbh: "" + aClass.kcbxxbh,
                            applyAbsence: aClass.appliedAbsence ? "0" : "1",
                            cbOkAbsence
                        });
                    };
                    return (
                    <components.Block containerStyle={[styles.container, styles.card,]} key={aClass.id} >
                        <TextNotice
                            style={{fontSize: 18, color: COLOR.textHighlight}}
                        >
                            {'课程：' + aClass.kcjc.toUpperCase()}
                        </TextNotice>
                        <View  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TextNotice >{'开始时间：' + aClass.kckssj}</TextNotice>
                            <TextNotice style={{flex: 1}}>{'教室：' + aClass.kcjss}</TextNotice>
                        </View>
                        <View  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextNotice
                                style={{fontSize: 10, color: COLOR.textPrompt}}
                            >
                                {'选课类型：' + (aClass.type == 1 ? 'Regular' : 'Makeup')}
                            </TextNotice>

                            {/*签到按钮*/}
                            {
                                isSameDay(day.date, new Date())
                                &&
                                <components.Button
                                    text="签到"
                                    onPress={() => {
                                        Alert.alert(
                                                    '确定签到吗？',
                                                    "日期：" + moment(day.date).format("YYYY-MM-DD")
                                                    + "\n时间：" + aClass.kckssj
                                                    + "\n课程：" + aClass.kcjc.toUpperCase(),
                                                    [
                                                        {text: '取消', onPress: () => {}},
                                                        {text: '确定', onPress: () => {
                                                            signInClass({
                                                                kcbxxbh: "" + aClass.kcbxxbh,
                                                                date: moment(day.date).format("YYYY-MM-DD hh:mm:ss"),
                                                            })
                                                        }},
                                                    ],
                                                );
                                    }}
                                    containerStyle={{margin: 0, padding: 5}}
                                    textStyle={{fontSize: 12}}
                                />

                            }

                            {/*请假按钮*/}
                            {
                                aClass.type ==2
                                    // Makeup 课程
                                    ? isAfter(day.date, new Date())
                                        ? <components.Button
                                                text={aClass.appliedAbsence ? '取消请假' : '请假'}
                                                onPress={() => absenceOnPress()}
                                                containerStyle={{margin: 0, padding: 5}}
                                                textStyle={{fontSize: 12}}
                                            />
                                        : null

                                    // regular 课程
                                    : diffInDays(day.date, new Date()) >= 7
                                        ? <components.Button
                                            text={aClass.appliedAbsence ? '取消请假' : '请假'}
                                            onPress={() => {absenceOnPress()}}
                                            containerStyle={{margin: 0, padding: 5}}
                                            textStyle={{fontSize: 12}}
                                        />
                                        : null
                            }

                            {/*取消选课按钮*/}
                            {
                                aClass.type ==2
                                    // Makeup 课程
                                    ? isAfter(day.date, new Date())
                                        ? <components.Button
                                            text={'取消选课'}
                                            onPress={() => absenceOnPress()}
                                            containerStyle={{margin: 0, padding: 5}}
                                            textStyle={{fontSize: 12}}
                                        />
                                        : null

                                    // regular 课程
                                    : diffInDays(day.date, new Date()) >= 7
                                        ? <components.Button
                                            text={'取消选课'}
                                            onPress={() => {
                                                Alert.alert(
                                                    '确定取消选课吗？',
                                                    "本课程是Regular课程，这样做会取消所有同时段的课程",
                                                    [
                                                        {text: '取消', onPress: () => {}},
                                                        {text: '确定', onPress: () => {
                                                            deselectRegular({xkxxbh: "" + aClass.xkxxbh})
                                                        }},
                                                    ],
                                                );

                                            }}
                                            containerStyle={{margin: 0, padding: 5}}
                                            textStyle={{fontSize: 12}}
                                        />
                                        : null
                            }
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

