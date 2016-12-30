/**
 * Created by peter on 22/12/2016.
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

import * as components from '../';
import * as containers from '../../containers';
import {COLOR} from '../../config';

export default class DatePick extends Component {
    constructor (props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    render() {
        let {parentSceneKey,
            title, selectedDate, inputKey,
            saveInput} = this.props;
        return (
            <containers.Layout
                sceneKey={parentSceneKey}
                renderTitle={() => components.NavBarTitle({title})}
                renderBackButton={components.NavBarBack}
                renderRightButton={() => components.NavBarDone({
                    onPress: () => {
                        dismissKeyboard();

                        saveInput(parentSceneKey, {[inputKey]: this.state.date});

                        Actions.pop();
                    },
                })}
            >
                <DatePicker
                    style={styles.picker}
                    date={selectedDate}
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="2000-05-01"
                    maxDate="2026-06-01"
                    onDateChange={(date) => {
                        this.state.date = date;
                    }}
                />
            </containers.Layout>
        );
    }
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