import React from 'react';
import {StyleSheet, View, Picker, Modal} from 'react-native';
import Calendar from 'react-native-calendar';

import {COLOR, customDayHeadings, customMonthNames} from '../../config';
import * as components from '../';

export default ({visible, selectedDate, setVisible, onShow, submit, cancel, onValueChange}) => {
    if (cancel === undefined) {
        cancel = () => setVisible(false);
    }
    return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
            onShow={onShow}
            onRequestClose={() => null}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <components.Text onPress={cancel} style={styles.title}>取消</components.Text>
                    <components.Text style={styles.title}>{selectedDate}</components.Text>
                    <components.Text onPress={submit} style={styles.title}>完成</components.Text>
                </View>
                <Calendar
                    scrollEnabled={true}              // False disables swiping. Default: False
                    showControls={false}               // False hides prev/next buttons. Default: False
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    monthNames={customMonthNames}                // Defaults to english names of months
                    prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
                    nextButtonText={'Next'}           // Text for next button. Default: 'Next'
                    onDateSelect={onValueChange} // Callback after date selection
                    customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
                    weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                    />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOR.backgroundDarker,
    },
    title: {
        padding: 10,
        fontSize: 14,
        color: COLOR.textEmpha,
    },
    picker: {
        backgroundColor: COLOR.backgroundLighter,
    },
});
