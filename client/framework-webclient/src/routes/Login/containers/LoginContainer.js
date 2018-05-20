import {connect} from 'react-redux';
import LoginView from '../components/LoginView';
import {setLogin} from "SERVICES/Auth";

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (data, callback) => setLogin(dispatch, data, callback),
    }
};

export default connect(null, mapDispatchToProps)(LoginView);
