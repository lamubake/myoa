var React = require('react');
var $ = jQuery;

var View = React.createClass({
    calendar: null,
    propTypes: {
        data: React.PropTypes.array.isRequired,
    },
    render: function(){
        //重绘calendar上的events
        this.calendar && this.calendar.fetchEvents('','',() => {})

        return (
            <div id="calendar" className="calView" ref="calendar"></div>
        )
    },
    componentDidMount: function(){
        this.initConfig();
        //$('span.fc-button-prev').before('<span class="fc-button fc-button-folder fc-state-default fc-corner-left fc-corner-right iconfont">&#xe698;</span>'); 
        $('span.fc-button-month').before('<span class="fc-button fc-button-addtask fc-state-default fc-corner-left fc-corner-right fc-state-active">新建任务</span>'); 
    },
    componentWillUnmount: function() {
        this.calendar.destroy()
    },
    initConfig: function(){
        var self = this;
        var dateLangConfigs = {
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['日','一','二','三','四','五','六']
        };

        window.cal = this.calendar = $("#calendar").fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            monthNames: dateLangConfigs['monthNames'],
            monthNamesShort: dateLangConfigs['monthNamesShort'],
            dayNames: dateLangConfigs['dayNames'],
            dayNamesShort: dateLangConfigs['dayNamesShort'],
            buttonText: {
                prev: "<span class='fc-text-arrow'>&lsaquo;</span>",
                next: "<span class='fc-text-arrow'>&rsaquo;</span>",
                prevYear: "<span class='fc-text-arrow'>&laquo;</span>",
                nextYear: "<span class='fc-text-arrow'>&raquo;</span>",
                today: '今天',
                month: '月',
                week: '周',
                day: '日'
            },
            /*defaultView: 'month',*/
            firstDay: 1,
            allDayText: '跨天',
            defaultView: 'month',
            titleFormat: {
                month: 'yyyy年MMM月',
                week: "yyyy年MMM月d日{ '&#8212;' [ yyyy年][MMM月]d日}",
                day: 'yyyy年MMM月d日, dddd'
            },
            timeFormat: {
                agenda: 'H:mm{ – H:mm}',
                month: 'H:mm'
            },
            columnFormat: {
                month: 'ddd',
                week: 'M.d dddd',
                day: 'M/d dddd'
            },
            axisFormat: 'H',
            editable: false,
            selectable: true,
            selectHelper: true,
            unselectCancel: '.popover, .modal, .datepicker, .timepicker',
            select: function(start, end, allDay, jsEvent, view){
                var title = '',
                    $target;
                if($(jsEvent.target).is('.fc-select-helper'))
                {
                    $target = $(jsEvent.target);
                }
                else if($(this.element).find('.fc-select-helper').first().size())
                {
                    $target = $(this.element).find('.fc-select-helper').first();
                } 
                else
                {
                    $target = $(jsEvent.target);
                }
                // self.props.cbs.addTask_cb(start, end);
            },
            unselect: function(){
                
            },
            viewRender :function(){
                //clearView();
                // console.log('viewRender')
            },
            events: function(start, end, callback){

                const date = new Date(end)
                let year = date.getFullYear()
                let month = date.getMonth()

                if(year == 1970) {
                    callback(self.props.data);
                    return false
                }

                if(month == 0) {
                    month = 12
                    year = year - 1
                }

                self.props.fetch({year, month})
            },
            eventClick: function(event, jsEvent, view){
                const { tasklist_id, panel_id, taskid } = event
                self.props.toggleTaskEditModal(tasklist_id, panel_id, taskid)
            },
            eventDragStart: function(event, jsEvent, ui, view){
                //clearView();
                //console.log('eventDragStart');
            },
            eventDragStop: function(event){
                //clearView();
                //console.log('eventDragStop');
            },
            eventDrop: function(event, jsEvent, ui, view){
                //clearView();
            },
            eventResize: function(event, jsEvent, ui, view){
                // self.props.cbs.saveTask_cb(event);
            }
        }).data('fullCalendar');

    }
})

module.exports = View
