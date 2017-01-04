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

            </containers.Layout>
        );
    }
}