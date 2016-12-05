/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, ListView, Text
} from 'react-native';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import logger from '../../logger';
import {TextNotice} from '../common';

export default class UnattendedClass extends Component {
    componentWillMount() {
        let {day} = this.props;
        logger.debug("mounting UnattendedClass: ", day);

        this.refreshing = false;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(day.classes || []);
    }

    render() {
        let {day, containerStyle} = this.props;

        return (
            day.hasClass ?

        <ListView
            dataSource={this.ds}
            enableEmptySections={true}
            initialListSize={5}
            pageSize={5}
            renderHeader={() =>
            <TextNotice>
                {day.date.toDateString()}
            </TextNotice>}
            renderRow={(aClass) =>
                <components.Block containerStyle={containerStyle}>
                    <View style={{flexDirection: 'row', paddingBottom: 2.5}}>
                        <View style={{flex: 1}}>
                            <View
                                style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                                <components.Text styleKind='emphaBig' containerStyle={{paddingVertical: 5}} >
                                    {aClass.kcjss + ' '
                                    + aClass.kcjc + ' '
                                    + aClass.kckssj + ' - '
                                    + aClass.kcjssj}
                                </components.Text>
                            </View>
                        </View>
                    </View>
                </components.Block>
            }
            />
                :
            <View/>
        );
    }
}

