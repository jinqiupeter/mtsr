import React, {Component} from 'react';
import {Provider,} from 'react-redux';

import {createPersistStore} from './store';
import ZQCApp from './ZQCApp';
import * as actions from './actions';
import * as apis from './apis';
import logger from './logger';

export const store = createPersistStore(
    (store) => store.dispatch(actions.setStore({isReady: true})),
    (error) => logger.error(error),
);

export default function setup() {
    class Root extends Component {
        render() {
            return (
                <Provider store={store}>
                    <ZQCApp />
                </Provider>
            );
        }
    }
    return Root;
}
