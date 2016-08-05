var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
// var HTML5Backend = require('react-dnd-html5-backend');
var HTML5Backend;
var Banner = require('./components/Banner.jsx');
var TaskList = require('./components/tasklist');

// ie8下解析模块报错，放到try-catch中来静默失败
try {
    HTML5Backend = require('react-dnd-html5-backend')
} catch(e) {
    HTML5Backend = null
}


var Tasks = React.createClass({
    componentDidMount: function() {
        this.props.fetchTasklists(this.props.curProject)
    },
    componentWillReceiveProps: function(nextProp) {
        this.props.fetchTasklists(nextProp.curProject)
    },
    render: function() {
        const { curProject, tasklistId, toggleTaskAddModal } = this.props
        return (
            <div className="task-container tasks app-main-container">  
                <Banner curProject={curProject} tasklistId={tasklistId} toggleTaskAddModal={toggleTaskAddModal} />
                <TaskList projectId={curProject} />
            </div>
        )
    }
});


//only notes in tasks module can be drag around.
//module.exports = DragDropContext(HTML5Backend)(Tasks);
// module.exports = Tasks



module.exports = (() => {
    if(window.isIE) {
        return Tasks
    } else {
        return DragDropContext(HTML5Backend)(Tasks)
    }
})()

