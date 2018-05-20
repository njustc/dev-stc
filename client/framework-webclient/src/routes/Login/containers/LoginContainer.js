import {connect} from 'react-redux';
import LoginView from '../components/LoginView';
import {setLogin} from "SERVICES/Auth";
import {setSysUser} from "../../../modules/ducks/System";

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (data, callback) => setLogin(dispatch(setSysUser(data)), data, callback),
    }
};

export default connect(null, mapDispatchToProps)(LoginView);
