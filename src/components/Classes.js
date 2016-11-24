/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {
    StyleSheet, View, Text,
    SegmentedControlIOS
} from 'react-native';

import {COLOR} from '../config';
import logger from '../logger';
import * as components from './';
import * as helpers from './helpers';
import * as containers from '../containers';

export default class Classes extends Component {
    render() {
        let {sceneKey, loading, processing, error, saveInput, input, object} = this.props;
        let {account} = this.props;

        let user = helpers.userFromCache(object, account.userId);
        if (!user) {
            return null;
        }

        logger.debug("showing input: ", input);

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
                renderBackButton={() => null}

            >
                <components.Block containerStyle={{flexDirection: 'row', backgroundColor: COLOR.theme, paddingTop: 20}}>
                    <components.Image
                        source={helpers.userAvatarSource(user, 'middle')}
                        style={styles.userAvatar}
                        containerStyle={{marginRight: 20}}
                    />
                    <View style={{flex: 1}}>
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
                <SegmentedControlIOS
                    values={['未上课程', '已上课程']}
                    selectedIndex={input[sceneKey].selectedClassType}
                    onChange={(event) => saveInput(sceneKey,
                        {selectedClassType: event.nativeEvent.selectedSegmentIndex}
                        )}
                    tintColor={COLOR.theme}
                    style={styles.segmentedControl}
                />

                {input[sceneKey].selectedClassType == 1 ?
                    <containers.AttendedClasses/>
                    : <View/>
                }
            </components.Layout>
        );
    }
}

const styles = StyleSheet.create({
    userAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 20,
        shadowColor: '#DFA435',
        shadowOffset: {width: 5, height: 5},
        shadowRadius: 5,
    },
    segmentedControl: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    }
});
