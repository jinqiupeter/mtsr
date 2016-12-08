/**
 * Created by peter on 08/12/2016.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import logger from '../../logger';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';

export default class Activity extends Component {
    render() {
        let {activity, containerStyle} = this.props;
        logger.debug("rendering activity: ", activity);
        return (
            <components.Block containerStyle={containerStyle}>
                <components.BlockItem
                    leftText={activity.title + ' '
                        + '容纳人数：' + activity.maxparticipants
                    }
                    rightText={
                       activity.ondate + ' '
                      + activity.starttime
                    }
                    rightIcon='angle-right'
                    onPress={() => Actions.ActivityPoster({
                        ...activity
                    })}
                    containerStyle={{borderTopWidth: 1}}
                />
            </components.Block>
        );
    }
}

