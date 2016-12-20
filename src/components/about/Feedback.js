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
import {Actions} from 'react-native-router-flux';

export default class Feedback extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsFeedback();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(rows);
    }

    _getRowsFeedback(props) {
        props = props || this.props;
        let {feedbackIds, object} = props;

        let rows = feedbackIds
            .map((v) => helpers.feedBackFromCache(object, v))
            .filter((v) => v!=null);
        return rows;
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsFeedback(nextProps)
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
        let {getFeedback} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getFeedback({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {network, sceneKey, loading, processing, error, feedbackIds,
            disableLoading, enableLoading, getFeedback} = this.props;

        logger.debug("props in Feedback: ", this.props);
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '留言反馈'})}
                renderBackButton={components.NavBarBack}
                renderRightButton={() => components.NavBarRightButton({
                    text: '留言',
                    onPress: () => Actions.CreateFeedback({cbOk: () => this._refresh()})
                })}
                containerStyle={{flex: 1}}
            >
                <ScrollView
                    {...this.props}
                    contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between'}}
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
                    <TextNotice
                    >
                        蒙特梭利非常重视家长的反馈，您对我们有任何的建议和意见都可以在此留言，我们会及时回复。留言只有校长能查看。
                    </TextNotice>
                {feedbackIds.length > 0
                    ? <ListView
                        dataSource={this.ds}
                        enableEmptySections={true}
                        pageSize={5}
                        initialListSize={5}
                        renderRow={(feedback) =>
                            <components.Block containerStyle={{borderTopWidth: 1, borderColor: COLOR.linePrompt,}}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='comments' style={style.icon}/>
                                <Text style={{flex: 1, color: COLOR.theme}}>
                                    {'问题: ' + feedback.question}
                                </Text>
                            </View>

                            <TextNotice>{feedback.answered ? '校长回答: ' + feedback.answer : '(还没有回复)'}</TextNotice>
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
                            if (network.isConnected && feedbackIds.length > 0) {
                                getFeedback({
                                    offset: feedbackIds.length,
                                });
                            }
                        }}
                    />
                    :
                    <TextNotice>
                        {loading.loadingCount > 0 ? "加载中" : '您还没有反馈过问题！'}
                    </TextNotice>

                }

                <components.ButtonWithBg
                    text='给校长留言'
                    onPress={() => Actions.CreateFeedback({cbOk: () => this._refresh()})}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />
                </ScrollView>
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