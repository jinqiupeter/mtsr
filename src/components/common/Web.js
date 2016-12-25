/**
 * Created by peter on 24/12/2016.
 */
import React, {Component} from 'react';
import {
    WebView
} from 'react-native';
import * as components from '../';
import logger from '../../logger';

export default class Web extends Component {
    render() {
        let {sceneKey, loading, processing, error, stackHtml, uri, title} = this.props;
        logger.debug("props in Web: ", this.props);
        return (
            <components.Layout
                sceneKey={sceneKey}
                loading={loading}
                processing={processing}
                error={error}
                renderTitle={() => components.NavBarTitle({title})}
                renderBackButton={components.NavBarBack}
            >
                <WebView
                    startInLoadingState={true}
                    source={ uri ? {uri} : {html: stackHtml}}
                />
            </components.Layout>
        );
    }
}

