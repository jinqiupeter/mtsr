import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, object, network} = state;
    let {account} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        account,
        network,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveInput: actions.saveInput,
        submitDay: actions.changeStartDay,
        setSceneState: actions.setSceneState,
        changeMonth: actions.changeMonth,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Schedule);
