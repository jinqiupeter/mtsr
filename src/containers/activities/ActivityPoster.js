/**
 * Created by peter on 08/12/2016.
 */
import {connect} from 'react-redux';

import {default as ActivityPoster} from '../../components/activities/ActivityPoster'
function mapStateToProps(state) {
    let {loading, processing, error, sceneKey} = state;
    return {
        loading,
        processing,
        error,
        sceneKey,
    };
}

export default connect(mapStateToProps)(ActivityPoster);