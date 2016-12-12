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
        let {startDate, sceneKey, loading, processing, error, saveInput, submitDay, input, object} = this.props;
        let {account, setSceneState, sceneState} = this.props;

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
                <SegmentedControlIOS
                    values={['未上课程', '已上课程']}
                    tintColor={COLOR.theme}
                    style={styles.segmentedControl}
                />

                <Calendar
                    scrollEnabled={true}              // False disables swiping. Default: False
                    showControls={false}               // False hides prev/next buttons. Default: False
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    monthNames={customMonthNames}                // Defaults to english names of months
                    prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
                    nextButtonText={'Next'}           // Text for next button. Default: 'Next'
                    onDateSelect={(date) => saveInput(sceneKey, {startDate: date})} // Callback after date selection
                    customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
                    weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                />

            </components.Layout>
        );
    }
}

const styles = StyleSheet.create({
    userAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 20,
        shadowColor: '#DFA435',
        shadowOffset: {width: 5, height: 5},
        shadowRadius: 5,
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOR.backgroundDarker,
    },
});
