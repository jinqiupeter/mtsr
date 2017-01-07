import React from 'react';
import {StyleSheet, Platform, View, Text, StatusBar} from 'react-native';
import logger from '../../logger';

export default ({hidden = false, barStyle, backgroundColor}) => {
    return (
        <StatusBar
            hidden={hidden}
            animated={true}
            backgroundColor={backgroundColor || 'transparent'}
            translucent={true}
            barStyle={barStyle || 'light-content'}
        />
    );
}

const styles = StyleSheet.create({});
