define('tDesktop/tDesktop.Menu',function(require, exports, module){
    var $ = window.jQuery;
    require('menu-aim');
    require('backbone');
    
    //first Model
    var Menu = Backbone.Model.extend({
        defaults: {
            menuId: null,
            menuText: "",
            iconfont: ""
        }
    });
    //first Collection
    var MenuList = Backbone.Collection.extend({
        model: Menu,
        url: '',
        sync: function(){}
    });
    //second third Model
    var secondMenu = Backbone.Model.extend({
        defaults: {
            parentId: null,
            menuId: null,
            menuText: "",
            expand: null,
            actionType: ""
        }
    });
    //second third Collection
    var secondMenuList = Backbone.Collection.extend({
        model: secondMenu,
        url: '',
        sync: function(){}
    });
    var thirdMenuList = Backbone.Collection.extend({
        model: secondMenu,
        url: '',
        sync: function(){}
    });
    
    var menulist = new MenuList;
    var secondmenulist = new secondMenuList;
    var thirdmenulist = new thirdMenuList;
    
    //first View
    var menuItemView = Backbone.View.extend({
        el: 'ul.first-menu',
        template: $("#menuTmpl").template(),
        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change',this.render);
        },
        render: function() {
            var element = jQuery.tmpl(this.template, this.model.toJSON());
            $(this.el).append(element);
            return this;
        }
    });
    //second View
    var secondMenuView = Backbone.View.extend({
        el: 'ul.second-menu',
        template: $("#secondMenuTmpl").template(),
        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change',this.render);
        },
        render: function() {
            var element = jQuery.tmpl(this.template, this.model.toJSON());
            var menu_id = this.model.toJSON().parentId;
            $('#second-menulist-'+menu_id).append(element);
            return this;
        }
		
    });
    //third View
    var thirdMenuView = Backbone.View.extend({
        el: 'ul.third-menu',
        template: $("#thirdMenuTmpl").template(),
        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change',this.render);
        },
        render: function() {
            var element = jQuery.tmpl(this.template, this.model.toJSON());
            var menu_id = this.model.toJSON().parentId;
            $('#third-menulist-'+menu_id).append(element);
            return this;
        }
    });
    //view apply
    var MenuView = Backbone.View.extend({
        el: '.west-body',
        initialize: function(){
            var self = this;
            _.bindAll(this, 'createMenu', 'menuHover', 'createSecondMenu', 'createThirdMenu', 'showSubmenu', 'hideSubmenu', 'hideAllSubmenu');
            
            menulist.bind('add', self.createMenu);
			
            menulist.fetch();
           
            secondmenulist.bind('add', self.createSecondMenu);
            secondmenulist.fetch();
            
            thirdmenulist.bind('add', self.createThirdMenu);
            thirdmenulist.fetch();

            for(var i=0; i<shortcutArray.length; i++)
            {
                if(typeof(func_array['f'+shortcutArray[i]]) != "object")
                    continue;
                var func_id = 'f'+shortcutArray[i];
                var func_name = func_array[func_id][0];
                var func_code = func_array[func_id][1];
                var open_window = func_array[func_id][4] ? func_array[func_id][4] : "";
                if(func_code.substr(0, 1) == "@")
                    continue;
                var json = {};
                var onclick = "createTab(" + func_id.substr(1) + ",'" + func_name.replace("'", "\'") + "','" + func_code.replace("'", "\'") + "','" + open_window + "');";
                json["parentId"] = 'shortcut';
                json["menuId"] = func_id;
                json["menuText"] = func_name;
                json["expand"] = false;
                json["actionType"] = onclick;
                secondmenulist.add(json);
            }
            
            //create first
            for(var i = 0; i < first_array.length; i++){
                var json = {};
                var menu_id = first_array[i];
                var menu_module = first_array[i][2] || '';
                
                if(typeof(func_array['m'+menu_id]) != "object"){   
                    continue;
                }
                var image = !func_array['m'+menu_id][1] ? 'oa' : func_array['m'+menu_id][1];
                json["menuId"] = first_array[i];                    
                json['module'] = menu_module; 
                json["menuText"] = func_array['m'+menu_id][0];
                json["iconfont"] = module2iconfont[first_array[i]] || module2iconfont['default'];
                menulist.add(json);
            }
            //create second
            var extend_menus = [[], []];
            for(var i = 0; i < first_array.length; i++){
                var menu_id = first_array[i];
                if(typeof(func_array['m'+menu_id]) != "object")
                    continue;
                if(menu_id == "shortcut"){
                    $('#second-menu-shortcut h4').append('<a href="javascript:;" onclick="window.createTab(\'fshortcut\', func_array[\'fshortcut\'][0], func_array[\'fshortcut\'][1], func_array[\'fshortcut\'][4]);" class="set-shortcut" id="set-shortcut"><i class="iconfont">&#xe63f;</i></a>');
                }
                for(var j=0; j < second_array['m'+menu_id].length; j++)
                {
                    var json = {}
                    var func_id = 'f' + second_array['m'+menu_id][j];
                    if(!func_array[func_id])
                        continue;
                    var func_name = func_array[func_id][0];
                    var func_code = func_array[func_id][1];
                    var open_window = func_array[func_id][4] ? func_array[func_id][4] : '';
                    var bExpand = func_code.substr(0,1) == "@" && third_array[func_id];
                    func_code = func_code.replace("LOGIN_USER_ID", loginUser.user_id)
                    var onclick = bExpand ? "" : "createTab(" + func_id.substr(1) + ",'" + func_name.replace("'", "\'") + "','" + func_code.replace("'", "\'") + "','" + open_window + "');";
                    json["parentId"] = menu_id;
                    json["menuId"] = func_id;
                    json["menuText"] = func_name;
                    json["expand"] = bExpand;
                    json["actionType"] = onclick;
                    
                    if(bExpand == false){
                        secondmenulist.add(json);
                    }else{
                        extend_menus[0].push(json);
                    }
                    if(bExpand)
                    {
                        //create third
                        for(var k=0; k < third_array[func_id].length; k++)
                        {
                            var json = {};
                            var third_id = 'f' + third_array[func_id][k];
                            if(!third_id)
                                continue;
                            try {
	                            var third_name = func_array[third_id][0];
	                            var third_code = func_array[third_id][1];
	                            var open_window1 = func_array[third_id][4] ? func_array[third_id][4] : '';
	                            var onclick1 = "createTab(" + third_id.substr(1) + ",'" + third_name.replace("'", "\'") + "','" + third_code.replace("'", "\'") + "','" + open_window1 + "');";
	                            json["parentId"] = func_id;
	                            json["menuId"] = third_id;
	                            json["menuText"] = third_name;
	                            json["expand"] = false; 
	                            json["actionType"] = onclick1;
	                            extend_menus[1].push(json);
							} catch (e) {
                            	
                            }
                        }
                    }
                }
            }
            $.each(extend_menus[0], function(){
                secondmenulist.add(this);
            })
            $.each(extend_menus[1], function(){
                thirdmenulist.add(this);
            })
        },
        //second panel toggle show or hide
        menuHover: function(){
            var self = this;
            var $menu = jQuery(".first-menu");
            $menu.menuAim({
                activate: self.showSubmenu,
                deactivate: self.hideSubmenu,
                exitMenu:self.hideAllSubmenu
            });
            $(".first-menu li a").click(function(e) {
                e.stopPropagation();
				
            });
			
        },
        //create menu
        createMenu: function(menuitem){
            var view = new menuItemView({model: menuitem});
            $('.first-menu').prepend(view.render().el);
        },
        createSecondMenu: function(secondmenuitem){
            var secondview = new secondMenuView({model: secondmenuitem});
            $('.second-menu').prepend(secondview.render().el);
        },
        createThirdMenu: function(thirdmenuitem){
            var thirdview = new thirdMenuView({model: thirdmenuitem});
            $('.third-menu').prepend(thirdview.render().el);
        },
        //menu show hide
        showSubmenu: function(row){
            var $menu = $(".first-menu"),
                $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId),
                width = $menu.outerWidth();
            this.$active = $row;
            $submenu.css({
                display: "block",
                top: -22,
                left: width
            });
            $submenu.animate('width','400');
            $row.find("div.first-menu-item").addClass("first-menu-item-hover");
        },
        hideAllSubmenu: function(){
            $(".second-panel").css("display", "none");
            $("div.first-menu-item").removeClass("first-menu-item-hover");
            return true;
        },
        hideSubmenu: function(row){
            var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId);
            $submenu.css("display", "none");
            $row.find("div.first-menu-item").removeClass("first-menu-item-hover");
        },
        hideActiveMenu: function(){
            if(this.$active){
                this.hideSubmenu(this.$active);    
            }    
        }
        
    });
    var MenuScrollView = Backbone.View.extend({
        el: $('.west'),
        events: {
            'click div.scroll-up': 'scrollUp',
            'click div.scroll-down': 'scrollDown'
        },
        initialize: function() {
            var self = this;
            _.bindAll(this, 'scrollUp', 'scrollDown');
            $(window).resize(function(){self.initMenuHeight();});
            this.initMenuHeight();
            $('#first_menu').mousewheel(function(event, delta) {
                var ul = $('#first_menu');
                if(delta > 0){
                    ul.scrollTop(ul.scrollTop()-46);
                }
                else{
                    ul.scrollTop(ul.scrollTop()+46);
                }
                return false;
            });
            $(".second-panel").mousewheel(function(e){
                e.stopPropagation();
            });
        },
        initMenuHeight: function(){
            var availheight = $('.west-footer').offset().top-$('#north').height()-$("#funcbar").height();
            var scrollheight = $("#first_menu")[0].scrollHeight;
            if(availheight < scrollheight){
                availheight = availheight-40;//avail height - top bottom scroll height
                $("#first_menu").height(availheight);
                $('.scroll-up').show();
                $('.scroll-down').show();
            }
            else{
                $("#first_menu").height(availheight);
                $('.scroll-up').hide();
                $('.scroll-down').hide();
            }
        },
        scrollUp: function() {
            //4 times height of firstmenuitem'height
            var ul = $('#first_menu');
            ul.animate({'scrollTop':(ul.scrollTop()-144)}, 600);
        },
        scrollDown: function(){
            var ul = $('#first_menu');
            ul.animate({'scrollTop':(ul.scrollTop()+144)}, 600);
        }
    });
    
    exports.Menu = {
        MenuInit: MenuView,
        MenuScroll: MenuScrollView
    };
});