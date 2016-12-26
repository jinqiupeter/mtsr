import React, {Component} from 'react';
import {
    StyleSheet, View, Image, Text,
    SegmentedControlIOS
} from 'react-native';

import {COLOR} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as containers from '../containers';

import addDays from 'date-fns/add_days'

export default class Classes extends Component {
    render() {
        let {startDate, sceneKey, loading, processing, error, saveInput, submitDay, input, object} = this.props;
        let {account, setSceneState, sceneState} = this.props;

        logger.debug("props in Classes: ", this.props);

        let user = helpers.userFromCache(object, account.userId);
        if (!user) {
            return null;
        }

        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
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
                            source={helpers.userAvatarSource(user, 'middle')}
                        />
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                            <components.Text text={user.nickname} styleKind='emphaExtraBig'>
                                {user.nickname}
                            </components.Text>
                        </View>

                        <View style={{justifyContent: 'center', height: 50}}>
                            <components.Text>{user.monthage || '0'}</components.Text>
                        </View>
                    </View>
                </components.Block>
                <View
                    style={styles.container}
                >
                <SegmentedControlIOS
                    values={['未上课程', '已上课程']}
                    selectedIndex={input[sceneKey].selectedClassType}
                    onChange={(event) => saveInput(sceneKey,
                        {selectedClassType: event.nativeEvent.selectedSegmentIndex}
                        )}
                    tintColor={COLOR.theme}
                    style={styles.segmentedControl}
                />
                </View>

                {input[sceneKey].selectedClassType == 0 ?
                    <View style={styles.titleContainer}>
                        <components.Button
                            text='今天'
                            onPress={() => {
                                saveInput(sceneKey, {startDate: new Date()});
                                submitDay(sceneKey);
                            }}
                            containerStyle={{margin: 5, padding: 5}}
                            textStyle={{fontSize: 12}}
                        />
                        <components.Button
                            text='下周'
                            onPress={() => {
                                saveInput(sceneKey, {startDate: addDays(startDate, 7)});
                                submitDay(sceneKey);
                            }}
                            containerStyle={{margin: 5, padding: 5}}
                            textStyle={{fontSize: 12}}
                        />
                        <components.Button
                            text='下个月'
                            onPress={() => {
                                saveInput(sceneKey, {startDate: addDays(startDate, 30)});
                                submitDay(sceneKey);
                            }}
                            containerStyle={{margin: 5, padding: 5}}
                            textStyle={{fontSize: 12}}
                        />
                        {/*<components.Button*/}
                            {/*text='选择'*/}
                            {/*onPress={() => {*/}
                                {/*setSceneState(sceneKey, {calendarPickerVisible: true})*/}
                            {/*}}*/}
                            {/*containerStyle={{margin: 5, padding: 5}}*/}
                            {/*textStyle={{fontSize: 12}}*/}
                        {/*/>*/}
                        {/*<components.CalendarPicker*/}
                            {/*visible={sceneState[sceneKey].calendarPickerVisible}*/}
                            {/*setVisible={(visible) => setSceneState(sceneKey, {calendarPickerVisible: visible})}*/}
                            {/*selectedDate={input[sceneKey].startDate}*/}
                            {/*onValueChange={(selectedDate) => {*/}
                                {/*saveInput(sceneKey, {startDate: selectedDate});*/}

                            {/*}}*/}
                            {/*submit={(selectedDate) => {*/}
                                {/*saveInput(sceneKey, {startDate: selectedDate});*/}
                                {/*submitDay(sceneKey);*/}
                            {/*}}*/}
                        {/*/>*/}
                    </View>
                    :
                    <View/>
                }


                {input[sceneKey].selectedClassType == 1 ?
                    <containers.AttendedClasses/>
                    :
                    <containers.UnattendedClasses/>
                }
            </components.Layout>
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
        shadowColor: COLOR.shadowHighlight,
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
