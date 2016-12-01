/**
 * Created by peter on 24/11/2016.
 */

import React , {Component} from 'react';
import {StyleSheet, View, Platform, ListView, ScrollView, RefreshControl, InteractionManager} from 'react-native';

import UnattendedClass from './UnattendedClass';
import {TextNotice} from '../common';
import * as helpers from '../helpers';
import logger from '../../logger';
import * as utils from '../../utils';

export default class UnattendedClasses extends Component {
    componentWillMount() {
        this.refreshing = false;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(this._getRowsUnattendedClass());
    }

    _getRowsUnattendedClass(props) {
        props = props || this.props;
        let {object} = props;
        let {unattendedClasses} = props;
        logger.debug("props in components/UnattendedClasses: ", props, object);
        let rows = unattendedClasses.map((v) => helpers.unattendClassFromCache(object, v))
                .filter((v) => v !== null);

        logger.debug("unattended classes found:", rows);
        return rows;
    }

    componentWillReceiveProps(nextProps) {
        this.ds = this.ds.cloneWithRows(this._getRowsUnattendedClass(nextProps));
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let {sceneKey, network} = this.props;
            if (network.isConnected && helpers.isNeedRefresh({sceneKey, network})) {
                this._refresh();
            }
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey, setSceneLastRefreshTime} = props;
        let {getUnattendedClasses} = props;

        setSceneLastRefreshTime({sceneKey});

            let finished = 0;
        getUnattendedClasses({
                cbFinish: () => finished++,
            });
        utils.waitingFor({
                condition: () => finished == 1,
                cbFinish,
            });
    }

    render () {
        let {account, unattendedClasses, network, enableLoading, disableLoading, errorFlash, getUnattendedClasses} = this.props;

        logger.debug("props in unattendedClasses: ", this.props, this.ds);
        if (unattendedClasses.length > 0) {
            return (
                <ListView
                    dataSource={this.ds}
                    enableEmptySections={true}
                    initialListSize={5}
                    pageSize={5}
                    renderRow={(aClass) =>
                        <UnattendedClass
                            account={account}
                            aClass={aClass}
                            errorFlash={errorFlash}
                            containerStyle={styles.class}
                        />
                    }
                    renderScrollComponent={(props) =>
                        <ScrollView
                            {...props}
                            refreshControl={
                            <RefreshControl
                               refreshing={this.refreshing}
                                onRefresh={() => {
                                    disableLoading();
                                    this.refreshing = true;
                                    this._refresh({
                                        cbFinish: () => {
                                            this.refreshing = false;
                                            enableLoading();
                                        },
                                    });
                                }}
                            />
                          }
                        />
                    }
                    onEndReached={() => {
                        if (network.isConnected && unattendedClasses.length > 0) {
                            getUnattendedClasses({
                                offset: unattendedClasses.length - 1,
                            });
                        }
                    }}
                    />
            )
        } else {
            return (
                <TextNotice>
                    小朋友还没有选课哦！
                </TextNotice>
            )
        }
    }
}

const styles = StyleSheet.create({
    class: {
        marginBottom: 5,
    },
});
