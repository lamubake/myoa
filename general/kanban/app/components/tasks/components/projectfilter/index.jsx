var React = require('react');
var connect = require('react-redux').connect;
var ProjectFilter = require('./ProjectFilter.jsx');
import { hashHistory } from 'react-router'
import { setCurProject } from '../../../../actions/curProject'


const mapStateToProps = (state, ownProps) => {
    return {
        cur_project: ownProps.curProject,
        projects: state.projects.filter(item => item.status === "1")
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCurProject: (projId) => {
            // dispatch(setCurProject(projId))
            hashHistory.push('/projects/' + projId + '/')
        }
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectFilter);

