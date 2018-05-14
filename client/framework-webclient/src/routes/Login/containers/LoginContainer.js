import {connect} from 'react-redux';
import LoginView from '../components/LoginView';
import {setSysUser,setModules} from "../../../modules/ducks/System";

const mapDispatchToProps = (dispatch) => {
    return {
        SetSysUser: (values) => dispatch(setSysUser(values)),
        SetModules: (values) => dispatch(setModules(values))
    }
};

export default connect(null, mapDispatchToProps)(LoginView);
