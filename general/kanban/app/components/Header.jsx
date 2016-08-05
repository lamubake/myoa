var React = require('react');
var Search = require('./Search.jsx');
var SearchResult = require('./SearchResult.jsx');

import { Link, IndexLink } from 'react-router';
var Header = React.createClass({
    render: function() {
        return (
            <div className="app-header clearfix">
                {/*<div className="app-search pull-right">
                                    <Search />
                                </div>
                                <div className="app-search-result preventScroll">
                                    <SearchResult />
                                </div>*/}
                <div className="app-logo pull-left">任务管理</div>
                <div className="app-nav pull-left">
                    <IndexLink to="/" className="app-nav-item" activeStyle={{color:'#18b4ed'}}>项目</IndexLink>
                    <Link to="/mytask/" className="app-nav-item" activeStyle={{color:'#18b4ed'}}>我的</Link>
                    <Link to="/calendar/" className="app-nav-item" activeStyle={{color:'#18b4ed'}}>日历</Link>
                    {/*
                    <a href="javascript:;" className="app-nav-item">动态</a>
                    */}
                </div>
            </div>
        )
    }
});

module.exports = Header;