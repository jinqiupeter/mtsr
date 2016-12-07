/**
 * Created by peter on 07/12/2016.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView
} from 'react-native';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';

let static_html = '<p>课后指南测试22</p> <p>2<img alt="" height="1136" src="http://139.224.64.6:9080/CRM/images/imageUploader/bc32546a-56ab-4720-b29c-1ad213efe3be.png" width="640" /></p>';
export default class AfterClassInstruction extends Component {
    render() {
        let {sceneKey, loading, processing, error} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '课后指南'})}
                renderBackButton={components.NavBarCancel}
            >
                <WebView
                    source={{html: static_html}}
                >
                </WebView>
            </components.Layout>
        );
    }
}

let smallImageSize = Math.floor((SCREEN_WIDTH - 30) / 3);
let middleImageSize = Math.floor((SCREEN_WIDTH - 25) / 2);
let largeImageSize = (SCREEN_WIDTH - 20);

const styles = StyleSheet.create({
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    postText: {
        marginTop: 5,
        lineHeight: 16,
    },
    postImages: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallImage: {
        width: smallImageSize,
        height: smallImageSize,
    },
    middleImage: {
        width: middleImageSize,
        height: middleImageSize,
    },
    largeImage: {
        width: largeImageSize,
        height: largeImageSize * 9 / 16,
    },
});

