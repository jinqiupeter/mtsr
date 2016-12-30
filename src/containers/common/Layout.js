/**
 * Created by peter on 30/12/2016.
 */
import {connect} from 'react-redux';

import * as components from '../../components';
function mapStateToProps(state) {
    let {loading, processing, error, notification} = state;
    return {
        loading,
        processing,
        error,
        notification,
    };
}

export default connect(mapStateToProps)(components.Layout);