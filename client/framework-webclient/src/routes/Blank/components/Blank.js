import React, {Component, PropTypes} from 'react';

import {setModules,setSysUser} from "../../../modules/ducks/System";

import './Blank.scss';
import {connect} from "react-redux";

class BlankComponent extends Component {
	constructor(props) {
		super(props);
	}

    static propTypes = {
        SetUser: PropTypes.func.isRequired,
        SetModules: PropTypes.func.isRequired
    };

	componentWillMount() {
		const curUserString = sessionStorage.getItem('sysUser');
		const curModulesString = sessionStorage.getItem('sysModules');
		const curUser = JSON.parse(curUserString);
		const curModules = JSON.parse(curModulesString);
		if(curUserString && curUserString !== 'null' && curModules && curModulesString !== 'null'){
            this.props.SetUser(curUser);
            this.props.SetModules(curModules);
		    this.props.router.replace('/index');
		}
		else {
			this.props.router.replace('/login');
		}
	}

	render() {
		const curUser = sessionStorage.getItem('sysUser');
		const curModules = sessionStorage.getItem('sysModules');
		console.log(curUser);
		console.log(curModules);
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
		SetModules: (modules) => dispatch(setModules(modules))
	}
}

export default connect(null, mapDispatchToProps)(BlankComponent);
