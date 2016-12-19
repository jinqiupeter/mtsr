/**
 * Created by peter on 19/12/2016.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {default as CreateFeedback} from '../../components/about/CreateFeedback';
import * as actions from '../../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, object, account} = state;
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
        setSceneState: actions.setSceneState,
        createFeedback: actions.createFeedback,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeedback);
