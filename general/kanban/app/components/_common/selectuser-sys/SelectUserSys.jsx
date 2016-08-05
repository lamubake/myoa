var React = require('react');

var SelectUserSys = React.createClass({
    render: function() {
        const { isCreator, to_id } = this.props
        return (
            <div className="selectuser">
            	<input id={this.props.module_id} type="hidden" name={this.props.to_id} value={this.props.defaultuserid} />
                <textarea name={this.props.to_name} readOnly defaultValue={this.props.defaultusername}></textarea>
                {!isCreator && to_id === 'manager' ? null : <a onClick={this.addUser}><span className="iconfont selectuser-add">&#xe68e;</span>添加</a>}
                {!isCreator && to_id === 'manager' ? null : <a onClick={this.clearUser}><span className="iconfont selectuser-clear">&#xe63c;</span>清空</a>}
			</div>
        )
    },
    addUser: function(){
    	var module_id = 'kanban', 
	        to_id = this.props.to_id, 
	        to_name = this.props.to_name, 
	        manage_flag ="", 
        	form_name = "",
            use_uid = 1;
        window.org_select_callbacks = window.org_select_callbacks || {};
        
        window.org_select_callbacks.add = function(item_id, item_name){
            //console.log(item_id, item_name);                    
        };
        window.org_select_callbacks.remove = function(item_id, item_name){
            //console.log(item_id);                    
        };                
        window.org_select_callbacks.clear = function(){                    
                          
        };
        var URL="/module/user_select/?FUNC_ID=&MODULE_ID="+module_id+"&TO_ID="+to_id+"&TO_NAME="+to_name+"&MANAGE_FLAG="+manage_flag+"&FORM_NAME="+form_name+"&USE_UID=" + use_uid;

		if(window.showModalDialog){
	     	window.showModalDialog(URL, window ,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:"+450+"px;dialogHeight:"+350+"px;dialogTop:"+300+"px;dialogLeft:"+600+"px",true);
	  	}else{
	  		window.open(URL,"load_dialog_win","height="+350+",width="+450+",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+300+",left="+600+",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no",true);
	  	}
        //SelectUser('9', module_id, to_id, to_name, manage_flag, form_name);
        return false;
    },
    clearUser: function(){
    	ClearUser(this.props.to_id, this.props.to_name)
    }
});

module.exports = SelectUserSys