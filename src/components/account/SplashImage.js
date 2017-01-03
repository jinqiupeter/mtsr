import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import logger from '../../logger';
import * as containers from '../../containers';
import * as components from '../';
import {COLOR} from '../../config';

export default class SplashImage extends Component {
    componentWillMount() {
        let {sceneKey, setSceneState, delay} = this.props;
        setSceneState(sceneKey, {secondsToSkip: delay/1000});

        this.timerSend = setInterval(
            () => {
                let {sceneKey, sceneState, setSceneState} = this.props;
                let {secondsToSkip} = sceneState[sceneKey];
                if (secondsToSkip > 0) {
                    setSceneState(sceneKey, {secondsToSkip: secondsToSkip - 1});
                }
            },
            1000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerSend);
    }


    render() {
    let {img_url, delay = 3000, duration=2000, skip} = this.props;
    let {sceneKey, sceneState} = this.props;
    let {secondsToSkip} = sceneState[sceneKey];
    logger.debug("props in SplashImage: ", img_url);
    return (
        <containers.Layout
            sceneKey={sceneKey}
            hideStatusBar={true}
            hideNavBar={true}
            statusBarBgColor={COLOR.theme}
            containerStyle={{justifyContent: 'center',}}
        >
            <Animatable.View
                delay={delay}
                animation='fadeOut'
                duration={duration}
                style={[styles.container, ]}
            >
            <Image
                style={styles.imageContainer}
                source = {{uri: img_url}}
            >
                <components.Button
                    text={'跳过' + secondsToSkip}
                    onPress={skip}
                    containerStyle={{
                        margin: 0,
                        padding: 5,
                        backgroundColor: 'rgba(0,0,0,0)'}}
                    textStyle={{fontSize: 12}}
                />
            </Image>
            </Animatable.View>
        </containers.Layout>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});
