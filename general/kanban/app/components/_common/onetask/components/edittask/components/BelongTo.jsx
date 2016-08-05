var React = require('react');
var connect = require('react-redux').connect;

// var ProjectDropdown = require('./ProjectDropdown.jsx');
var PanelDropdown = require('./PanelDropdown.jsx');

var BelongTo = React.createClass({

	render: function() {
        const { panelId, panels, forbid } = this.props
        return (
        	<div>
        		{/*<ProjectDropdown current={this.state.current} items={this.props.projectData} cb={this.selectProjCallback} />*/}
				<PanelDropdown forbid={forbid} panelId={panelId} panels={panels} cb={this.selectPanelCallback} />
        	</div>
        )
    },
    selectProjCallback: function(current){
    	//console.log('当前选中的项目id是',current);
    	// var panels = [];
     //    this.props.panelData.map(function(item, i){
     //        if(item.belongto == current){
     //            panels.push(item);
     //        }
     //    });
     //   	//console.log('选中后的项目的第一个组id',panels[0].panel);
     //    var currentPanel = panels[0].panel_id;
    	// this.setState({
    	// 	current: current,
    	// 	currentPanel: currentPanel
    	// });
    	// this.editCallback(current, currentPanel);
    },
    selectPanelCallback: function(id,name){
    	//console.log('当前选中的面板id是',currentPanel);
    	// this.setState({currentPanel: currentPanel});
    	this.editCallback(id,name);
    },
    editCallback: function(id, name){
    	this.props.cb && this.props.cb(id, name);
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        panels: state.panels[ownProps.tasklistId]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(BelongTo)
