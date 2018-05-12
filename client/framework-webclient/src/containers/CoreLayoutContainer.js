import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'

const mapStateToProps = (state) => (
{
  	modules: state.System.modules,
  	sysUser: state.System.sysUser,
});

export default (store) =>
{	
	return connect(mapStateToProps, null)(CoreLayout);
}
