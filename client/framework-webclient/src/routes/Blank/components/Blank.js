import React, {Component, PropTypes} from 'react';

import {setAuthData, setSiderData, setSysUser} from "../../../modules/ducks/System";

import './Blank.scss';
import {connect} from "react-redux";

class BlankComponent extends Component {
	constructor(props) {
		super(props);
	}

    static propTypes = {
        SetUser: PropTypes.func.isRequired,
        SetAuthData: PropTypes.func.isRequired,
        SetSider: PropTypes.func.isRequired
    };

	componentWillMount() {
		const curUserString = sessionStorage.getItem('sysUser');
		const curAuthDataString = sessionStorage.getItem('authData');
		const curSiderString = sessionStorage.getItem('sider');
		const curUser = JSON.parse(curUserString);
		const curAuthData = JSON.parse(curAuthDataString);
		const curSider = JSON.parse(curSiderString);
		if(curUserString && curUserString !== 'null' && curAuthData && curAuthDataString !== 'null'){
            this.props.SetUser(curUser);
            this.props.SetAuthData(curAuthData);
            this.props.SetSider(curSider);
		    this.props.router.replace('/index');
		}
		else {
			this.props.router.replace('/login');
		}
	}

	render() {
		// const curUser = sessionStorage.getItem('sysUser');
		// const curAuthData = sessionStorage.getItem('authData');
		// console.log(curUser);
		// console.log(curAuthData);
		return(
			<div className="blank">
				{ this.props.children }
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		SetUser: (sysUser) => dispatch(setSysUser(sysUser)),
		SetAuthData: (authData) => dispatch(setAuthData((authData))),
        SetSider: (sider) => dispatch(setSiderData(sider))
	}
}

export default connect(null, mapDispatchToProps)(BlankComponent);
