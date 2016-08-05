var React = require('react');
var Item = require('./Item.jsx');

var cb = {
	changeToEdit: function(){
		console.log('文字状态变成编辑状态');
	}
}

var ItemContainer = React.createClass({
	render: function() {
		return (
			<Item {...this.props} cb={cb} />
		);
	}
});

module.exports = ItemContainer;