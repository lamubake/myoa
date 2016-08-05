/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _sniffer = __webpack_require__(1);

	var _methods = __webpack_require__(2);

	var readyCb = function readyCb() {};
	// let errorCb = () => {}

	// reveal the td object to the global environment
	window.td = function () {

	    return {
	        ready: function ready(cb) {
	            if (typeof cb !== 'function') {
	                throw new Error('td.ready() only accept functions, instead receiving a ' + (typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) + '.');
	            }
	            readyCb = cb;
	        },
	        error: function error() /*cb*/{
	            //errorCb =cb
	        }
	    };
	}();

	//iphone bridge setup function definition
	function setupWebViewJavascriptBridge(callback) {
	    if (window.WebViewJavascriptBridge) {
	        return callback(WebViewJavascriptBridge);
	    }
	    if (window.WVJBCallbacks) {
	        return window.WVJBCallbacks.push(callback);
	    }
	    window.WVJBCallbacks = [callback];
	    var WVJBIframe = document.createElement('iframe');
	    WVJBIframe.style.display = 'none';
	    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	    document.documentElement.appendChild(WVJBIframe);
	    setTimeout(function () {
	        document.documentElement.removeChild(WVJBIframe);
	    }, 0);
	}
	//android bridge setup function definition
	function connectWebViewJavascriptBridge(callback) {
	    if (window.WebViewJavascriptBridge) {
	        callback(WebViewJavascriptBridge);
	    } else {
	        document.addEventListener('WebViewJavascriptBridgeReady', function () {
	            callback(WebViewJavascriptBridge);
	        }, false);
	    }
	}

	var td = {};
	var setupBridge = void 0;

	if ((0, _sniffer.isAndroid)()) {
	    setupBridge = connectWebViewJavascriptBridge;

	    //init
	    setupBridge(function (bridge) {
	        bridge.init(function (message, responseCallback) {
	            //console.log('JS got a message', message)
	            var data = {
	                'Javascript Responds': '测试中文!'
	            };
	            //console.log('JS responding with', data)
	            responseCallback(data);
	        });

	        //register all the callbacks
	        td = {
	            confirm: (0, _methods.showDialog)(bridge),
	            toast: (0, _methods.showToast)(bridge),
	            getLocation: (0, _methods.getLocation)(bridge),
	            previewImage: (0, _methods.showPic)(bridge),
	            launchApp: (0, _methods.startApp)(bridge),
	            previewFile: (0, _methods.showAttachment)(bridge),
	            all: (0, _methods.callPhone)(bridge),
	            sendMessage: (0, _methods.sendMessage)(bridge),
	            getNetworkType: (0, _methods.getNetworkType)(bridge),
	            chooseImage: (0, _methods.selectPic)(bridge),
	            selectFile: (0, _methods.selectAttachment)(bridge),
	            selectUser: (0, _methods.selectUser)(bridge),
	            setTitle: (0, _methods.setTitle)(bridge),
	            setRight: (0, _methods.setRight)(bridge),
	            actionSheet: (0, _methods.actionSheet)(bridge)
	        };

	        window.td = _extends({}, window.td, td);

	        readyCb();
	    });
	}
	if ((0, _sniffer.isIphone)()) {
	    setupBridge = setupWebViewJavascriptBridge;
	    setupBridge(function (bridge) {

	        //register all the callbacks
	        td = {
	            confirm: (0, _methods.showDialog)(bridge),
	            toast: (0, _methods.showToast)(bridge),
	            getLocation: (0, _methods.getLocation)(bridge),
	            previewImage: (0, _methods.showPic)(bridge),
	            launchApp: (0, _methods.startApp)(bridge),
	            previewFile: (0, _methods.showAttachment)(bridge),
	            call: (0, _methods.callPhone)(bridge),
	            sendMessage: (0, _methods.sendMessage)(bridge),
	            getNetworkType: (0, _methods.getNetworkType)(bridge),
	            chooseImage: (0, _methods.selectPic)(bridge),
	            selectFile: (0, _methods.selectAttachment)(bridge),
	            selectUser: (0, _methods.selectUser)(bridge),
	            setTitle: (0, _methods.setTitle)(bridge),
	            setRight: (0, _methods.setRight)(bridge),
	            actionSheet: (0, _methods.actionSheet)(bridge)
	        };

	        window.td = _extends({}, window.td, td);

	        setTimeout(function () {
	            readyCb();
	        }, 200);
	    });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	//test for android
	var isAndroid = exports.isAndroid = function isAndroid() {
	    var ua = navigator.userAgent.toLowerCase();
	    var isA = ua.indexOf('android') > -1;
	    if (isA) {
	        return true;
	    }
	    return false;
	};

	//test for iphone
	var isIphone = exports.isIphone = function isIphone() {
	    var ua = navigator.userAgent.toLowerCase();
	    var isIph = ua.indexOf('iphone') > -1;
	    if (isIph) {
	        return true;
	    }
	    return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.actionSheet = exports.setRight = exports.setTitle = exports.selectUser = exports.selectAttachment = exports.selectPic = exports.getNetworkType = exports.sendMessage = exports.callPhone = exports.showAttachment = exports.startApp = exports.showPic = exports.getLocation = exports.showToast = exports.showDialog = undefined;

	var _constants = __webpack_require__(3);

	/*
	 * name: showDiag
	 * params: message|String, onSuccess|Function, onFail|Function
	 */
	var showDialog = exports.showDialog = function showDialog(bridge) {
		return function (argObj) {
			var title = argObj.title;
			var message = argObj.message;
			var buttonLabels = argObj.buttonLabels;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SHOW_DIALOG, { title: title, msg: message, buttons: buttonLabels }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var showToast = exports.showToast = function showToast(bridge) {
		return function (argObj) {
			var text = argObj.text;
			var duration = argObj.duration;
			var delay = argObj.delay;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SHOW_TOAST, { text: text, duration: duration, delay: delay }, function (responseData) {});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var getLocation = exports.getLocation = function getLocation(bridge) {
		return function (argObj) {
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.GET_LOCATION, {}, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var showPic = exports.showPic = function showPic(bridge) {
		return function (argObj) {
			var urls = argObj.urls;
			var current = argObj.current;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			var index = urls.indexOf(current);

			try {
				bridge.callHandler(_constants.SHOW_PIC, { urls: urls, index: index }, function (responseData) {});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var startApp = exports.startApp = function startApp(bridge) {
		return function (argObj) {
			var app = argObj.app;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.START_APP, { app: app }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var showAttachment = exports.showAttachment = function showAttachment(bridge) {
		return function (argObj) {
			var url = argObj.url;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SHOW_ATTACHMENT, { url: url }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var callPhone = exports.callPhone = function callPhone(bridge) {
		return function (argObj) {
			var phoneNum = argObj.phoneNum;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.CALL_PHONE, { phoneNum: phoneNum }, function (responseData) {});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var sendMessage = exports.sendMessage = function sendMessage(bridge) {
		return function (argObj) {
			var phoneNums = argObj.phoneNums;
			var content = argObj.content;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SEND_MESSAGE, { phoneNums: phoneNums, content: content }, function (responseData) {});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var getNetworkType = exports.getNetworkType = function getNetworkType(bridge) {
		return function (argObj) {
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.GET_NETWORK_TYPE, {}, function (responseData) {
					responseData = JSON.parse(responseData);

					//data can be : wifi, 2g, 3g, 4g, none, unknow
					onSuccess(responseData.data);
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var selectPic = exports.selectPic = function selectPic(bridge) {
		return function (argObj) {
			var module = argObj.module;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SELECT_PIC, { module: module }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						//把\t换回单引号，注：单引号bridge里面跑不过，换成了\t
						responseData.data.forEach(function (item) {
							var link = item.link;

							var newLink = link.replace(/\t/g, '\'');
							item.link = newLink;
						});

						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var selectAttachment = exports.selectAttachment = function selectAttachment(bridge) {
		return function (argObj) {
			var module = argObj.module;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SELECT_ATTACHMENT, { module: module }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						//把\t换回单引号，注：单引号bridge里面跑不过，换成了\t
						responseData.data.forEach(function (item) {
							var link = item.link;

							var newLink = link.replace(/\t/g, '\'');
							item.link = newLink;
						});

						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var selectUser = exports.selectUser = function selectUser(bridge) {
		return function (argObj) {
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SELECT_USER, {}, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var setTitle = exports.setTitle = function setTitle(bridge) {
		return function (argObj) {
			var title = argObj.title;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SET_TITLE, { title: title }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var setRight = exports.setRight = function setRight(bridge) {
		return function (argObj) {
			var show = argObj.show;
			var control = argObj.control;
			var text = argObj.text;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.SET_RIGHT, { show: show, control: control, text: text }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

	var actionSheet = exports.actionSheet = function actionSheet(bridge) {
		return function (argObj) {
			var title = argObj.title;
			var cancelButton = argObj.cancelButton;
			var otherButtons = argObj.otherButtons;
			var onSuccess = argObj.onSuccess;
			var onFail = argObj.onFail;


			try {
				bridge.callHandler(_constants.ACTION_SHEET, { title: title, cancelButton: cancelButton, otherButtons: otherButtons }, function (responseData) {
					responseData = JSON.parse(responseData);

					if (responseData.status === '1') {
						onSuccess(responseData.data);
					} else if (responseData.status === '0') {
						onFail(responseData.message);
					}
				});
			} catch (e) {
				onFail(e.message);
			}
		};
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// all the native method names
	var SHOW_DIALOG = exports.SHOW_DIALOG = 'showDialog';
	var SHOW_TOAST = exports.SHOW_TOAST = 'showToast';
	var GET_LOCATION = exports.GET_LOCATION = 'getLocation';
	var SHOW_PIC = exports.SHOW_PIC = 'showImage';
	var START_APP = exports.START_APP = 'startApp';
	var SHOW_ATTACHMENT = exports.SHOW_ATTACHMENT = 'showAttachment';
	var CALL_PHONE = exports.CALL_PHONE = 'callPhone';
	var SEND_MESSAGE = exports.SEND_MESSAGE = 'sendMessage';
	var GET_NETWORK_TYPE = exports.GET_NETWORK_TYPE = 'getNetworkType';
	var SELECT_PIC = exports.SELECT_PIC = 'selectPic';
	var SELECT_ATTACHMENT = exports.SELECT_ATTACHMENT = 'selectAttachment';
	var SELECT_USER = exports.SELECT_USER = 'selectUser';
	var SET_TITLE = exports.SET_TITLE = 'setTitle';
	var SET_RIGHT = exports.SET_RIGHT = 'setRight';
	var ACTION_SHEET = exports.ACTION_SHEET = 'actionSheet';

/***/ }
/******/ ]);