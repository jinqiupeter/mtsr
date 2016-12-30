import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import * as components from '../';
import * as containers from '../../containers';

export default class EditProfile extends Component {
    render() {
        let {sceneKey, error, ...otherProps} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '编辑资料'})}
            >
                <ScrollView>
                    <components.Profile
                        sceneKey={sceneKey}
                        error={error}
                        {...otherProps}
                    />
                </ScrollView>
            </containers.Layout>
        );
    }
}

const styles = StyleSheet.create({});
