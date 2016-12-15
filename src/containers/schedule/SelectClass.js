/**
 * Created by peter on 13/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';
import {default as SelectClass} from '../../components/schedule/SelectClass'
function mapStateToProps(state) {
    let {loading, processing, error, network, object, sceneKey} = state;
    return {
        loading,
        processing,
        error,
        sceneKey,
        network,
        object,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        enableLoading: actions.enableLoading,
        disableLoading: actions.disableLoading,
        errorFlash: actions.errorFlash,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
        setSceneState: actions.setSceneState,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectClass);