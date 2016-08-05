var React = require('react');

var Filter = require('./components/Filter.jsx');
var View = require('./components/View.jsx');

var Calender = React.createClass({
    render: function() {
        
        return (
            <div className="calendar app-main-container">  
                <Filter data={this.props.projectData} setCalendarFilter={this.props.setCalendarFilter} />
                <View 
                    data={this.props.data} 
                    fetch={this.props.fetchCalendarTasks} 
                    toggleTaskEditModal={this.props.toggleTaskEditModal} />
            </div>
        )
    },
    componentDidMount: function(){
    	$('.fc-button-folder').click(function(){
    		$('.calendar').toggleClass('isfilter')
    		$(window).resize();
    	})
    },
    componentWillUpdate: function(nextProps) {
        const cTasks = nextProps.data
        const { fetchTasklists, fetchPanels, fetchTasks } = nextProps
        cTasks.forEach(item => {
            fetchTasklists(item.proj_id)
            fetchPanels(item.tasklist_id, item.proj_id)
            fetchTasks(item.panel_id, item.tasklist_id)
        })
    }
})

module.exports = Calender
