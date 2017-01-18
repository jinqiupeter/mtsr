import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
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
    changePassword: actions.changePassword,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.EditProfilePassword);
