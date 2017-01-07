/**
 * Created by peter on 07/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager
} from 'react-native';
import * as helpers from '../helpers';
import * as utils from '../../utils';
import {TextNotice} from '../common';
import * as containers from '../../containers';
import * as components from '../';
import logger from '../../logger';

export default class ClassDescription extends Component {
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._refresh();
        });
    }

    _refresh({props, cbFinish}={}) {
        props = props || this.props;
        let {getClassDescription, kcbxxbh} = props;
        logger.debug("props in ClassDescription: ", props);

        let finished = 0;
        getClassDescription({
            kcbxxbh,
            cbFinish: () => finished++,
        });
        utils.waitingFor({
            condition: () => finished == 1,
            cbFinish,
        });
    }

    render() {
        let {sceneKey, loading, classDescription} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '课程介绍'})}
                renderBackButton={components.NavBarBack}
            >
                {!!classDescription ?
                    <WebView
                        source={{html: classDescription}}
                    >
                    </WebView>
                    :
                    <TextNotice style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        {loading.loadingCount > 0 ? "加载中" : '暂无课程介绍！'}
                    </TextNotice>
                }
            </containers.Layout>
        );
    }
}

