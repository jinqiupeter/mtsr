import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR, NAV_BAR_HEIGHT, TAB_BAR_HEIGHT} from '../../config';
import * as components from '../';
import logger from '../../logger';
export default class Layout extends Component {
    componentDidMount() {
        let {
            hideNavBar = false, navigationBarStyle, renderTitle, renderBackButton,
            renderRightButton
        } = this.props;
        navigationBarStyle = navigationBarStyle ? [styles.navBar, navigationBarStyle] : styles.navBar;
        renderBackButton = renderBackButton || components.NavBarBack;
        Actions.refresh({
            hideNavBar, navigationBarStyle, renderTitle,
            renderBackButton, renderRightButton
        });
    }

    render() {
        let {sceneKey, loading, processing, error, notification, children, containerStyle} = this.props;
        let {
            statusBarBgColor, hideStatusBar = false, statusBarStyle, hideNavBar = false, hideTabBar = true,
            currentTab, refresh
        } = this.props;
        let paddingTop = (hideNavBar ? 0 : NAV_BAR_HEIGHT);
        let paddingBottom = (hideTabBar ? 0 : TAB_BAR_HEIGHT);

        return (
            <View style={[styles.container, {paddingTop, paddingBottom}, containerStyle]}>
                <components.StatusBar hidden={hideStatusBar} barStyle={statusBarStyle}
                    backgroundColor={statusBarBgColor || 'transparent'}/>
                {notification ? <components.Notification notification={notification}/> : null}
                {processing ? <components.Processing processing={processing}/> : null}
                {error && sceneKey ? <components.ErrorInput sceneKey={sceneKey} error={error.input}/> : null}
                {children}
                {loading ? <components.Loading loading={loading}/> : null}
                {error ? <components.ErrorFlash error={error.flash}/> : null}
                {hideTabBar ? null : <components.TabBar currentTab={currentTab} refresh={refresh}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundNormal,
    },
    navBar: {
        backgroundColor: COLOR.theme,
        borderBottomWidth: 0,
    },
    tabBar: {
        backgroundColor: COLOR.backgroundDarker
    },
});
