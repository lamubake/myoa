var React = require('react');

var Single = require('./components/single/');
var Multi = require('./components/multi');

var Selector = React.createClass({
	render: function() {
		const { mode } = this.props.userselect
		return (
			<div className="seluser-container">
				{
					mode === 'single' ? 
					<Single userselect={this.props.userselect} /> : 
					<Multi userselect={this.props.userselect} />
				}
			</div>
		)
	},
    componentDidMount: function() {
    	this.calcPos()
    },
    calcPos: function() {

    	const event = this.props.userselect.event || {}
    	const { clientX, clientY } = event
    	const W = $(window).width()
    	const H = $(window).height()
    	const $el = $('.seluser-container')
    	const delX = W - clientX
    	const delY = H - clientY
    	let pos = {top: clientY+15, left: clientX+15}

    	if(delX <= $el.outerWidth() + 15) {
    		pos.left = clientX - ($el.outerWidth() + 15)
    	}
    	if(delY <= $el.outerHeight() + 15) {
    		pos.top = clientY - ($el.outerHeight() + 15)
    	}

    	$el.css(pos)
    }
})

var SelectUser = React.createClass({

    render: function() {
    	const { status } = this.props.userselect
        return status === 'show' ? <Selector userselect={this.props.userselect} /> : null
    }
    /*calcPos: function(){
        var self = this,
            //$target = $(e.currentTarget);
            $target = $(this.props.event.currentTarget);
        this.$target = $target;
        var $tip = $('.seluser-container'),
            pos = this.getPosition();

        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        
        var gravity = this.autoNS() + this.autoWE();

        var tp;
        switch (gravity.charAt(0)) {
            case 'n':
                tp = {top: pos.top + pos.height + 5, left: pos.left + pos.width / 2 - actualWidth / 2};
                break;
            case 's':
                tp = {top: pos.top - actualHeight - 5, left: pos.left + pos.width / 2 - actualWidth / 2};
                break;
            case 'e':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - 5};
                break;
            case 'w':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + 5};
                break;
        }
        
        if (gravity.length == 2) {
            if (gravity.charAt(1) == 'w') {
                tp.left = pos.left + pos.width / 2 - 23;
            } else {
                tp.left = pos.left + pos.width / 2 - actualWidth + 23;
            }
        }
        $tip.css(tp);
    },
    autoNS: function(){
        return this.$target.offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    },
    autoWE: function(){
        return this.$target.offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    },
    getPosition: function () {
        var el = this.$target[0];
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
            width: el.offsetWidth, 
            height: el.offsetHeight
        }, this.$target.offset())
    }*/
});

module.exports = SelectUser;