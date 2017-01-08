/**
 * Created by peter on 08/12/2016.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
    let {loading, processing, error, sceneKey, activities, network} = state;
    return {
        loading,
        processing,
        error,
        sceneKey,
        activityDescription: activities.activityDescription,
        network
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        enableLoading: actions.enableLoading,
        disableLoading: actions.disableLoading,
        errorFlash: actions.errorFlash,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
        setSceneState: actions.setSceneState,
        getActivityDescription: actions.getActivityDescription,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.ActivityPoster);