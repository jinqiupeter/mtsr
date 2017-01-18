import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

import {COLOR, TAB_BAR_HEIGHT} from '../../config';

export default ({currentTab, refresh}) => {
    let tabs = [
        {
            icon: 'graduation-cap',
            title: '进度',
            onPress: () => {
                if (currentTab == 0 && refresh) {
                    refresh();
                } else {
                    Actions.Classes();
                }
            },
        },
        {
            icon: 'calendar',
            title: '选课',
            onPress: () => {
                if (currentTab == 1 && refresh) {
                    refresh();
                } else {
                    Actions.Schedule();
                }
            },
        },
        {
            icon: 'futbol-o',
            title: '活动',
            onPress: () => {
                if (currentTab == 2 && refresh) {
                    refresh();
                } else {
                    Actions.Activities();
                }
            },
        },
        {
            icon: 'user',
            title: '更多',
            onPress: () => {
                if (currentTab == 3 && refresh) {
                    refresh();
                } else {
                    Actions.Me();
                }
            },
        },
    ];
    return (
        <View style={styles.container}>
            {tabs.map((v, i) =>
                <TouchableOpacity key={i} onPress={v.onPress} style={styles.tabContainer}>
                    <Icon name={v.icon} style={[styles.icon, i == currentTab ? styles.selected : null]}/>
                    <Text style={[styles.title, i == currentTab ? styles.selected : null]}>{v.title}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: TAB_BAR_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLOR.backgroundDarker,
    },
    tabContainer: {
        width: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        color: COLOR.textPrompt,
    },
    icon: {
        fontSize: 24,
        color: COLOR.textPrompt,
        bottom: 3,
    },
    selected: {
        color: COLOR.theme,
    }
});
