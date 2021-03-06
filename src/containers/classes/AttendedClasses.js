/**
 * Created by peter on 25/11/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';
import {default as Attended} from '../../components/classes/AttendedClasses'
function mapStateToProps(state) {
    let {loading, processing, error, classes, network, object} = state;
    return {
        loading,
        processing,
        error,
        sceneKey: 'AttendedClasses',
        network,
        attendedClasses: classes.attendedClasses,
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
        saveInput: actions.saveInput,
        getAttendedClasses: actions.attendedClasses,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attended);