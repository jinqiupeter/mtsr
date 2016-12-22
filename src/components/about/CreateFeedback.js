/**
 * Created by peter on 19/12/2016.
 */
import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {Actions} from 'react-native-router-flux';

import * as components from '../';
import {SCREEN_HEIGHT} from '../../config';

export default class CreateFeedback extends Component {
    render() {
        let {sceneKey, loading, processing, error, input, saveInput, createFeedback, cbOk} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '提交留言'})}
                renderBackButton={components.NavBarCancel}
            >
                <components.Form>
                    <components.FormItem containerStyle={{borderTopWidth: 0}}>
                        <components.TextInput
                            placeholder='在此输入留言'
                            returnKeyType='done'
                            onSubmitEditing={() => dismissKeyboard()}
                            defaultValue={input[sceneKey].feedback}
                            autoFocus={true}
                            onChangeText={(text) => saveInput(sceneKey, {feedback: text.trim()})}
                            multiline={true}
                            style={{height: SCREEN_HEIGHT/2}}
                            blurOnSubmit={true}
                        />
                    </components.FormItem>
                </components.Form>
                <components.ButtonWithBg
                    text='提交'
                    disabled={!input[sceneKey].validity}
                    onPress={() => {
                        dismissKeyboard();
                        createFeedback(sceneKey, () => {
                            Actions.pop();
                            if(cbOk) {
                                cbOk();
                            }
                        });
                    }}
                    textStyle={{fontSize: 16, alignItems: 'stretch'}}
                />
            </components.Layout>
        );
    }
}