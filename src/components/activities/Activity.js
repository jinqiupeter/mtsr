/**
 * Created by peter on 08/12/2016.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import logger from '../../logger';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';
import isAfter from 'date-fns/is_after';

import {COLOR} from '../../config';
import * as components from '../';
import * as helpers from '../helpers';

export default class Activity extends Component {
    render() {
        let {activity, updateAttendStatus} = this.props;
        logger.debug("rendering activity: ", activity);
        let buttonText = "";
        let targetStatus = "-1";
        let buttonDisabled = false;
        if (!activity.attendstatus || activity.attendstatus == "-1") {
            buttonText = "报名";
            targetStatus = "0"
            if (isSameDay(activity.ondate, new Date())
                || parseInt(activity.participantscount >= activity.maxparticipants)) {
                buttonDisabled = true;
            }
        } else if (activity.attendstatus == "0") {
            buttonText = (isSameDay(activity.ondate, new Date()) ? '签到' : "请假");
            targetStatus = (isSameDay(activity.ondate, new Date()) ? '1' : "3");
        } else if (activity.attendstatus == "3") {
            buttonText = "取消请假";
            targetStatus = "0";
        } else if (activity.attendstatus == "1") {
            buttonText = "已签到";
            targetStatus = "1";
        }

        return (
            <components.Block
                containerStyle={[
                    {flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin:5,
                    },
                    styles.card
            ]}
            >
                <components.TextNotice
                    style={{
                        flex: 1,
                        fontSize: 16,
                        color: COLOR.textHighlight,
                        textAlign: 'center',
                        }}>
                    {activity.title.toUpperCase()}
                </components.TextNotice>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 0,
                }}>
                    <components.TextNotice>
                        { helpers.yearMonthDayWeekText(activity.ondate) }
                    </components.TextNotice >

                    <components.TextNotice>
                        { '时间: ' + activity.starttime + '-' + activity.endtime }
                    </components.TextNotice >


                </View>

                <View style={{paddingTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <components.TextNotice >
                        {'人数限制: ' + activity.participantscount + "/" + activity.maxparticipants}
                    </components.TextNotice>

                    <components.TextNotice style={{flex: 1.5}}>
                        {'消耗课时: ' + activity.costsclass}
                    </components.TextNotice>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {(!isSameDay(activity.ondate, new Date()) && !isAfter(activity.ondate, new Date()))
                            ?
                            <components.TextNotice style={{color: COLOR.lineNormal}}>
                                {(!activity.attendstatus || activity.attendstatus == -1) ? '已结束' : buttonText}
                            </components.TextNotice>
                            :
                            (activity.attendstatus  == "1"
                                    ?
                                    <components.TextNotice style={{color: COLOR.lineNormal}}>
                                        {'已签到'}
                                    </components.TextNotice>
                                    :
                                    <components.Button
                                        text={buttonText}
                                        disabled={buttonDisabled}
                                        onPress={() => {
                                            updateAttendStatus({activityId: activity.id, targetStatus});
                                        }}
                                        containerStyle={{margin: 10, padding: 5}}
                                        textStyle={{fontSize: 12}}
                                    />
                            )
                        }
                        <components.Button
                            text={'详情'}
                            onPress={() => Actions.ActivityPoster({activityId: activity.id})}
                            containerStyle={{margin: 0, padding: 5, }}
                            textStyle={{fontSize: 12}}
                        />
                    </View>
                </View>

            </components.Block>
        );
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
