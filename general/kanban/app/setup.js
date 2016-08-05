
window.__debug__ = false //定义一个调试标记，用于开发模式中

// window.isie8 = true

window.isIE = (() => {
	if(!!window.ActiveXObject || "ActiveXObject" in window) {
		return true
	} else {
		return false
	}
})()
