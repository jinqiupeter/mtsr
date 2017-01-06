import React, {Component} from 'react';
import {
    StyleSheet, View, Image, Text, ScrollView, Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import parse from 'date-fns/parse';
import {COLOR} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as containers from '../containers';


export default class Classes extends Component {
    render() {
        let {sceneKey, input, signInClass} = this.props;
        let {account} = this.props;

        logger.debug("account in classes: ", account);

        if (!account.khbh || !account.xpybh) {
            return (
                <containers.Layout
                    sceneKey={sceneKey}
                    hideNavBar={true}
                    hideTabBar={false}
                    statusBarBgColor={COLOR.theme}
                    currentTab={0}
                >
                    <components.Block containerStyle={{
                        backgroundColor: COLOR.theme,
                        paddingTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <View style={[styles.userAvatarContainer, styles.shadow]}>
                            <Image
                                style={styles.image}
                                source={helpers.accountAvatarSource(account, 'middle')}
                            />
                        </View>

                    </components.Block>
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
                </containers.Layout>
            )
        } else {

            return (
                <containers.Layout
                    sceneKey={sceneKey}
                    hideNavBar={true}
                    hideTabBar={false}
                    statusBarBgColor={COLOR.theme}
                    currentTab={0}
                >
                    <components.Block containerStyle={{
                        backgroundColor: COLOR.theme,
                        paddingTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={[styles.userAvatarContainer, styles.shadow]}>
                            <Image
                                style={styles.image}
                                source={helpers.accountAvatarSource(account, 'middle')}
                            />
                        </View>


                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <components.Text style={{marginBottom: 10}} styleKind='emphaExtraBig'>
                                {account.realname}
                            </components.Text>
                            <Text style={{color: COLOR.textLightNormal}}> {account.nickname} </Text>
                            <Text style={{color: COLOR.textLightNormal}}>
                                {helpers.monthAgeInYears(account.monthage) + "(" + account.monthage + '月' + ")"}
                            </Text>
                        </View>
                        <View style={{marginLeft: 10, flexDirection: 'column', alignItems: 'flex-start'}}>
                            <components.TextWithIcon
                                containerStyle={{marginBottom: 15}}
                                iconName="camera"
                                iconStyle={{color: COLOR.textLightNormal}}
                                text="签到"
                                textStyle={{color: COLOR.textLightNormal, fontSize: 14}}
                                onPress={() => {
                                    Actions.QRScanner({
                                        title: '扫码签到',
                                        parentSceneKey: sceneKey,
                                        onBarCodeRead: (data) => {
                                            let classInfo = JSON.parse(data);
                                            let match = classInfo.date.match(/(\d+)-(\d+)-(\d+)/);
                                            let date = new Date(parseInt(match[1]), parseInt(match[2]) -1, parseInt(match[3]));
                                            logger.debug("get json object: ", classInfo);
                                            Alert.alert(
                                                '确定签到吗？',
                                                "日期：" + classInfo.date
                                                + "\n时间：" + classInfo.kckssj
                                                + "\n课程：" + classInfo.kcmc.toUpperCase(),
                                                [
                                                    {text: '取消', onPress: () => {}},
                                                    {text: '确定', onPress: () => {
                                                        signInClass({
                                                            kcbxxbh: classInfo.kcbxxbh,
                                                            date: moment(date).format("YYYY-MM-DD hh:mm:ss"),
                                                        })
                                                    }},
                                                ],
                                            );
                                        }
                                    })
                                }}
                            />
                            <Text style={{color: COLOR.textLightNormal}}> {'未上：' + account.classleft} </Text>
                            <Text style={{color: COLOR.textLightNormal}}> {'已上：' + account.classattended} </Text>

                        </View>

                    </components.Block>

                    {input[sceneKey].selectedClassType == 1
                        ?
                        <containers.AttendedClasses/>
                        :
                        <containers.UnattendedClasses/>
                    }
                </containers.Layout>
            );
        }
    }
}

const styles = StyleSheet.create({
    userAvatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
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
    container: {
        backgroundColor: COLOR.backgroundLighter,
    },
});
