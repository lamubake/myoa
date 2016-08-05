
export const REQUEST_MY_TASKS = "REQUEST_MY_TASKS"
export const RECEIVE_MY_TASKS = "RECEIVE_MY_TASKS"

export const requestMyTasks = () => {
	return {
		type: REQUEST_MY_TASKS,
		needLoadingIcon: false
	}
}

export const receiveMyTasks = (myTasks) => {
	return {
		type: RECEIVE_MY_TASKS,
		myTasks
	}
}

const mockFetch = [
		{
			taskid:"task0",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"0",
		    content:"尽量做到state tree中的数据都是正确的，因为我们不知道自己会依赖哪一部分数据。",
		    start:"2016-02-22",//开始时间
		    end:"2016-02-22",//结束时间
		    finish:"",
		    level:"2",//重要级别，0普通，1紧急，2非常紧急
		    creator:"12",
		    executor:"11",
		    member:["12","8","11","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:true,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		},
		{
			taskid:"task1",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"1",
		    content:"永远不要直接更改state tree中的数据，所有更改必须显示的通过触发action来进行，通过selector选出来传给组件的数据同样是只可读，不可写。",
		    start:"2016-02-22",//开始时间
		    end:"2016-02-30",//结束时间
		    finish:"",
		    level:"1",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"11",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel1",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:true,//能否挂起
		    can_edit:false,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		},
		{
			taskid:"task2",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"2",
		    content:"这是第三条任务",
		    start:"2016-02-22",//开始时间
		    end:"2016-02-22",//结束时间
		    finish:"",
		    level:"0",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"12",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:true,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		},
		{
			taskid:"task3",
		    status:"1",//0未完成，1已完成， 2已挂起
		    time_status:"0",
		    content:"这是第四条任务",
		    start:"2016-02-22",//开始时间
		    end:"2016-02-22",//结束时间
		    finish:"2016-01-05 21:55:00",
		    level:"0",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"12",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:true,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		}
]

export const fetchMyTasks = () => {
	return (dispatch, getState) => {
		if(__debug__) {
			$.fetch('/api/get_my_tasks.php',mockFetch, (data) => {
				dispatch(receiveMyTasks(data))
			})
		} else {
			$.get("/general/kanban/api/get_my_tasks.php",function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let mytasks = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch all mytasks")
						return false
					}

					//in case of server sending the wrong type of data
					if(mytasks === "") {
						mytasks = []
					}

					if(mytasks.length === undefined) {
						alert("wrong data in fetch all mytasks.")
						return false
					}

					mytasks.forEach(item => {
						Object.assign(item, {
							member: item.member !== "" ? item.member.split(",") : [],
							sub_tasks: item.sub_tasks !== "" ? item.sub_tasks.split(",") : []
						})
					})

					dispatch(receiveMyTasks(mytasks))
			    }
			)
		}
		
	}
}