import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {loading, processing, error} = state;
  return {
    loading,
    processing,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.PreLogin);
