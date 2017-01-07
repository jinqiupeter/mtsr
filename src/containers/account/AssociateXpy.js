import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
    let {loading, processing, error, input, sceneState, object, account, associate} = state;
    return {
        loading,
        processing,
        error,
        input,
        sceneState,
        object,
        account,
        associate,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveInput: actions.saveInput,
        setSceneState: actions.setSceneState,
        searchXpy: actions.searchXpy,
        associateXpy: actions.associateXpy,
        editProfileAvatarSubmit: actions.editProfileAvatarSubmit,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.AssociateXpy);
