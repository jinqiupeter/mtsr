/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
    let {
        loading, processing, error, input, sceneState, object,
        network
    } = state;
    let {account} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        network,
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        disableLoading: actions.disableLoading,
        enableLoading: actions.enableLoading,
        errorFlash: actions.errorFlash,
        logoutRequest: actions.logoutRequest,
        clearCache: actions.clearCache,
        disassociateXpy: actions.disassociateXpy,
        editProfileAvatarSubmit: actions.editProfileAvatarSubmit,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Me);
