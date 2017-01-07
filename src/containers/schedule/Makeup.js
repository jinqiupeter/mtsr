/**
 * Created by peter on 14/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import {default as Makeup} from '../../components/schedule/Makeup'
function mapStateToProps(state) {
    let {error, network, account, loading, object, schedule, input} = state;
    return {
        error,
        object,
        network,
        loading,
        account,
        input,
        eventDates: schedule.selectableDays,
        selectedDate: input['Schedule'].selectedDate,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        enableLoading: actions.enableLoading,
        disableLoading: actions.disableLoading,
        errorFlash: actions.errorFlash,
        setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
        setSceneState: actions.setSceneState,
        changeMonth: actions.changeMonth,
        saveInput: actions.saveInput,
        getSelectable: actions.selectableClasses,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Makeup);