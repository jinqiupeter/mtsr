/**
 * Created by peter on 08/12/2016.
 */

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

export default class ActivityPoster extends Component {
    render() {
        let {sceneKey, loading, processing, error, description} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '活动详情'})}
                renderBackButton={components.NavBarBack}
            >
                <WebView
                    source={{html: description}}
                />
            </components.Layout>
        );
    }
}

