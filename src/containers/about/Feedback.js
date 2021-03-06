/**
 * Created by peter on 16/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import {default as Feedback} from '../../components/about/Feedback'
function mapStateToProps(state) {
    let {error, loading, processing, network, object, about, sceneKey} = state;
    return {
        error,
        object,
        processing,
        network,
        loading,
        feedbackIds: about.feedbackIds,
        sceneKey,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        enableLoading: actions.enableLoading,
        disableLoading: actions.disableLoading,
        errorFlash: actions.errorFlash,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
        setSceneState: actions.setSceneState,
        getFeedback: actions.getFeedback,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);