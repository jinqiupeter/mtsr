/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, object} = state;
    let {account} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveInput: actions.saveInput,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Classes);
