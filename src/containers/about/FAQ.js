/**
 * Created by peter on 16/12/2016.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import {default as FAQ} from '../../components/about/FAQ'
function mapStateToProps(state) {
    let {error, loading, processing, network, object, about, sceneKey} = state;
    return {
        error,
        object,
        processing,
        network,
        loading,
        faqIds: about.faqIds,
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
        getFaq: actions.getFqa,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);