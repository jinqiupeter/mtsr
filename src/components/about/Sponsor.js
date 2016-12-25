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

export default class Sponsor extends Component {
    componentWillMount() {
        this.refreshing = false;
    }

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
        let {getSponsor} = props;

        setSceneLastRefreshTime({sceneKey});

        let finished = 0;
        getSponsor({
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, processing, error, object, sponsorIds,
            disableLoading, enableLoading} = this.props;

        logger.debug("props in Sponsor: ", this.props);
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '优惠商家列表'})}
                renderBackButton={components.NavBarBack}
                containerStyle={{flex: 1}}
            >
                <ScrollView
                    {...this.props}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'space-between'}}
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
                        蒙特索利会员在以下合作商家享受优惠！
                    </TextNotice>
                    {sponsorIds.length > 0
                        ? sponsorIds.map((id) => {
                            let sponsor = helpers.sponsorFromCache(object, id);
                            let website = sponsor.website.match(/^http(s?):\/\//i)
                                ? sponsor.website
                                : 'http://' + sponsor.website;
                            return (
                                <components.Block
                                    key={id}
                                    containerStyle={{borderTopWidth: 1, borderColor: COLOR.linePrompt,}}
                                    onPress={()=>Actions.Web({
                                        sceneKey, loading, processing, error,
                                        uri: website,
                                        title: sponsor.name,
                                    })}
                                >
                                    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}} >
                                    <View>
                                        <TextNotice style={{fontSize: 18, color: COLOR.theme}}>{sponsor.name}</TextNotice>
                                        <components.TextWithIcon
                                            iconName="location-arrow"
                                            iconStyle={{color: COLOR.theme}}
                                            text={sponsor.address}
                                        />
                                        <components.TextWithIcon
                                            iconName="phone"
                                            iconStyle={{color: COLOR.theme}}
                                            text={sponsor.phone}
                                        />

                                        <TextNotice style={{flex: 1}}> {sponsor.description} </TextNotice>
                                    </View>
                                    <Icon name="angle-right" style={{
                                        marginLeft: 5,
                                        fontSize: 16,
                                        color: COLOR.textNormal,
                                    }}/>
                                    </View>
                                </components.Block>
                            )
                        })
                        :
                        <TextNotice>
                            {loading.loadingCount > 0 ? "加载中" : '列表为空'}
                        </TextNotice>
                    }
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