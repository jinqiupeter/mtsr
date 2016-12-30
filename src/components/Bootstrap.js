import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {COLOR} from '../config';
import * as components from './';
import * as containers from '../containers';

export default class Bootstrap extends Component {
    componentDidMount() {
        let {isReset = false, reset, bootstrap} = this.props;
        if (isReset) {
            reset();
        }
        bootstrap();
    }

    render() {
        let {sceneKey} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                hideStatusBar={true}
                hideNavBar={true}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <components.Image
                        source={require('zaiqiuchang/res/img/mtsr_icon_middle.png')}
                        style={{borderRadius: 30}}
                    />
                </View>
            </containers.Layout>
        );
    }
}