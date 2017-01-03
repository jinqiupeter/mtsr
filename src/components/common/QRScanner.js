/**
 * Created by peter on 22/12/2016.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';

import * as components from '../';
import * as containers from '../../containers';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';

export default class QRScanner extends Component {
    constructor() {
        super();
        this.qrFound = false;
    }

    render() {
        let {parentSceneKey,
            title,
            onBarCodeRead} = this.props;
        return (
            <containers.Layout
                sceneKey={parentSceneKey}
                renderTitle={() => components.NavBarTitle({title})}
                renderBackButton={components.NavBarBack}
            >
                <View style={styles.container}>
                    <Camera
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        onBarCodeRead={(e) => {
                            if (!this.qrFound) {
                                onBarCodeRead(e.data);
                                Actions.pop();
                                this.qrFound = true;
                            }
                        }}
                    />
                </View>
            </containers.Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
});