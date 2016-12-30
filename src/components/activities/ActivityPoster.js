import React, {Component} from 'react';
import {
    WebView
} from 'react-native';
import * as components from '../';
import * as containers from '../../containers';

export default class ActivityPoster extends Component {
    render() {
        let {sceneKey, description} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title: '活动详情'})}
                renderBackButton={components.NavBarBack}
            >
                <WebView
                    source={{html: description}}
                />
            </containers.Layout>
        );
    }
}

