/**
 * 在球场
 * zaiqiuchang.com
 */

import {Alert, Keyboard, NetInfo, Platform} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import AMapLocation from 'react-native-amap-location';

import {DEBUG, HOT_CITIES, SPORTS} from '../config';
import logger from '../logger';
import * as apis from '../apis';
import * as utils from '../utils';
import * as actions from './';

export const RESET = 'reset';

export function reset() {
    return {
        type: RESET,
    };
}

let booted = false;

export function bootstrap() {
    return (dispatch, getState) => {
        if (!booted) {
            if (Platform.OS != 'ios') {
                NetInfo.isConnected.fetch().then((isConnected) => dispatch(actions.setNetwork({isConnected})));
            }
            NetInfo.isConnected.addEventListener(
                'change',
                (isConnected) => {
                    let {network} = getState();
                    dispatch(actions.setNetwork({isConnected}));
                    if (network.isConnected === true && !isConnected) {
                        dispatch(actions.errorFlash('网络不可用。'));
                    } else if (network.isConnected === false && isConnected) {
                        dispatch(actions.errorFlash('网络已恢复。'));
                    }
                },
            );

            let getPositionSuccess = (position) => dispatch(actions.setLocationPosition(position));
            let getPositionError = (error) => logger.warn(error);
            let getPositionOptions = {
                enableHighAccuracy: Platform.OS == 'ios',
                timeout: 5000,
                maximumAge: 600000,
            };
            if (Platform.OS == 'android') {
                AMapLocation.addEventListener((position) => {
                    if (position.latitude && position.longitude) {
                        getPositionSuccess({
                            coords: {
                                latitude: position.latitude,
                                longitude: position.longitude,
                                altitude: 0,
                            },
                            timestamp: new Date().getTime(),
                        });
                    } else {
                        getPositionError(position);
                    }
                });
                AMapLocation.startLocation({
                    interval: 5000,
                    httpTimeOut: 5000,
                });
            } else {
                navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
                navigator.geolocation.watchPosition(getPositionSuccess, getPositionError, getPositionOptions);
            }

            let keyboardShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
                dispatch(actions.setKeyboard({coords: event.endCoordinates}));
            });
            let keyboardHideListener = Keyboard.addListener('keyboardDidHide', (event) => {
                dispatch(actions.resetKeyboard());
            });

            booted = true;
        }

        dispatch(actions.processingTask('正在检测网络和位置'));
        utils.waitingFor({
            condition: () => {
                let {location, store, network} = getState();
                return (store.isReady && network.isConnected !== undefined
                && location.position);
            },
            cbOk: () => {
                dispatch(actions.processingTask(''));
                login(dispatch, getState);
            },
            cbFail: () => {
                dispatch(actions.processingTask(''));
                let {location, store, network} = getState();
                let errors = [];
                if (!store.isReady) {
                    errors.push('访问本地存储失败。');
                }
                if (network.isConnected === undefined) {
                    errors.push('获取网络状态失败。');
                }
                if (!location.position) {
                    errors.push('获取位置失败。');
                }
                if (errors.length > 0) {
                    Alert.alert(
                        '检测网络和位置出错',
                        errors.join(''),
                        [
                            {text: '重试', onPress: () => dispatch(bootstrap())},
                        ],
                    );
                } else if (!network.isConnected) {
                    Alert.alert(
                        '网络不可用',
                        '请打开WIFI或移动网络后重试。',
                        [
                            {text: '重试', onPress: () => {
                                dispatch(bootstrap());
                            }},
                        ],
                    );
                }
            },
            maxTimes: 5,
        });
    };
}

function login(dispatch, getState) {
    var {account, object} = getState();
    let cbFail = (error) => {
        Alert.alert(
            '启动出错',
            error.message,
            [
                {text: '重试', onPress: () => dispatch(bootstrap())},
                {text: '清缓存', onPress: () => {
                    dispatch(reset());
                    dispatch(bootstrap());
                }},
            ],
        );
    };
    logger.debug("who state at login: ", account, object);
    let username = object.users[account.userId] ? object.users[account.userId].user : '';
    apis.isLoggedin({username: username})
        .then((response) => {
            logger.debug("isLoggedIn response: ", response);
            let {data: {user}} = response;
            if (user) {
                dispatch(actions.login({
                    user,
                    cbOk: () => {
                        if (user.nickname && user.profileImageUrl && user.gender) {
                            Actions.Classes();
                        } else {
                            Actions.RegisterProfile();
                        }
                    },
                    cbFail,
                }));
            } else {
                Actions.PreLogin();
            }
        })
        .catch((error) => {
            dispatch(actions.errorFlash(error.message));
            cbFail(error);
        });
}
