/**
 * Created by peter on 07/12/2016.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager
} from 'react-native';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import {TextNotice} from '../common';
import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import logger from '../../logger';

export default class AfterClassInstruction extends Component {
    componentDidMount() {
        //InteractionManager.runAfterInteractions(() => {
            this._refresh();
        //});
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {sceneKey} = props;
        let {getAfterClassInstruction, kcbxxbh, skqkrq, kckssj, kcjssj} = props;
        logger.debug("props in after class instruction: ", props);

        let finished = 0;
        getAfterClassInstruction({
            kcbxxbh,
            skqkrq,
            kckssj,
            kcjssj,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, processing, error, instruction} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '课后指南'})}
                renderBackButton={components.NavBarBack}
            >
                {instruction.hasInstruction ?
                <WebView
                    source={{html: instruction.instruction}}
                >
                </WebView>
                    :
                <TextNotice>
                    {loading.loadingCount > 0 ? "加载中" : '老师还没有发布课后指南哦！'}
                </TextNotice>
                }
            </components.Layout>
        );
    }
}

