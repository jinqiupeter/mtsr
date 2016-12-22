/**
 * Created by peter on 19/12/2016.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, object, account} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveInput: actions.saveInput,
        setSceneState: actions.setSceneState,
        createReferral: actions.createReferral,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.CreateReferral);
