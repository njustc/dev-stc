import React, {Component, PropTypes} from 'react';

import {setAuthData, setFileData, setMenuData, setSiderData, setSysUser} from "../../../modules/ducks/System";

import './Blank.scss';
import {connect} from "react-redux";

/**
 * @module Blank
 */
/**
 * 空白页面组件，用于页面跳转控制
 * @extends Component
 */
class BlankComponent extends Component {
	constructor(props) {
		super(props);
	}

    static propTypes = {
        SetUser: PropTypes.func.isRequired,
        SetAuthData: PropTypes.func.isRequired,
        SetSider: PropTypes.func.isRequired,
        SetMenu: PropTypes.func.isRequired,
    };

    /**
	 * 组件渲染之前执行，如果sessionStorage存在系统用户登录信息则跳转到主页面，否则跳转到登录页面
	 * @function
     */
	componentWillMount() {
		const curUserString = sessionStorage.getItem('sysUser');
		const curAuthDataString = sessionStorage.getItem('authData');
		const curSiderString = sessionStorage.getItem('sider');
		const curMenuString = sessionStorage.getItem('menu');
		const curFileString = sessionStorage.getItem('file');
		const curUser = JSON.parse(curUserString);
		const curAuthData = JSON.parse(curAuthDataString);
		const curSider = JSON.parse(curSiderString);
		const curMenu = JSON.parse(curMenuString);
		const curFile = JSON.parse(curFileString);
		if(curUserString && curUserString !== 'null' && curAuthData && curAuthDataString !== 'null'){
            this.props.SetUser(curUser);
            this.props.SetAuthData(curAuthData);
            this.props.SetSider(curSider);
            this.props.SetMenu(curMenu);
            this.props.SetFile(curFile);
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

/**
 * 把登录信息设置相关的dispatch方法分发给BlankComponent
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{SetUser: (function(*=): *), SetAuthData: (function(*): *), SetSider: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
	return {
		SetUser: (sysUser) => dispatch(setSysUser(sysUser)),
		SetAuthData: (authData) => dispatch(setAuthData((authData))),
        SetSider: (sider) => dispatch(setSiderData(sider)),
        SetMenu: (menu) => dispatch(setMenuData(menu)),
		SetFile: (file) => dispatch(setFileData(file)),
	}
};

export default connect(null, mapDispatchToProps)(BlankComponent);
