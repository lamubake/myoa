var React = require('react');

var BelongTo = React.createClass({
	render: function() {
        return (
        	<div className="inline">
        		{/*proj_name panel_name*/}
                <div className="btn-group">
                    <button type="button" disabled className="btn dropdown-toggle" data-toggle="dropdown">
                        <span>{this.props.panelName.length > 10 ? this.props.panelName.slice(0,10) + '...' : this.props.panelName}</span>
                        <b className="caret"></b>
                    </button>
                </div>
        	</div>
        )
    }
});

module.exports = BelongTo
