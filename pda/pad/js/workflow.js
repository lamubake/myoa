// 

//主办工作
function editWorkFlow()
{
	tiScroll_2.getMainData({
		url: 'workflow/edit.php',
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
		cache : false,
		onSuccess: function(data){
			fileReadPage = 2;
			g_pre_page = 2;
			if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            delete_flow();			
			}else{
				$(tiScroll_2.getOIScroll().scroller).html(data);
				$('.container .read_detail:last', tiScroll_2.getElement()).addClass("endline");
				tiScroll_2.show();
				pageInit(2);
			}
			return false;
		}
	});
	
/*    $.ajax({
      type: 'GET',
      url: 'edit.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
      beforeSend: function(){
         $.ProMainLoading.show();
      },
      success: function(data)
      {
         fileReadPage = 2;
         pre_page = 2;
         $.ProMainLoading.hide();
         if(data == "NOEDITPRIV"){
            //showMessage(noeditpriv);
            //return;
            showPageMessage(noeditpriv);
            delete_flow();
            return;
         }else{
            $("#page_2 > #wrapper_2 > #scroller_2").empty().append(data);
            $("#page_2").show('fast',function(){
               pageInit(2);
               $("#page_2 .container .read_detail:last").addClass("endline");
            });
            $("#header div[id^='header_']").hide();
            $("#header_2").show();
         }
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage(getfature);
      }
   }); */
}

//获取表单界面内容
function getflowContent()
{
   $.ajax({
      type: 'GET',
      url: 'workflow/form.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data)
      {
         g_pre_page = 3;
         fileReadPage = 3;
         $.ProMainLoading.hide();
         if(data == "NOREADFLOWPRIV"){
            //showMessage(noreadflowpriv);
            //return;
            showPageMessage(noreadflowpriv);
            delete_flow();
				return false;
         }else{
            $("#mainContentPage_3 #contentScroller_3").empty().append(data);
            $("#mainContentPage_3").show('fast',function(){
               pageInit(3);
               $("#mainContentPage_3 .container .read_detail:last").addClass("endline");
            });
            $("#mainheader_2").hide();
            $("#mainheader_3").show();
         }
			return false;
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage(getfature);
      }
   });
}

//获取原始表单内容
function showOriginalForm()
{
	tiScroll_9.getMainData({
		url: 'workflow/original_form.php',
		data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag},
		cache : false,
		onSuccess: function(data){
			g_pre_page = 9;
			fileReadPage = 9;
			if(data == "NOREADFLOWPRIV"){
				//showMessage(noreadflowpriv);
	            //return;
				showPageMessage(noreadflowpriv);
				delete_flow();
				return false;        
			}else{
				$(tiScroll_9.getOIScroll().scroller).html(data);
				tiScroll_9.show();
				pageInit(9);
				return false;
			}
		}
	});


	/* $.ajax({
		type: 'GET',
		url: 'original_form.php',
		cache: false,
		data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag},
		beforeSend: function(){
			$.ProMainLoading.show();       
		},
		success: function(data){
			pre_page = 9;
			fileReadPage = 9;
			$.ProMainLoading.hide();
			if(data == "NOREADFLOWPRIV"){
				//showMessage(noreadflowpriv);
	            //return;
				showPageMessage(noreadflowpriv);
				delete_flow();
				return;        
			}else{
				$("#page_9 > #wrapper_9 > #scroller_9").empty().append(data);
				$("#page_9").show('fast',function(){
					pageInit(9);
					//$("#page_9 .container .read_detail:last").addClass("endline");
				});
				$("#header_2").hide();
				$("#header_9").show();
			}
		},
		error: function(data){
			$.ProMainLoading.hide();  
			showMessage(getfature);
		}
	}); */
}
//获取列表控件表单内容
function listview(listitem,listname)
{
	tiScroll_16.getMainData({
		url: 'workflow/listview.php',
		data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag, 'LISTITEM':listitem, 'LISTNAME':listname},
		cache : false,
		onSuccess: function(data){
			g_pre_page = 16;
			fileReadPage = 16;
			if(data == "NOREADFLOWPRIV"){
				showPageMessage(noreadflowpriv);
				delete_flow();
				return false;        
			}else{
				$(tiScroll_16.getOIScroll().scroller).html(data);
				tiScroll_16.show();
				pageInit(16);
				return false;
			}
		}
	});
}

function turnWorkFlow()
{
   saveWorkFlow('ISFORMTURN'); 
   var flow_type = $("input[name='FLOW_TYPE']").val();
   
   var url = flow_type == 2 ? 'turn_user.php' : 'turn.php';
   var page_num = flow_type == 2 ? '6' : '5';
   turn_back_page = flow_type == 2 ? '2' : '5';
   TOP_FLAG = $("input[name='TOP_FLAG']").val(); 
   var tiScroller = flow_type == 2 ? tiScroll_6 : tiScroll_5;
	tiScroller.getMainData({
	
      url: 'workflow/'+url,
		cache : false,
      data: {'P': p,'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_TYPE':flow_type,'FLOW_PRCS': q_flow_prcs,'TOP_FLAG': TOP_FLAG},
		onSuccess: function(data){
			 
         if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            delete_flow();
            return false;  
         }else if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(nosignflowpriv);
            delete_flow();
            return false;  
         }else if(data == "NORIGHTNEXTPRCS"){
            showPageMessage(norightnextprcs);
            return false;  
         }else if(data == "NOSETNEWPRCS"){
            showPageMessage(norightnextprcs);
            return false;  
         }
			
			$(tiScroller.getOIScroll().scroller).html(data);
			$(".read_detail:last", tiScroller.getElement()).addClass("endline");
			tiScroller.show();

			pageInit(page_num);
			return false;
		}
	
	});
	/*
   $.ajax({
      type: 'GET',
      url: 'workflow/turn.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs,'TOP_FLAG': TOP_FLAG},
      beforeSend: function(){
         $.ProMainLoading.show();      
      },
      success: function(data)
      {
         $.ProMainLoading.hide();
         
         if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            delete_flow();
            return;  
         }else if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(nosignflowpriv);
            delete_flow();
            return;   
         }else if(data == "NORIGHTNEXTPRCS"){
            showPageMessage(norightnextprcs);
            return;   
         }else if(data == "NOSETNEWPRCS"){
            showPageMessage(norightnextprcs);
            return; 
         }
         
         $("#page_5 > #wrapper_5 > #scroller_5").empty().append(data);
         $(".pages").hide();
         $("#page_5").show('fast',function(){
            pageInit(5);
            $("#page_5 .container .read_detail:last").addClass("endline");
         });
         $("#header div[id^='header_']").hide();
         $("#header_5").show();
      },
      error: function(data){
         $.ProMainLoading.hide(); 
         showMessage("??è?ê§°ü");
      }
   });
	*/
}
/**
 * 获取会签界面内容
 */
function signWorkFlow(){
	tiScroll_4.getMainData({
		url: 'workflow/sign.php',
		cache : false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag},
		onSuccess: function(data){
			$(tiScroll_4.getOIScroll().scroller).html(data);
			$(".read_detail:last", tiScroll_4.getElement()).addClass("endline");
			tiScroll_4.refresh();
			return false;
		}
	});

 /*   $.ajax({
      type: 'GET',
      url: 'sign.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag},
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data){
         $.ProMainLoading.hide();
         $("#page_4 > #wrapper_4 > #scroller_4").empty().append(data);
         $("#page_4").show('fast',function(){
            pageInit(4);
            $("#page_4 .container .read_detail:last").addClass("endline");
         });
         
         //lp 2012/4/17 16:14:03 增加办理完毕功能
         if(q_op_flag == 0){
         			
         }
         
         $("#header div[id^='header_']").hide();
         $("#header_4").show();
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage("获取失败");
      }
   }); */
}

//会签的保存
function saveSignWorkFlow(){
   $$CONTENT = $("#CONTENT");
   var CONTENT = $$CONTENT.val();
   if(CONTENT == ""){
      return;
   }
	
   $.ajax({
      type: 'GET',
      url: 'workflow/sign_submit.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs,'CONTENT':CONTENT},
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data){
         $.ProMainLoading.hide();
         showMessage(signsuccess);
         return false;
         /*
         if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(norightnextprcs);
            delete_flow();
            return;   
         }
         */
         /*
         else if(data == "SIGNISNOTEMPTY"){
            $$CONTENT.focus();
            return;
         }
         */
         /*
         else{
            //showMessage(signsuccess);
            //signWorkFlow();
            return;   
         }
         */
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage("获取失败");
      }
   });   
}

//会签办理完毕
function stopWorkFlow(){
	tiScroll_4.getMainData({ 
		url: 'workflow/stop.php',
		cache : false,
        data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
		onSuccess: function(data){
			if(data == "NOSUBEDITPRIV"){
            showPageMessage(nosubeditpriv);
            delete_flow();
            return false;   
         }else if(data == "WORKDONECOMPLETE"){
         	showPageMessage(workdonecomplete);
            delete_flow();
            return false;
         }else if(data == "TURNNEXT"){
            showMessage(workdonecomplete);
            setTimeout(turnWorkFlow,2000);
            return false;   
         }
		}
	});


 /*   $.ajax({
      type: 'GET',
      url: 'stop.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data){
         $.ProMainLoading.hide();
         if(data == "NOSUBEDITPRIV"){
            showPageMessage(nosubeditpriv);
            delete_flow();
            return;   
         }else if(data == "WORKDONECOMPLETE"){
         	showPageMessage(workdonecomplete);
            delete_flow();
            return;
         }else if(data == "TURNNEXT"){
            showMessage(workdonecomplete);
            setTimeout(function(){turnWorkFlow();},2000);
            return;   
         }
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage("获取失败");
      }
   }); */
}

// 获取回退页面
function selWorkFlow() {

	tiScroll_10.getMainData({
		url : 'workflow/sel_back.php',
		cache : false,
		data : {
			'RUN_ID' : q_run_id,
			'FLOW_ID' : q_flow_id,
			'PRCS_ID' : q_prcs_id,
			'FLOW_PRCS' : q_flow_prcs,
		},
		onSuccess: function(data){
			$(tiScroll_10.getOIScroll().scroller).html(data);
			tiScroll_10.show();
			return false;
		}	
	});
/* 
	$.ajax({
		type : 'GET',
		url : 'sel_back.php',
		cache : false,
		data : {
			'RUN_ID' : q_run_id,
			'FLOW_ID' : q_flow_id,
			'PRCS_ID' : q_prcs_id,
			'FLOW_PRCS' : q_flow_prcs,
		},
		beforeSend : function() {
			$.ProMainLoading.show();
		},
		success : function(data) {
			$.ProMainLoading.hide();
			$("#page_10 > #wrapper_10 > #scroller_10").empty().append(data);
			$("#page_10").show('fast', function() {
				pageInit(10);
			});
			$("#header div[id^='header_']").hide();
			$("#header_10").show();

		},
		error : function(data) {
			$.ProMainLoading.hide();
			showMessage("获取失败");
		}
	}); */
}

//执行回退操作
function goOnSelBackWorkFlow()
{
	// 会签内容
	var CONTENT = $("#CONTENT_BACK").val();
	// 回退步骤
	var sel_back_prcs = "";
	$("input[name='PRCS']").each(function(i) {
		if (this.checked == true) {
			sel_back_prcs = this.value;
		}
	});

	if (sel_back_prcs == "") {
		showMessage(notselectedstep);
		return;
	}

	$.ajax({
		type : 'GET',
		url : 'workflow/go_back.php',
		cache : false,
		data : {
			'RUN_ID' : q_run_id,
			'FLOW_ID' : q_flow_id,
			'PRCS_ID' : q_prcs_id,
			'FLOW_PRCS' : q_flow_prcs,
			'FLOW_PRCS_LAST' : sel_back_prcs,
			'CONTENT' : CONTENT,
		},
		beforeSend : function() {
			$.ProMainLoading.show();
		},
		success : function(data) {
			$.ProMainLoading.hide();

			if (data == "WORKHASNOTGOBACK") {
				showMessage(workhasnotgoback);
				
			} else if (data == "WORKHASGOBACK") {
				showPageMessage(workhasgoback);
				$("#page_10").hide();
				delete_flow();
			}

			return false;
			/*
			 * $("#page_7 > #wrapper_7 > #scroller_7").empty().append(data);
			 * $("#page_7").show('fast',function(){pageInit(7);}); $("#header
			 * div[id^='header_']").hide(); $("#header_7").show();
			 */
		},
		error : function(data) {
			$.ProMainLoading.hide();
			showMessage(getfature);
		}
	});
}

/**
 * 获取选择下一步骤界面内容
 */
function goOnWorkFlow(){
   action = $("input[name='turn_action']").val();
   var prcs_id_next = $("input[name='NEW_PRCS_ID_NEXT']").val();
   if(prcs_id_next == '' || typeof(prcs_id_next) == 'undefined' ){return ;}
	
	tiScroll_6.getMainData({  
		url: 'workflow/'+action,
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'PRCS_ID_NEXT': prcs_id_next},
		onSuccess: function(data){
			if(data == "NONEXTPRCS"){
            showPageMessage(nonextprcs);
            return false;   
         }else if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            return false;   
         }else if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(nosignflowpriv);
            return false;   
         }else if(data == "WORKCOMPLETE"){
            showPageMessage(workcomplete);
            delete_flow();
            return false;   
         }
			
			if(prcs_id_next == 0){
            showPageMessage(data); 
            return false;   
         }else{
				$(tiScroll_6.getOIScroll().scroller).html(data);
				tiScroll_6.show();
				pageInit(6);
				return false;
         }
		}	
	});
	
	
  /*  $.ajax({
      type: 'GET',
      url: action,
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'PRCS_ID_NEXT': prcs_id_next},
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data)
      {
         $.ProMainLoading.hide(); 
         if(data == "NONEXTPRCS"){
            showPageMessage(nonextprcs);
            return;   
         }else if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            return;  
         }else if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(nosignflowpriv);
            return;
         }else if(data == "WORKCOMPLETE"){
            showPageMessage(workcomplete);
            delete_flow();
            return;   
         }
         
         if(prcs_id_next == 0){
            showPageMessage(data); 
         }else{
            $("#page_6 > #wrapper_6 > #scroller_6").empty().append(data);
            $("#page_6").show('fast',function(){pageInit(6);});
            $("#header div[id^='header_']").hide();
            $("#header_6").show();
         }
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage("获取失败");
      }
   }); */
}

/**
 * 获取选择下一步骤办理人界面内容
 */
function turnUserWorkFlow(){
   
   var prcs_id_next = $("input[name='NEW_PRCS_ID_NEXT']").val();
   if(prcs_id_next == "")
   {
      showMessage(error);
      return;
   }else{
      prcs_id_next = decodeURIComponent(prcs_id_next);   //添加URL解码，兼容部分浏览器  
   }
	var POST_STR = "RUN_ID="+q_run_id+"&FLOW_ID="+q_flow_id+"&PRCS_ID="+q_prcs_id+"&FLOW_PRCS="+q_flow_prcs+"&PRCS_ID_NEXT="+prcs_id_next;
	var prcs_id_next_arr = prcs_id_next.split(",");

   var _continue = true;
   var _error_step = 0;
	$.each(prcs_id_next_arr, function(key, val){
		if(val)
		{
		   var _zbems = $("#USER_ZB_" + val).find("em");
		   var _cbems = $("#USER_CB_" + val).find("em");
		   if($("#TOP_DEFAULT_" + val).val() != undefined)
		   	 POST_STR += "&TOP_DEFAULT_" + val + "=" + $("#TOP_DEFAULT_" + val).val();
		   		   
		   //判断是否允许主办为空的情况
		   if(eval("typeof(allow_zb_isnull_"+val+") !=\"undefined\""))
		   {
   		   if(eval("allow_zb_isnull_"+val+" == '0'"))
   		   {
   		      if(_zbems.length == 0)
   		      {
   		         _continue = false;
   		         _error_step = val;
   		         errorblmsg = errorzbisnotnull;
		         }
   		   }else{
   		      if(_zbems.length == 0 && _cbems.length == 0)
   		      {
      		      _continue = false;
                  _error_step = val;
                  errorblmsg = errorblisnotnull;
               }
   		   }
		   }
		   
		   if(_zbems.length > 0)
		   {
			   //新版拼接主办人字符串
			   POST_STR += "&PRCS_USER_OP_" + val + "=" + $("#USER_ZB_" + val).find("em").attr("userid");
		   }
		   
			//新版经办人拼接
			var PRCS_USER_TMP = "";
			if(_cbems.length > 0)
		   {
   			$("#USER_CB_" + val).find("em").each(function()
   			{
   	    	  PRCS_USER_TMP += $(this).attr("userid") + ",";
   			});
   			POST_STR += "&PRCS_USER_" + val + "=" + PRCS_USER_TMP;
		   }
		}
	});
	
	if(!_continue)
	{
	   showMessage(sprintf(errorblmsg,_error_step));
	   return;   
	}
   
   $.ajax({
      type: 'POST',
      url: 'workflow/turn_submit.php',
      cache: false,
      data: POST_STR,
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data)
      {
         $.ProMainLoading.hide();
         
         if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
				return false;
         }else if(data == "NOSIGNFLOWPRIV"){
            showPageMessage(nosignflowpriv);
				return false;
         }else if(data == "WORKCOMPLETE"){
            showPageMessage(workcomplete);
            delete_flow();
				return false;
         }else if(data == "WORKHASTURNNEXT"){
            showPageMessage(workhasturnnext);
            delete_flow();
				return false;
         }
         
         /*
            $("#page_7 > #wrapper_7 > #scroller_7").empty().append(data);
            $("#page_7").show('fast',function(){pageInit(7);});
            $("#header div[id^='header_']").hide();
            $("#header_7").show();   
         */
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage(getfature);
      }
   });
   
}

//保存表单
function saveWorkFlow(a){
   saveSignWorkFlow();
   var data = $("#edit_from").serialize();
   $.ajax({
      type: 'POST',
      url: 'workflow/edit_submit.php',
      cache: false,
      async: false,
      data: data,
      beforeSend: function(){
         $.ProMainLoading.show();       
      },
      success: function(data)
      {
         $.ProMainLoading.hide();
         
         //lp 2012/4/23 15:17:28 如果是从主办转交则保存，不跳转页面
         if(a) return;
         $.ajax({
            type: 'GET',
				url: 'workflow/sign.php',
				cache: false,
				data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs, 'OP_FLAG': q_op_flag},
				success: function(dataSign){
					$("#CONTENT").val("");
					$("#editSignBox").empty().append(dataSign);
					showMessage(formsuccess);
					tiScroll_2.refresh();
				}
         })
         /*
         if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            return;  
         }else{
            $("#page_8 > #wrapper_8 > #scroller_8").empty().append(data);
            $("#page_8").show('fast',function(){pageInit(8);});
            $("#header div[id^='header_']").hide();
            $("#header_8").show();   
         }
         */
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage(getfature);
      }
   });     
}

//保存表单之后继续编辑
function continueEditFlow(){

	tiScroll_8.getMainData({
		url: 'workflow/edit.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
		onSuccess: function(data){
         fileReadPage = 2;
         g_pre_page = 2;
			if(data == "NOEDITPRIV"){
            showPageMessage(noeditpriv);
            delete_flow();
            return false;
         }else{ 
            $(tiScroll_2.getOIScroll.scroller).empty().append(data);
            $(".read_detail:last",tiScroll_2.getOIScroll.scroller).addClass("endline");
				tiScroll_2.show();
				pageInit(2);
				return false;				
			}
		}	
	});
/* 
   $.ajax({
      type: 'GET',
      url: 'workflow/edit.php',
      cache: false,
      data: {'RUN_ID': q_run_id,'FLOW_ID': q_flow_id,'PRCS_ID': q_prcs_id,'FLOW_PRCS': q_flow_prcs},
      beforeSend: function(){
         $.ProMainLoading.show();
      },
      success: function(data)
      {
         fileReadPage = 2;
         g_pre_page = 2;
         $.ProMainLoading.hide();
         $("#page_8").hide();
         if(data == "NOEDITPRIV"){
            //showMessage(noeditpriv);
            //return;
            showPageMessage(noeditpriv);
            delete_flow();
            return;
         }else{ 
            $("#page_2 > #wrapper_2 > #scroller_2").empty().append(data);
            $("#page_2").show('fast',function(){
               pageInit(2);
               $("#page_2 .container .read_detail:last").addClass("endline");
            });
            $("#header div[id^='header_']").hide();
            $("#header_2").show();
         }
      },
      error: function(data){
         $.ProMainLoading.hide();  
         showMessage(getfature);
      }
   });       */
}

function delete_flow()
{
   if(q_run_id!="")
   {
      refreshList();
      
      $("#workflow_list li").each(function(){
         if($(this).attr("q_run_id") == q_run_id && $(this).attr("q_prcs_id") == q_prcs_id)
            $(this).remove();
      });
   }
}

function showPageMessage(str){
	$(tiScroll_7.getOIScroll().scroller).html(reMakeMessage(str));
	tiScroll_7.show();
/* 
   $("div[id^='page_']").hide();
   $("#page_7 > #wrapper_7 > #scroller_7").empty().append(reMakeMessage(str));
   $("#page_7").show('fast',function(){pageInit(7);});
   $("#header div[id^='header_']").hide();
   
   $("#header_7").show(); */
}

//2012/4/26 15:39:29 lp 刷新列表
function refreshList(){
   var $$page_dom = tiScroll_1.getElement();
	//$("#page_1");
   var oUl = $$page_dom.find("#workflow_list");
   var lastedId =  oUl.find("li:first").attr("q_id");
   if(!lastedId) return;
	$.get(
		"/pda/pad/inc/getdata.php",
		{'A':"GetNew", 'STYPE':stype, "P":p, "LASTEDID": lastedId},
		function(m)
		{
			if(m == "NONEWDATA")
			{
			   //showMessage(nonewdata);
			}else{
				var size = $("<ul>"+m+"</ul>").find("li").size();
            var osize = oUl.find("li").size();
            
            if(osize == 0)
               $$page_dom.find(".no_msg").hide();
                  
            oUl.prepend(m);
			}
		}
	);
}
// 新建工作
function newFlow() {
	tiScroll_11.getMainData({
		url : 'workflow/new_list.php',
		cache : false,
		data : {
			'P': p,
			'RUN_ID' : q_run_id,
			'FLOW_ID' : q_flow_id,
			'PRCS_ID' : q_prcs_id,
			'FLOW_PRCS' : q_flow_prcs
		},
		onSuccess: function(data){
			if(data == "NOCREATERUNPRIV"){
				showPageMessage(nocreaterunpriv);
				return false;
			}
			

			$(tiScroll_11.getOIScroll().scroller).html('<ul class="comm-list comm-pic-list sideBarSubList">'+data+'</ul>');
			tiScroll_11.show();
			g_pre_page = 11;
			setTimeout(function(){pageInit(11)},100);			//fixbug： 不出滚动条， 延迟执行 pageinit   
			return false;
		}
	});
}
//展开新建流程列表
function getFlowNewlist(SORT_ID,SORT_NAME,PARENT_SORT)
{
	tiScroll_12.getMainData({
      url: 'workflow/new_list.php',
      cache: true,
      data: {'P': p,'SORT_ID': SORT_ID,'SORT_NAME_TMP': SORT_NAME,'PARENT_SORT': PARENT_SORT},
		onSuccess: function(data){
			if(data == 'NOFLOWLIST'){
				showMessage(noflowlist);
            return false;
         }else{
				tiScroll_12.getHeader().find('.t').html(SORT_NAME);           
				$(tiScroll_12.getOIScroll().scroller).html('<ul class="comm-list comm-pic-list sideBarSubList">'+data+'</ul>');
				tiScroll_12.show();
				pageInit(12);
				g_pre_page = 12;
				return false;
         }
		}	
	});


}


//获取新建工作页面
function getFlowNew(FLOW_ID)
{
	tiScroll_13.getMainData({
	      url: 'workflow/new_edit.php',
	      cache: true,
	      data: {'P': p,'FLOW_ID': FLOW_ID},
			showCallback: function(data){
				 $(".read_detail:last", tiScroll_13.getElement()).addClass("endline");
				 tiScroll_13.show();
				 pageInit(13);
				 g_pre_page = 13;
			}
	});
}

function saveNewWorkFlow()
{
	var RUN_NAME = $("input[name='RUN_NAME']").val();
	if(RUN_NAME == "")
	{
		showMessage(norunname);
		return;
	}
	
	var RUN_NAME_LEFT = $("input[name='RUN_NAME_LEFT']");
	var RUN_NAME_RIGHT = $("input[name='RUN_NAME_RIGHT']");
	if(RUN_NAME_LEFT.length > 0 && force_pre_set == 1)
	{
		if(RUN_NAME_LEFT.val() == "")
		{
			showMessage(noprefix);
			return;
		}
	}
	if(RUN_NAME_RIGHT.length > 0 && force_pre_set == 1)
	{
		if(RUN_NAME_RIGHT.val() == "")
		{
			showMessage(nosuffix);
			return;
		}
	}
	
	var data = $("#new_from").serialize();
	
	tiScroll_2.getMainData({
			type: 'POST',
	      url: 'workflow/new_submit.php',
	      cache: false,
	      async: false,
	      data: data + "&P="+p,
			onSuccess: function(data){
				if(data == "NORUNNAME"){
					showMessage(norunname);
					return false;
	         }
	         else if(data == "NAMEREPEAT"){
					showMessage(namerepeat);
					return false;
	         }
	         else if(data == "NOCREATERUN"){
					showMessage(nocreaterun);
					return false;
	         }
	         else{
					$(tiScroll_2.getOIScroll().scroller).empty().append(data);
					$("div[id^='page_']").hide();
					editWorkFlow();
					g_pre_page = 1;
					g_now_page = 2;
					refreshList();
					return false;
	         }
			}
	});
}

//查询后流程事件
$("#search_list li").live(tPad.clickEvt, function(){
   $$a = $(this);
   //全局变量
   q_run_id      = $$a.attr("q_run_id");
   q_flow_id     = $$a.attr("q_flow_id");
   q_prcs_id     = $$a.attr("q_prcs_id");
   q_flow_prcs   = $$a.attr("q_flow_prcs");
   q_op_flag     = $$a.attr("q_op_flag");
   
   if($(this).hasClass("active") || $(this).hasClass("received"))
   {
	   editWorkFlow();
	   g_pre_page = 15;
	   g_now_page = 2;
   }
   else
   {
	   getflowContent();
	   g_pre_page = 15;
	   g_now_page = 3;
   }
   
});

function searchFlow()
{
	pageInit(14);
	tiScroll_14.show();
}

function searchFlowList()
{
	var search_name = $("input[name='SEARCH_NAME']").val();
	var search_run_id = $("input[name='SEARCH_RUN_ID']").val();

	$.ajax({
	      type: 'GET',
	      url: 'workflow/search_list.php',
	      cache: true,
	      data: {'P': p,'SEARCH_NAME':search_name,'SEARCH_RUN_ID':search_run_id},
	      beforeSend: function(){
	            $.ProSideLoading.show();
	         },
	      success: function(data){
	         $.ProSideLoading.hide();  
	         if(data == 'NOFLOWLIST'){
	        	 showMessage(noflowlist);
	            return;
	         }else{	
	        	  $("#sideContentPage_14").hide();
	            $("#sideContentPage_15 > #sideContentWrapper_15 > #contentScroller_15 ul").empty().append(data);
	            $("#sideContentPage_15").show('fast',function(){pageInit(15);});
	            $("#siderheader div[id^='siderheader_']").hide();
	            $("#siderheader_15").show();
	         }
	      },
	      error: function(data){
	         $.ProSideLoading.hide();  
	         showMessage(getfature);
	      }
	   });
}

//工作查询列表上拉扩展
function pullUp_search_list()
{
	var oUl = $("#sideContentPage_15").find("ul.comm-list");
	var currIterms = oUl.find("li").size();
    
    //lp 2012/5/2 0:59:57 增加获取更多时，条件控制
    if(currIterms > 0){
       lastGetId = oUl.find("li:last").attr("q_id");    
    }
    
    var search_name = $("input[name='SEARCH_NAME']").val();
    $.get(
       "workflow/search_list.php", 
       {'A':"GetMore", 'STYPE':stype, "P":p, "CURRITERMS": currIterms, "LASTGETID": lastGetId, "SEARCH_NAME":search_name},
       function(data)
       {
         oUl.append(data);
         tiScroll_15.refresh();
         if(noshowPullUp_15)
          {
        	  $$page_dom.find(".pullUp").hide();
        	  $$page_dom.find(".scroller").append('<div class="loadingComplete">' + td_lang.pda.msg_8 + '</div>');
          }
       }
    );
    return false;
}

function pullDown_search_list(){
	showMessage(td_lang.pda.msg_1);
	tiScroll_15.refresh();
	return false;	
}


//2012/6/18 2:52:29 lp 工作流选人扩展搜索
$.extend({
   workFlowSearch: function (options) 
   {
      var url = '/pda/pad/inc/get_contactlist.php';              
      var input = options.input;
      var list = options.list;
      var appendDom_top = options.appendDom_top;
      var appendDom_zb = options.appendDom_zb;
      var appendDom_cb = options.appendDom_cb;
      var showbtn = options.showbtn;
      var nodate = options.nodate;
      var pageScroll = options.pageScroll;
      
      var $$input = $(input);
      var $$list = $(list);
      var orgHtml = $(list).html();
      var $$showbtn = $(showbtn);
      var $$nodate = $(nodate);
      
      var _tmp_key;
      var searchInterval = null;
      
      function init()
      {
         $$input.focus(function(e){
            //orgHtml = $(list).html();
            e.stopPropagation(); 
            searchInterval = null;
            searchInterval = window.setInterval(search_name,1000);
            $(this).addClass("hasNoBackGround");
         });
         
         $$input.blur(function(){
            if($(this).val() == '')
               $(this).removeClass("hasNoBackGround");
            window.clearInterval(searchInterval);
            searchInterval = null;
         });
         
         //2012/6/24 13:24:11 lp 绑定主办按钮点击事件
         $$list.delegate("a.ui-li-text-a", tPad.clickEvt, function(e)
         {		
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(this, e)){
                return false;
            }
            e.stopPropagation();
            
            if($(this).hasClass("current"))
            {
               $(this).removeClass("current");
               $(this).parents("li").removeClass("active");
               remove_user("zb",$(this).parents("li"));
               return;  
            }else{
               if($(appendDom_zb).find("em").length > 0)
               {
                  var uid = $(appendDom_zb).find("em").attr("uid");
                  remove_user("onlyzb",uid);
                  
                  //$$list.find("a.current").parents("li").removeClass("active");
                  $$list.find("a.current").removeClass("current");   
               }
               
               $(this).parents("li").addClass("active");
               $(this).addClass("current");
               add_user("zb",$(this).parents("li"));
               return;
            }
         });
         
         //2012/6/24 13:24:11 lp 绑定列表点击事件
         $$list.delegate("li", tPad.clickEvt, function(e)
         {            
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(e.target, e)){
                return false;
            }

            if($(this).hasClass("active"))
            {
               $(this).removeClass("active");
               currentA = $(this).find("a.current");
               if(currentA.length > 0)
               {
                  currentA.removeClass("current");
                  remove_user("zb", $(this));
                  return;                 
               }else{
                  remove_user("cb", $(this));
                  return;      
               }
            }else{
               $(this).addClass("active");
               that = $(this);
               _uid = that.attr("q_id");
               var haszb = hascb = false;
               if($(appendDom_zb).find("em").length > 0)
               {
                  $(appendDom_zb).find("em").each(function(){
                     if($(this).attr("uid") == _uid)
                     {
                        that.addClass("active");
                        that.find("a.ui-li-text-a").addClass("current");
                        haszb = true;
                        return false;   
                     }
                  });
                  
                  $(appendDom_cb).find("em").each(function(){
                     if($(this).attr("uid") == _uid)
                     {
                        that.addClass("active");
                        hascb = true; 
                        return false;
                        return;
                     }   
                  });
                  
                  //主办和从办都没有选择该人的时候，加入该人
                  if(!hascb && !hascb)
                  {
                     add_user("cb", $(this));
                  }
                  return;       
               }else{
                  $(this).find("a.ui-li-text-a").addClass("current");   
                  add_user("zb", $(this));
                  return;  
               }   
            }      
         });
         
         //2012/6/24 22:14:06 lp 绑定主办人的删除操作
         var appendDom_zb_oems = $(appendDom_zb).find("em");
         var appendDom_zb_ospans = $(appendDom_zb).find("em span");
         appendDom_zb_oems.die("click").live("click",function(e)
         {            
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(this, e)){
                return false;
            }
            e.stopPropagation();
            if(!$(this).hasClass("active"))
            {
               $(appendDom_zb).find("em").removeClass("active");
               $(appendDom_zb).find("em span").animate({width: '0'},{complete: function(){$(this).hide();}, duration: 200 });
               $(this).addClass("active");
               $(this).find("span").animate({width: '16'},{complete: function(){$(this).show();}, duration: 200 });
            }else{
               $(this).removeClass("active");
               $(this).find("span").animate({width: '0'},{complete: function(){$(this).hide();}, duration: 200 });
            }
         });
         
         appendDom_zb_ospans.die("click").live("click",function(e)
         {            
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(this, e)){
                return false;
            }
            e.stopPropagation();
            var emP = $(this).parent("em");
            emP.remove();
            
            //同时删除列表数据中主办对应的颜色
            var uid = emP.attr("uid");
            $$list.find("li").each(function()
            {
               if($(this).attr("q_id") == uid)
               {
                  $(this).find("a.ui-li-text-a").removeClass("current");
                  return false;
               } 
            });
            return;     
         });
         
         //2012/6/24 22:14:06 lp 绑定经办人的删除操作
         var appendDom_cb_oems = $(appendDom_cb).find("em");
         var appendDom_cb_ospans = $(appendDom_cb).find("em").find("span");
         appendDom_cb_oems.die("click").live("click",function(e)
         {            
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(this, e)){
                return false;
            }
            e.stopPropagation();
            if(!$(this).hasClass("active"))
            {
               $(appendDom_cb).find("em").removeClass("active");
               $(appendDom_cb).find("em span").animate({width: '0'},{complete: function(){$(this).hide();}, duration: 200 });
               $(this).addClass("active");
               $(this).find("span").animate({width: '16'}, {complete: function(){$(this).show();}, duration: 200 });
            }else{
               $(this).removeClass("active");
               $(this).find("span").animate({width: '0'},{complete: function(){$(this).hide();}, duration: 200 });
            }
         });
         
         appendDom_cb_ospans.die("click").live("click",function(e)
         {
            //修复chrome下单击触发两次的bug by JinXin @ 2012/10/15
            if(false === fixDbClick.call(this, e)){
                return false;
            }
            e.stopPropagation();
            var emP = $(this).parent("em");
            emP.remove();
            
            var uid = emP.attr("uid");
            $$list.find("li").each(function()
            {
               if($(this).attr("q_id") == uid)
               {
                  //删除经办的时候同时如果是主办，则删除主办
                  if($(this).find("a.current").length > 0)
                  {
                     $(this).find("a").removeClass("current");
                     $(appendDom_zb).find("em").each(function()
                     {
                        if($(this).attr("uid") == uid)
                        {
                           $(this).remove();
                           return false;
                        }
                     }); 
                  }
                  $(this).removeClass("active");
                  return false;
               } 
            });
            return;     
         });
         
         
      }
      
      function add_user(t, o)
      {
         str = "";
         _oSelect_uid = o.attr("q_id");
         _oSelect_name = o.attr("q_name");
         _oSelect_user_id = o.attr("q_user_id");
         str = "<em uid='"+_oSelect_uid+"' userid='"+_oSelect_user_id+"'>" + _oSelect_name +"<span><b></b></span></em>";

         if(t == "zb")
         {
            if($(appendDom_top).val() == 0 || $(appendDom_top).val() == undefined)
         	{
            	$(appendDom_zb).append(str);
        	}
        	else 
        	{
        		$$list.find("a.ui-li-text-a").removeClass("current");
        	}
            
            //判断有无从办
            var cb_has = false;
            if($(appendDom_cb).find("em").length > 0)
            {
               $(appendDom_cb).find("em").each(function(){
                  if($(this).attr("uid") == _oSelect_uid){
                     cb_has = true;
                     return false;         
                  }   
               });     
            }
            
            if(!cb_has)
               $(appendDom_cb).append(str);
         }else{
            $(appendDom_cb).append(str);
         }
      }
      
      function remove_user(t, o)
      {
         _oSelect_uid = typeof(o) == "object" ? o.attr("q_id") : o;
         if(t == "zb")
         {
            $(appendDom_zb).find("em").each(function(){
               if($(this).attr("uid") == _oSelect_uid)
                  $(this).remove();
               else
                  return true;
            });
            
            $(appendDom_cb).find("em").each(function(){
               if($(this).attr("uid") == _oSelect_uid)
                  $(this).remove();
               else
                  return true;
            });
         }else if(t == "cb"){
            $(appendDom_cb).find("em").each(function(){
               if($(this).attr("uid") == _oSelect_uid)
                  $(this).remove();
               else
                  return true;
            });            
         }else{
            $(appendDom_zb).find("em").each(function(){
               if($(this).attr("uid") == _oSelect_uid)
                  $(this).remove();
               else
                  return true;
            });
         }
      }
				

      //2012/6/26 14:13:15 lp
      function refreshListStatu()
      {
         var zb_oems = $(appendDom_zb).find("em");
         var cb_oems = $(appendDom_cb).find("em");
         if(zb_oems.length > 0)
         {
            var zb_cell_id = zb_oems.attr("uid");  
            $(list).find("li").each(function(){
               if($(this).attr("q_id") == zb_oems.attr("uid"))
               {
                  $(this).find("a.ui-li-text-a").addClass("current");
                  return false;
               }
            });
         }
         
         if(cb_oems.length > 0)
         {
            cb_oems.each(function()
            {
               var cb_ceil_id = $(this).attr("uid");
               $(list).find("li").each(function()
               {
                  if($(this).attr("q_id") == cb_ceil_id)
                  {
                     $(this).addClass("active");
                     return false;
                  }
               });
            });   
         }
      }
      
      function search_name()
      {
         var key = $$input.val();
         if(key!="")
         {
            if(key!=_tmp_key)
            {
               $$showbtn.hide();
               _tmp_key = key;
               
               if(/^[A-Za-z0-9]+$/.test(key))
               {
                  var _key_len = key.length;
                  if(_key_len > 1)
                  {
                     for(var i = 0;i < key.length;i++)
                     {
                        reg = key.charAt(i) + "(.*)";
                     } 
                  }else{
                     reg = key + "(.*)";      
                  } 
                  
                  eval("reg = /(.*)" + reg + "/");
                  _orgObj = $("<ul>"+orgHtml+"</ul>");
                  _orgObj.find("li").each(function(){
                     q_name_index = $(this).attr("q_name_index");
                     if(reg.test(q_name_index))
                        return true;
                     else
                        $(this).remove();
                  });
                                      
               }else if(!isChineseChar(key))
               {
                  $.ajax({
                     type: 'GET',
                     url: url,
                     cache: false,
                     data: {"KWORD":key, "P":p ,"ACTION": "getNameIndex"},
                     beforeSend: function(){
                        $.ProMainLoading.show();   
                     },
                     success: function(data)
                     {
                        $.ProMainLoading.hide();
                        var nameArr = [];
                        nameArr = data.split("*");
                        eval("reg = /(.*)" + nameArr.join("\\*(.*)") + "/");
                        _orgObj = $("<ul>"+orgHtml+"</ul>");
                        _orgObj.find("li").each(function(){
                           q_name_index = $(this).attr("q_name_index");
                           //console.log(q_name_index + " " + reg);
                           if(reg.test(q_name_index))
                              return true;
                           else
                              $(this).remove();
                        });
                     }
                  });
               }else{
                  //如果为纯中文，则直接搜索结果列表
                  _orgObj = $("<ul>"+orgHtml+"</ul>");
                  var _key_len = key.length;
                  
                  var partten = '';
                  //如果包括多个汉字
                  if(_key_len > 1)
                  {
                     for(var i = 0;i < key.length;i++)
                     {
                        if(key.charCodeAt(i) > 128)
                        {
                           var partten = partten + key.charAt(i) + "(.*?)";
                        }
                     } 
                  } 
                  _orgObj.find("li").each(function(){
                     q_name = $(this).attr("q_name");
                     //执行数组循环判断
                     if(_key_len > 1)
                     {
                        if(eval("/" + partten + "/.test(q_name)"))
                           return true;
                        else
                           $(this).remove();
                     }else{
                        //单个汉字
                        if(q_name.indexOf(key) > -1)
                           return true;
                        else
                           $(this).remove();   
                     } 
                  });
               }
               
               li_len = _orgObj.find("li").size();
               if(li_len > 0 )
               {
                  $$nodate.hide();
                  $$list.empty().append(_orgObj).find("li:hidden").show();
                  if($(showbtn).length == 0 || li_len == 1){
                     $$list.find("li:last").css("border-bottom","none");
                  }
               }else{
                  $$list.empty();$$nodate.show();   
               }  
            }
            
            refreshListStatu();
            return;
         }else{
            if(_tmp_key == key && key == "")
               return;
               
            _tmp_key = key;
            //如果为点击删掉的，则全部显示列表

            $$list.empty().append(orgHtml);
            refreshListStatu();
            if($(showbtn).length == 0){
               $$list.find("li:hidden").show();
                $$list.find("li:last").css("border-bottom","none"); 
            }
            $$showbtn.show();
            $$nodate.hide();
            eval(pageScroll+".refresh()");
         }   
      }
      return{
         init: init,
         refresh: refreshListStatu    
      }
   }
});