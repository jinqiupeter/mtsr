import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
    let {loading, processing, error, sceneState, object, network} = state;
    let {account, activities} = state;
    return {
        loading,
        processing,
        error,
        sceneState,
        object,
        network,
        account,
        activities: activities.activityIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        enableLoading: actions.enableLoading,
        disableLoading: actions.disableLoading,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
        getActivities: actions.getActivities,
        updateAttendStatus: actions.updateAttendStatus,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Activities);
