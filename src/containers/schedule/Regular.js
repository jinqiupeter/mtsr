/**
 * Created by peter on 14/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import {default as Regular} from '../../components/schedule/Regular';
function mapStateToProps(state) {
    let {input, error, loading, network, object, schedule, account} = state;
    return {
        error,
        network,
        object,
        account,
        input,
        loading,
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
        getSelectable: actions.selectableClasses,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Regular);