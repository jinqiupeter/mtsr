import React, {Component} from 'react';
import {
    StyleSheet, View, Image, Text, ScrollView, Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as containers from '../containers';

import addDays from 'date-fns/add_days'

export default class Classes extends Component {
    render() {
        let {startDate, sceneKey, saveInput, submitDay, input} = this.props;
        let {account} = this.props;

        logger.debug("account in classes: ", account);

        return (
            <containers.Layout
                sceneKey={sceneKey}
                hideNavBar={true}
                hideTabBar={false}
                statusBarBgColor={COLOR.theme}
                currentTab={0}
            >
                <components.Block containerStyle={{
                    flexDirection: 'row',
                    backgroundColor: COLOR.theme,
                    paddingTop: 20,
                }}>
                    <View style={[styles.userAvatarContainer, styles.shadow]}>
                        <Image
                            style={styles.userAvatarContainer}
                            source={helpers.accountAvatarSource(account, 'middle')}
                        />
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                            <components.Text text={account.nickname} styleKind='emphaExtraBig'>
                                {account.nickname}
                            </components.Text>
                            <components.TextWithIcon
                                iconName="camera"
                                iconStyle={{color: COLOR.textLightNormal}}
                                text="扫码签到"
                                textStyle={{color: COLOR.textLightNormal}}
                                onPress={() => {
                                    Actions.QRScanner({
                                        title: '扫码签到',
                                        parentSceneKey: sceneKey,
                                        onBarCodeRead: (data) => {
                                            Alert.alert(
                                                '确定签到吗？',
                                                data,
                                                [
                                                    {text: '取消', onPress: () => {}},
                                                    {text: '确定', onPress: () => {}},
                                                ],
                                            );
                                        }
                                    })
                                }}
                            />
                        </View>

                        <View style={{justifyContent: 'center', height: 50}}>
                            <components.Text>{account.monthage || '0'}</components.Text>
                        </View>

                    </View>
                </components.Block>

                {(!account.xpybh || !account.khbh) &&
                    <View>
                        <components.TextNotice>
                            您还没有绑定学员
                        </components.TextNotice>
                        <components.ButtonWithBg
                            text='立即绑定'
                            onPress={() => Actions.AssociateXpy()}
                            textStyle={{fontSize: 16}}
                        />
                    </View>
                || input[sceneKey].selectedClassType == 1
                    ?
                    <containers.AttendedClasses/>
                    :
                    <containers.UnattendedClasses/>
                }
            </containers.Layout>
        );
    }
}

const styles = StyleSheet.create({
    userAvatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    shadow: {
        shadowColor: COLOR.backgroundDarkLighter,
        shadowOpacity: 2,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLOR.backgroundLighter,
    },
    container: {
        backgroundColor: COLOR.backgroundLighter,
    },
});
