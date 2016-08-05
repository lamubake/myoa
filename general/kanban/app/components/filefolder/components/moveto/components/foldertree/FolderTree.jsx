var React = require('react');

var FolderTree = React.createClass({
    render: function() {
        return (
            <div id="foldertree"></div>
        )
    },
    componentDidMount: function(){
        var data = this.props.data;
        var tree = $("#foldertree").dynatree({
            title: 'moveTo',//树的名字
            selectMode: 1,//1单选2不关联复选3关联复选
            children: data,
            classNames: {
                container: "dynatree-container",
                node: "dynatree-node",
                folder: "dynatree-folder",

                empty: "dynatree-empty",
                vline: "dynatree-vline",
                expander: "dynatree-expander",
                connector: "dynatree-connector",
                nodeIcon: "dynatree-icon",
                title: "dynatree-title",
                nodeError: "dynatree-statusnode-error",
                nodeWait: "dynatree-statusnode-wait",
                combinedExpanderPrefix: "dynatree-exp-",
                combinedIconPrefix: "dynatree-ico-",
                hasChildren: "dynatree-has-children",
                active: "dynatree-active",
                selected: "dynatree-selected",
                expanded: "dynatree-expanded",
                lazy: "dynatree-lazy",
                focused: "dynatree-focused",
                partsel: "dynatree-partsel",
                lastsib: "dynatree-lastsib"
            }
        });
        this.tree = tree;
    },
    componentWillUnmount: function(){
        this.tree = null;
    }
});

module.exports = FolderTree; 