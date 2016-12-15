/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {
    StyleSheet, View, Text,
    SegmentedControlIOS, InteractionManager
} from 'react-native';

import {COLOR} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as utils from '../utils';
import * as containers from '../containers';


export default class Schedule extends Component {
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {network, sceneKey} = this.props;
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {input, getSelectable} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        let startingDate = input[sceneKey].selectedDate;
        getSelectable({
            startingDate,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {input, sceneKey, loading, processing, error,
            saveInput} = this.props;

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
                    values={['Regular选课', 'Makeup选课']}
                    selectedIndex={input[sceneKey].selectedScheduleType}
                    onChange={(event) => saveInput(sceneKey,
                        {selectedScheduleType: event.nativeEvent.selectedSegmentIndex}
                        )}
                    tintColor={COLOR.theme}
                    style={segmentStyle.segmentedControl}
                />

                {input[sceneKey].selectedScheduleType == 0 ?
                    <containers.Regular/>
                    :
                    <containers.Makeup/>
                }
            </components.Layout>
        );
    }
}

const segmentStyle = StyleSheet.create({
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
});

