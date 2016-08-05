var React = require('react');

var SearchResult = React.createClass({
    render: function() {
        return (
            <div className="search-result-list">
               <div className="search-section">
               		<div className="search-type">任务</div>
               		<ul className="search-feed">
               			<li className="search-item"><a href="javascript:;">任务1</a></li>
               			<li className="search-item"><a href="javascript:;">任务2</a></li>
                        <li className="search-item"><a href="javascript:;">任务3</a></li>
                        <li className="search-item"><a href="javascript:;">任务4</a></li>
               		</ul>
               </div>
               <div className="search-section">
               		<div className="search-type">项目</div>
               		<ul className="search-feed">
               			<li className="search-item"><a href="javascript:;">项目1</a></li>
                        <li className="search-item"><a href="javascript:;">项目2</a></li>
                        <li className="search-item"><a href="javascript:;">项目3</a></li>
               		</ul>
               </div>
            </div>
        )
    }
});

module.exports = SearchResult;