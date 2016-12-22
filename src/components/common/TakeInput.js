/**
 * Created by peter on 22/12/2016.
 */

import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {Actions} from 'react-native-router-flux';

import * as components from '../';

export default class TakeInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        let {parentSceneKey, loading, processing, error, input,
            title, iconName, placeholder, inputKey,
            saveInput} = this.props;
        return (
            <components.Layout
                sceneKey={parentSceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title})}
                renderBackButton={components.NavBarBack}
                renderRightButton={() => components.NavBarDone({
                    onPress: () => {
                        dismissKeyboard();

                        saveInput(parentSceneKey, {[inputKey]: this.state.text.trim()});

                        Actions.pop();
                    },
                })}
            >
                <components.Form>
                    <components.FormItem iconName={iconName} containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder={placeholder}
                            returnKeyType='done'
                            defaultValue={input[parentSceneKey][inputKey]}
                            autoFocus={true}
                            onChangeText={(text) => {this.state.text = text}}
                        />
                    </components.FormItem>
                </components.Form>
            </components.Layout>
        );
    }
}
