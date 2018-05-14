import React, {Component, PropTypes} from 'react';

import {getStore} from 'STORE/globalStore';
import {setModules} from 'modules/ducks/System';

import './Blank.scss';

export default class Blank extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const curUser = sessionStorage.getItem('sysUser');
		if(curUser){
		    this.props.router.replace('/index');
        }
        else {
            this.props.router.replace('/login');
        }
	}

	render() {
		return(
            <div className="blank">
				{ this.props.children }
			</div>
		);
	}
}