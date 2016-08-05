
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS"
export const MODIFY_MEMBERS = "MODIFY_MEMBERS"

export const receiveMembers = (members) => {
	return {
		type: RECEIVE_MEMBERS,
		members
	}
}

const mockFetch = {
	"init_project":[
		{uid:"12",userid:"woota",username:"雾塔",avatar:"http://img3.imgtn.bdimg.com/it/u=1204093599,3577341598&fm=21&gp=0.jpg"},
		{uid:"11",userid:"lj",username:"李俊",avatar:"http://img2.imgtn.bdimg.com/it/u=3811392751,4063337591&fm=21&gp=0.jpg"},
		{uid:"10",userid:"tl",username:"田林",avatar:"http://img0.imgtn.bdimg.com/it/u=3256296895,2572960593&fm=21&gp=0.jpg"},
	  	{uid:"9",userid:"sxm",username:"宋希萌",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"8",userid:"jx",username:"靳昕",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"7",userid:"lqh",username:"刘清华",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"6",userid:"fz",username:"冯钊",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"5",userid:"lkj",username:"李奎军",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"}
	],
	"project0":[
		{uid:"11",userid:"lj",username:"李俊",avatar:"http://img2.imgtn.bdimg.com/it/u=3811392751,4063337591&fm=21&gp=0.jpg"},
	  	{uid:"10",userid:"tl",username:"田林",avatar:"http://img0.imgtn.bdimg.com/it/u=3256296895,2572960593&fm=21&gp=0.jpg"},
	  	{uid:"9",userid:"sxm",username:"宋希萌",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"8",userid:"jx",username:"靳昕",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"7",userid:"lqh",username:"刘清华",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"6",userid:"fz",username:"冯钊",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"5",userid:"lkj",username:"李奎军",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"}
	],
	"project1":[
		{uid:"11",userid:"lj",username:"李俊",avatar:"http://img2.imgtn.bdimg.com/it/u=3811392751,4063337591&fm=21&gp=0.jpg"},
	  	{uid:"10",userid:"tl",username:"田林",avatar:"http://img0.imgtn.bdimg.com/it/u=3256296895,2572960593&fm=21&gp=0.jpg"},
	  	{uid:"9",userid:"sxm",username:"宋希萌",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"8",userid:"jx",username:"靳昕",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
	  	{uid:"7",userid:"lqh",username:"刘清华",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"}
	]
}

const mockSingleFetch = [
	{uid:"11",userid:"lj",username:"李俊",avatar:"http://img2.imgtn.bdimg.com/it/u=3811392751,4063337591&fm=21&gp=0.jpg"},
  	{uid:"10",userid:"tl",username:"田林",avatar:"http://img0.imgtn.bdimg.com/it/u=3256296895,2572960593&fm=21&gp=0.jpg"},
  	{uid:"9",userid:"sxm",username:"宋希萌",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
  	{uid:"8",userid:"jx",username:"靳昕",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"},
  	{uid:"5",userid:"yf",username:"云帆",avatar:"http://www.uuuu.cc/uploads/allimg/c140801/140DP40164220-2Q941.jpg"}
]

export const fetchMembers = (projId) => {
	let _mockFetch
	if(projId !== undefined) {
		_mockFetch = mockSingleFetch
	} else {
		_mockFetch = mockFetch
	}
	return (dispatch, getState) => {
		if(__debug__) {
			$.fetch('/api/get_members.php', _mockFetch, (data) => {
				if(projId !== undefined) {
					dispatch(modifyMembers(projId, data))
				} else {
					dispatch(receiveMembers(data))
				}
			})
		} else {
			$.get("/general/kanban/api/get_members.php",
			    projId ? {proj_id:  projId} : null,
			    function(data){
			    	//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let members = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch members")
						return false
					}
			        if(projId !== undefined) {
						dispatch(modifyMembers(projId, members))
					} else {
						dispatch(receiveMembers(members))
					}
			    }
			)
		}
		
	}
}

export const modifyMembers = (projId, members) => {
	return {
		type: MODIFY_MEMBERS,
		projId,
		members
	}
}



