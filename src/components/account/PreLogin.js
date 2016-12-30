import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as components from '../';
import * as containers from '../../containers';

export default ({sceneKey}) => {
    return (
        <containers.Layout
            sceneKey={sceneKey}
            hideStatusBar={true}
            hideNavBar={true}
            containerStyle={{justifyContent: 'center'}}
        >
            <components.Image
                source={require('zaiqiuchang/res/img/mtsr_icon.png')}
                style={{alignSelf: 'center', borderRadius: 15}}
            />
            <components.Button
                text='登录'
                onPress={() => Actions.Login()}
                containerStyle={{marginTop: 100}}
                textStyle={{fontSize: 18}}
            />
            <components.Button
                text='注册'
                onPress={() => Actions.RegisterMobile()}
                containerStyle={{marginTop: 30}}
                textStyle={{fontSize: 18}}
            />
        </containers.Layout>
    );
}

const styles = StyleSheet.create({});
