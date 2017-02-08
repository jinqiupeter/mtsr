/**
 * Created by peter on 24/12/2016.
 */
import React, {Component} from 'react';
import {
    WebView
} from 'react-native';
import * as components from '../';
import * as containers from '../../containers';
import logger from '../../logger';

export default class Web extends Component {
    render() {
        let {sceneKey, stackHtml, uri, title} = this.props;
        return (
            <containers.Layout
                sceneKey={sceneKey}
                renderTitle={() => components.NavBarTitle({title})}
                renderBackButton={components.NavBarBack}
            >
                <WebView
                    startInLoadingState={true}
                    source={ uri ? {uri} : {html: stackHtml}}
                />
            </containers.Layout>
        );
    }
}

