import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {sceneState} = state;
  return {
    sceneState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSceneState: actions.setSceneState
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.SplashImage);
