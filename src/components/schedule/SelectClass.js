/**
 * Created by peter on 13/12/2016.
 */
import React, {Component} from 'react';
import {ScrollView, ListView, Text, View} from 'react-native';
import * as components from '../';
import logger from '../../logger';

import {COLOR} from '../../config';
import * as helpers from '../helpers';
import {TextNotice} from '../common';

export default class SelectClass extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsSelectable();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(rows);
    }

    _getRowsSelectable(props) {
        props = props || this.props;
        let {selectable} = props;

        return selectable.classes || [];
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsSelectable(nextProps);
        this.ds = this.ds.cloneWithRows(rows);
    }
    render() {
        let {sceneKey, loading, processing, error, selectable} = this.props;

        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({
                    title: helpers.yearMonthDayWeekText(selectable.date) })
                }
                renderBackButton={components.NavBarBack}
            >
                <ScrollView style={{flex: 1, paddingTop: 20, backgroundColor: COLOR.backgroundNormal}}>
                    {selectable.hasClass ?
                    <View>
                        <ListView
                            contentContainerStyle={{flexDirection: 'column', alignItems: 'center', padding: 5}}
                            dataSource={this.ds}
                            enableEmptySections={true}
                            pageSize={5}
                            initialListSize={5}
                            renderRow={(aClass) =>
                                <View>
                                    <Text> {aClass.kcmc}</Text>
                                    <Text> {aClass.kckssj}</Text>
                                    <Text> {aClass.kcjssj}</Text>
                                </View>
                            }
                                                />
                        <components.ButtonWithBg
                            text='Makeup 选课'
                            onPress={() => null}
                            textStyle={{fontSize: 16}}
                            containerStyle={{marginTop: 20}}
                        />
                        <components.ButtonWithBg
                            text='Regular 选课'
                            onPress={() => null}
                            textStyle={{fontSize: 16}}
                            containerStyle={{marginTop: 20}}
                        />
                    </View>
                        :
                    <TextNotice>今天没有可选课程</TextNotice>
                    }
                </ScrollView>
            </components.Layout>
        );
    }
}