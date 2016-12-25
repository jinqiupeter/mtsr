import React, {Component} from 'react';
import {
    WebView
} from 'react-native';
import * as components from '../';

export default class ActivityPoster extends Component {
    render() {
        let {sceneKey, loading, processing, error, description} = this.props;
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title: '活动详情'})}
                renderBackButton={components.NavBarBack}
            >
                <WebView
                    source={{html: description}}
                />
            </components.Layout>
        );
    }
}

