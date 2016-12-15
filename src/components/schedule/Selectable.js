/**
 * Created by peter on 13/12/2016.
 */
import React, {Component} from 'react';
import {ListView, View} from 'react-native';
import {TextNotice} from '../common';
import logger from '../../logger';

export default class Selectable extends Component {
    componentWillMount() {
        this.refreshing = false;
        let rows = this._getRowsSelectable();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
            r1.id != r2.id
        }).cloneWithRows(rows);
    }

    _getRowsSelectable(props) {
        props = props || this.props;
        let {classes} = props;

        let rows =  (classes || []).sort((a, b) => {
            // sort by kckssj, from morning to afternoon
            let matchA = a.kckssj.match(/(\d+):(\d+)/);
            let matchB = b.kckssj.match(/(\d+):(\d+)/);

            if (matchA[1] > matchB[1]) {
                return 1;
            } else if (matchA[1] == matchB) {
                // compare minutes if hours are equal
                return matchA[2] > matchB[2]
                    ?   1
                    : matchA[2] == matchB[2]
                    ?  0
                    :  -1;
            } else {
                return -1;
            }
        });

        return rows;
    }

    componentWillReceiveProps(nextProps) {
        let rows = this._getRowsSelectable(nextProps)
        this.ds = this.ds.cloneWithRows(rows);
    }
    render() {
        return (
            <ListView

                dataSource={this.ds}
                enableEmptySections={true}
                pageSize={5}
                initialListSize={5}
                renderRow={(aClass) =>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <TextNotice> {aClass.kcmc}</TextNotice>
                        <TextNotice> {aClass.kckssj}</TextNotice>
                        <TextNotice> {aClass.kcjssj}</TextNotice>
                        <TextNotice> {aClass.kcjss}</TextNotice>
                    </View>
                }
            />
        );
    }
}