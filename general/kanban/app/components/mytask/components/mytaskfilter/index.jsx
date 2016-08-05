var React = require('react');
var connect = require('react-redux').connect;
var MyTaskFilter = require('./MyTaskFilter.jsx');

import { setMyTaskFilter } from '../../../../actions/myTaskFilter'

const mapDispatchToProps = (dispatch) => {
	return {
		setMyTaskFilter: (filter) => {
			dispatch(setMyTaskFilter(filter))
		}
	}
}

module.exports = connect(null,mapDispatchToProps)(MyTaskFilter);