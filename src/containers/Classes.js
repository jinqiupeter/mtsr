/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, classes, object} = state;
    let {account} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        account,
        startDate: classes.startDate,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveInput: actions.saveInput,
        setSceneState: actions.setSceneState,
        signInClass: actions.signInClass,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Classes);
