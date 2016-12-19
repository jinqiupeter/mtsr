/**
 * Created by peter on 14/12/2016.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ListView, ScrollView, Text} from 'react-native';

import * as helpers from '../helpers';
import * as components from '../';
import {COLOR, customDayHeadings, customMonthNames} from '../../config';
import {TextNotice} from '../common';
import logger from '../../logger';
import {default as Selectable} from './Selectable';

export default class Regular extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsPacked();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.length != r2.length
        }).cloneWithRows(rows);
    }

    _getRowsPacked(props) {
        props = props || this.props;
        let {packedSelectableClasses} = props;

        let reduced = packedSelectableClasses.sort((a, b) => {
            return a.kcxq > b.kcxq ? 1 : a.kcxq == b.kcxq ? 0 : -1;
        }).reduce((accumulator, v) => {
            accumulator[v.kcxq] = (accumulator[v.kcxq] || []).concat([v]);

            return accumulator;
        }, {});

        let rows = Object.keys(reduced).map((v) => {
            return {kcxq: v, classes: reduced[v]};
        });
        return Object.values(rows);
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsPacked(nextProps);
        this.ds = this.ds.cloneWithRows(rows);
    }
    render() {
        let {selectedDate} = this.props;
        selectedDate = selectedDate || new Date();

        logger.debug("props in Regular: ", this.props);
        return (
            <ScrollView style={{flex: 1, paddingTop: 20, backgroundColor: COLOR.backgroundNormal}}>
                <TextNotice>
                    已选日期: {helpers.yearMonthDayWeekText(selectedDate)}
                </TextNotice>
                <ListView

                    dataSource={this.ds}
                    enableEmptySections={true}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={(packedSelectable) =>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                                <TextNotice>
                                    {helpers.WEEK_DAYS[packedSelectable.kcxq]}
                                </TextNotice>
                                <Selectable
                                    classes={packedSelectable.classes}
                                />
                            </View>
                    }
                />
            </ScrollView>
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