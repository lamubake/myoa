var React = require('react');

var DatePicker = require('./../../../../../../../../../_common/datepicker/Datepicker.jsx');//截止日期

var ItemEndTime = React.createClass({
    render: function() {
        return (
            <DatePicker datefmt="date" datevalue={this.props.data} />
        )
    }
});


module.exports = ItemEndTime;