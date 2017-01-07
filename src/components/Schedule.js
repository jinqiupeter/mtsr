import React, {Component} from 'react';
import {
    StyleSheet, ScrollView, Text, View,
    SegmentedControlIOS, InteractionManager, Platform
} from 'react-native';

import {COLOR} from '../config';
import * as components from './';
import * as containers from '../containers';

export default class Schedule extends Component {
    render() {
        let {input, sceneKey, account
            } = this.props;

        if (!account.khbh || !account.xpybh) {
            return (
                <components.NoXpyAssociated
                    sceneKey={sceneKey}
                    currentTab={1}
                    title={'选课'}
                />
            )
        } else {
            return (
                <containers.Layout
                    sceneKey={sceneKey}
                    hideNavBar={false}
                    hideTabBar={false}
                    statusBarBgColor={COLOR.theme}
                    currentTab={1}
                    renderBackButton={() => null}
                    renderTitle={() => components.NavBarTitle({title: '选课'})}
                >
                    {input[sceneKey].selectedScheduleType == 0 ?
                        <containers.Regular/>
                        :
                        <containers.Makeup/>
                    }
                </containers.Layout>
            );
        }
    }
}


