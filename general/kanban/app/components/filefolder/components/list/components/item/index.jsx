var React = require('react');

var Item = require('./Item.jsx');

var ItemContainer = React.createClass({
	getInitialState: function() {
        return {
            isRename: false//该文件是否处于重命名状态
        };
    },
    render: function() {
        return (
            <Item {...this.props} isRename={this.state.isRename} />
        )
    },
    componentDidMount: function(){
        var self = this;
        // setTimeout(function(){
        //     self.setState({
        //         isRename: true
        //     });
        // },3000);
    }
});

module.exports = ItemContainer; 