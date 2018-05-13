import {connect} from 'react-redux';
import LoginView from '../components/LoginView';

export default (store) => {
	return connect(null, null)(LoginView);
}