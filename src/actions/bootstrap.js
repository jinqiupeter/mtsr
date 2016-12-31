import {Alert, Keyboard, NetInfo, Platform, PushNotificationIOS} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import {LC_CONFIG} from '../config';
import AV from 'leancloud-storage';
import LcInstallation from 'leancloud-installation';

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

            booted = true;
        }

        dispatch(actions.processingTask('正在检测网络'));
        utils.waitingFor({
            condition: () => {
                let {store, network} = getState();
                return (store.isReady && network.isConnected !== undefined);
            },
            cbOk: () => {
                dispatch(actions.processingTask(''));
                login(dispatch, getState);
            },
            cbFail: () => {
                dispatch(actions.processingTask(''));
                let {store, network} = getState();
                let errors = [];
                if (!store.isReady) {
                    errors.push('访问本地存储失败。');
                }
                if (network.isConnected === undefined) {
                    errors.push('获取网络状态失败。');
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

export function registerPush() {
    return (dispatch, getState) => {
        logger.debug("adding event listener: .......",);

        // Subscribe to register event of PushNotificationIOS.
        PushNotificationIOS.addEventListener('register', (deviceToken) => {
            let {account, object} = getState();
            if (object.users[account.userId]
                && object.users[account.userId].deviceid == deviceToken) {
                return;
            }

            AV.init({appId: LC_CONFIG.id, appKey: LC_CONFIG.key});
            let installation = LcInstallation(AV);

            // create a new Installation in leancloud
            logger.debug("saving deviceToken: ", deviceToken);
            installation.getCurrent()
                .then(aInstall => {
                    logger.debug("saving ainstallation: ", aInstall);
                    aInstall.save({
                        deviceToken: deviceToken
                    })
                }).then(() => {
                    // upload deviceToken to server so we can have conditional push
                    apis.editAccount({deviceToken})
                        .catch((error) => {
                            Alert.alert(
                                '更新推送信息出错',
                                error,
                                [{
                                    text: '忽略',
                                    onPress: null,
                                }]
                            );
                        });
            });

        });

        PushNotificationIOS.addEventListener('registrationError', (error) => {
            logger.debug("failed to register push: ", error);
            Alert.alert(
                '启用推送失败',
                `Error (${error.code}): ${error.message}`,
                [{
                    text: '忽略',
                    onPress: null,
                }]
            );
        });

        PushNotificationIOS.addEventListener('notification', (notification) => {
            dispatch(actions.notify(notification.getMessage()));
        });

        // Request permissions and deviceToken
        PushNotificationIOS.requestPermissions()
            .catch((error) => {
                dispatch(actions.errorFlash(error.message));
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
                            Actions.AssociateXpy();
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
