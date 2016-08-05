require('./selectuser.css');
var React = require('react');
var connect = require('react-redux').connect;

var SelectUser = require('./SelectUser.jsx');

const mapStateToProps = (state) => {
    return {
        userselect: state.userselect
    }
}

module.exports = connect(mapStateToProps)(SelectUser)