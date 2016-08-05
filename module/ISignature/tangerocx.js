

//操作日志
function ShowLog()
{
	if($('OC_LOG').style.display == "none")
	{
		$('OC_LOG').style.display = "block";
		$('OC_HISTORY').style.display = "none";
		$('WebOffice').style.display = "none";
		if($('OC_LOG').innerText == "")
			GetLog();
	}
	else
	{
		$('OC_LOG').style.display = "none";
		$('OC_HISTORY').style.display = "none";
		$('WebOffice').style.display = "block";
	}
}

//历史版本
function ShowHistory()
{
	if($('OC_HISTORY').style.display == "none")
	{
		$('OC_LOG').style.display = "none";
		$('WebOffice').style.display = "none";
		$('OC_HISTORY').style.display = "block";
		if($('OC_HISTORY').innerText == "")
			GetHistory();
	}
	else
	{
		$('OC_LOG').style.display = "none";
		$('OC_HISTORY').style.display = "none";
		$('WebOffice').style.display = "block";
	}
}
