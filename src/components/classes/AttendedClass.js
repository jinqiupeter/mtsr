import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import parse from 'date-fns/parse';
import moment from 'moment';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import * as helpers from '../helpers';

export default class AttendedClass extends Component {
    render() {
        let {aClass} = this.props;

        return (
            <components.Block
                containerStyle={{
                    borderTopWidth: 1,
                    borderColor: COLOR.linePrompt,
                    }}
                onPress={
                    () => Actions.AfterClassInstruction({
                    ...aClass
                })}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                >
                    <View style={{flex: 1}}>
                            <components.TextNotice style={{
                                fontSize: 18,
                                color: COLOR.textHighlight,
                                textAlign: 'center',
                                paddingBottom: 0,
                            }}
                            >
                                {aClass.kcjc.toUpperCase()}
                            </components.TextNotice>
                        <components.TextNotice
                            style={{fontSize: 10,
                            paddingTop: 0,
                            color: COLOR.textPrompt,
                            textAlign: 'center',}}
                        >
                            {'上课类型：' + (aClass.jrfs == 1 ? 'Regular' : 'Makeup')}
                        </components.TextNotice>

                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{flexDirection: 'column', flex: 2, alignItems: 'center'}}>
                                <components.Text>{helpers.yearMonthDayText(aClass.skqkrq)}</components.Text>
                                <components.Text>{aClass.kckssj + "至" + aClass.kcjssj} </components.Text>
                            </View>
                            <View style={{flexDirection: 'column', flex: 2, alignItems: 'center'}}>
                                <components.Text>{aClass.kcjss}</components.Text>
                                <components.Text>{'签到：' + moment(parse(aClass.qdsj)).format("H:mm")}</components.Text>
                            </View>
                        </View>

                    </View>
                    <Icon name="angle-right"
                          style={{
                            marginLeft: 5,
                            fontSize: 16,
                            color: COLOR.textNormal,
                            paddingHorizontal: 2,
                            width: 20,}}/>
                </View>
            </components.Block>
        );
    }
}

