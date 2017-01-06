/**
 * Created by peter on 06/01/2017.
 */
import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as containers from '../../containers';
import {COLOR} from '../../config';
import * as components from '../';

export default ({sceneKey, currentTab, title}) => {
    return(
    <containers.Layout
        sceneKey={sceneKey}
        hideNavBar={false}
        hideTabBar={false}
        statusBarBgColor={COLOR.theme}
        renderBackButton={()=> null}
        currentTab={currentTab}
        renderTitle={() => components.NavBarTitle({title})}
    >
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <components.TextNotice>
                您还没有绑定学员
            </components.TextNotice>
            <components.ButtonWithBg
                text='立即绑定'
                onPress={() => Actions.AssociateXpy()}
                textStyle={{fontSize: 16}}
            />
        </View>
    </containers.Layout>
    )
}