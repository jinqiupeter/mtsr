/**
 * Created by peter on 16/12/2016.
 */
import React, {Component} from 'react';
import {ListView, View, InteractionManager,
    RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {TextNotice, TextWithIcon} from '../common';
import logger from '../../logger';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import * as components from '../';
import {COLOR} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FAQ extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsFaq();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(rows);
    }

    _getRowsFaq(props) {
        props = props || this.props;
        let {faqIds, object} = props;

        let rows = faqIds
            .map((v) => helpers.faqFromCache(object, v))
            .filter((v) => v!=null);
        logger.debug("shows faqs: ", rows);
        return rows;
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsFaq(nextProps)
        this.ds = this.ds.cloneWithRows(rows);
    }

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
        let {getFaq} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getFaq({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {network, sceneKey, loading, processing, error, faqIds,
            disableLoading, enableLoading, getFaq} = this.props;

        logger.debug("props in FAQ: ", this.props);
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '常见问题'})}
                renderBackButton={components.NavBarBack}
            >
                {faqIds.length > 0
                    ? <ListView
                        dataSource={this.ds}
                        enableEmptySections={true}
                        pageSize={5}
                        initialListSize={5}
                        renderRow={(faq) =>
                            <components.Block containerStyle={{borderTopWidth: 1, borderColor: COLOR.linePrompt,}}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='question-circle' style={style.icon}/>
                                <Text style={{flex: 1, color: COLOR.theme}}>
                                    {'问题: ' + faq.question}
                                </Text>
                            </View>

                            <TextNotice>{'回答: ' + faq.answer}</TextNotice>
                            </components.Block>
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
                            if (network.isConnected && faqIds.length > 0) {
                                getFaq({
                                    offset: faqIds.length,
                                });
                            }
                        }}
                    />
                    :
                    <ScrollView
                        {...this.props}
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
                    >
                        <TextNotice>
                            {loading.loadingCount > 0 ? "加载中" : '没有常见问题哦！'}
                        </TextNotice>
                    </ScrollView>
                }
            </components.Layout>
        );
    }
}

const style = StyleSheet.create({
    icon: {
        marginRight: 5,
        fontSize: 16,
        color: COLOR.theme,
    },
});