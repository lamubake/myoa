var React = require('react');

var FilefolderBannerContainer = require('./components/banner/index.jsx');
var ListContainer = require('./components/list/index.jsx');
var MoveToContainer = require('./components/moveto/index.jsx');

var Filefolder = React.createClass({
	render: function() {
		return (
			<div className="filefolder app-main-container">
				<FilefolderBannerContainer />
				<ListContainer />
				<MoveToContainer />
			</div>
		);
	}
});

module.exports = Filefolder;