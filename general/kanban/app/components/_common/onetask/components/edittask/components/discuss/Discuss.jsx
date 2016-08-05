var React = require('react');

var DiscussList = require('./components/DiscussList.jsx');
var DiscussForm = require('./components/DiscussForm.jsx');

var Discuss = React.createClass({
    render: function() {
    	return (
            <div className="discuss">
                <DiscussList data={this.props.data} />
                <DiscussForm save_cb={this.save} />
            </div>
    	)
    },
    save: function(content){
        this.props.cbs.saveDiscuss_cb(content);
    }
});

module.exports = Discuss;