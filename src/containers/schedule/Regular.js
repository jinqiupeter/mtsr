/**
 * Created by peter on 14/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import {default as Regular} from '../../components/schedule/Regular';
function mapStateToProps(state) {
    let {input, error, network, object, schedule} = state;
    return {
        error,
        network,
        object,
        selectedDate: input['Schedule'].selectedDate,
        packedSelectableClasses: schedule.packedSelectableClasses,
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Regular);