/*
 * jQuery UI Multiselect
 *
 * Authors:
 *  Michael Aufreiter (quasipartikel.at)
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://www.quasipartikel.at/multiselect/
 *
 * 
 * Depends:
 *	ui.core.js
 *	ui.sortable.js
 *
 * Optional:
 * localization (http://plugins.jquery.com/project/localisation)
 * scrollTo (http://plugins.jquery.com/project/ScrollTo)
 * 
 * Todo:
 *  Make batch actions faster
 *  Implement dynamic insertion through remote calls
 */
(function($){$.widget("ui.multiselect",{_init:function(){this.element.hide();this.id=this.element.attr("id");this.container=$('<div class="ui-multiselect ui-helper-clearfix ui-widget"></div>').insertAfter(this.element);this.count=0;this.selectedContainer=$('<div class="selected"></div>').appendTo(this.container);this.availableContainer=$('<div class="available"></div>').appendTo(this.container);this.selectedActions=$('<div class="actions ui-widget-header ui-helper-clearfix"><span class="count">0 '+$.ui.multiselect.locale.itemsCount+'</span><a href="#" class="remove-all">'+$.ui.multiselect.locale.removeAll+'</a></div>').appendTo(this.selectedContainer);this.availableActions=$('<div class="actions ui-widget-header ui-helper-clearfix"><input type="text" class="search empty ui-widget-content ui-corner-all"/><a href="#" class="add-all">'+$.ui.multiselect.locale.addAll+'</a></div>').appendTo(this.availableContainer);this.selectedList=$('<ul class="selected connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind('selectstart',function(){return false}).appendTo(this.selectedContainer);this.availableList=$('<ul class="available connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind('selectstart',function(){return false}).appendTo(this.availableContainer);var c=this;this.container.width(this.element.width()+1);this.selectedContainer.width(Math.floor(this.element.width()*this.options.dividerLocation));this.availableContainer.width(Math.floor(this.element.width()*(1-this.options.dividerLocation)));this.selectedList.height(Math.max(this.element.height()-this.selectedActions.height(),1));this.availableList.height(Math.max(this.element.height()-this.availableActions.height(),1));if(!this.options.animated){this.options.show='show';this.options.hide='hide'}this._populateLists(this.element.find('option'));if(this.options.sortable){$("ul.selected").sortable({placeholder:'ui-state-highlight',axis:'y',update:function(a,b){c.selectedList.find('li').each(function(){if($(this).data('optionLink'))$(this).data('optionLink').remove().appendTo(c.element)})},receive:function(a,b){b.item.data('optionLink').attr('selected',true);c.count+=1;c._updateCount();c.selectedList.children('.ui-draggable').each(function(){$(this).removeClass('ui-draggable');$(this).data('optionLink',b.item.data('optionLink'));$(this).data('idx',b.item.data('idx'));c._applyItemState($(this),true)});setTimeout(function(){b.item.remove()},1)}})}if(this.options.searchable){this._registerSearchEvents(this.availableContainer.find('input.search'))}else{$('.search').hide()}$(".remove-all").click(function(){c._populateLists(c.element.find('option').removeAttr('selected'));return false});$(".add-all").click(function(){c._populateLists(c.element.find('option').attr('selected','selected'));return false})},destroy:function(){this.element.show();this.container.remove();$.widget.prototype.destroy.apply(this,arguments)},_populateLists:function(b){this.selectedList.children('.ui-element').remove();this.availableList.children('.ui-element').remove();this.count=0;var c=this;var d=$(b.map(function(i){var a=c._getOptionNode(this).appendTo(this.selected?c.selectedList:c.availableList).show();if(this.selected)c.count+=1;c._applyItemState(a,this.selected);a.data('idx',i);return a[0]}));this._updateCount()},_updateCount:function(){this.selectedContainer.find('span.count').text(this.count+" "+$.ui.multiselect.locale.itemsCount)},_getOptionNode:function(a){a=$(a);var b=$('<li class="ui-state-default ui-element" title="'+a.text()+'"><span class="ui-icon"/>'+a.text()+'<a href="#" class="action"><span class="ui-corner-all ui-icon"/></a></li>').hide();b.data('optionLink',a);return b},_cloneWithData:function(a){var b=a.clone();b.data('optionLink',a.data('optionLink'));b.data('idx',a.data('idx'));return b},_setSelected:function(a,b){a.data('optionLink').attr('selected',b);if(b){var c=this._cloneWithData(a);a[this.options.hide](this.options.animated,function(){$(this).remove()});c.appendTo(this.selectedList).hide()[this.options.show](this.options.animated);this._applyItemState(c,true);return c}else{var d=this.availableList.find('li'),comparator=this.options.nodeComparator;var e=null,i=a.data('idx'),direction=comparator(a,$(d[i]));if(direction){while(i>=0&&i<d.length){direction>0?i++:i--;if(direction!=comparator(a,$(d[i]))){e=d[direction>0?i:i+1];break}}}else{e=d[i]}var f=this._cloneWithData(a);e?f.insertBefore($(e)):f.appendTo(this.availableList);a[this.options.hide](this.options.animated,function(){$(this).remove()});f.hide()[this.options.show](this.options.animated);this._applyItemState(f,false);return f}},_applyItemState:function(a,b){if(b){if(this.options.sortable)a.children('span').addClass('ui-icon-arrowthick-2-n-s').removeClass('ui-helper-hidden').addClass('ui-icon');else a.children('span').removeClass('ui-icon-arrowthick-2-n-s').addClass('ui-helper-hidden').removeClass('ui-icon');a.find('a.action span').addClass('ui-icon-minus').removeClass('ui-icon-plus');this._registerRemoveEvents(a.find('a.action'))}else{a.children('span').removeClass('ui-icon-arrowthick-2-n-s').addClass('ui-helper-hidden').removeClass('ui-icon');a.find('a.action span').addClass('ui-icon-plus').removeClass('ui-icon-minus');this._registerAddEvents(a.find('a.action'))}this._registerHoverEvents(a)},_filter:function(a){var b=$(this);var c=a.children('li'),cache=c.map(function(){return $(this).text().toLowerCase()});var d=$.trim(b.val().toLowerCase()),scores=[];if(!d){c.show()}else{c.hide();cache.each(function(i){if(this.indexOf(d)>-1){scores.push(i)}});$.each(scores,function(){$(c[this]).show()})}},_registerHoverEvents:function(a){a.removeClass('ui-state-hover');a.mouseover(function(){$(this).addClass('ui-state-hover')});a.mouseout(function(){$(this).removeClass('ui-state-hover')})},_registerAddEvents:function(b){var c=this;b.click(function(){var a=c._setSelected($(this).parent(),true);c.count+=1;c._updateCount();return false}).each(function(){$(this).parent().draggable({connectToSortable:'ul.selected',helper:function(){var a=c._cloneWithData($(this)).width($(this).width()-50);a.width($(this).width());return a},appendTo:'.ui-multiselect',containment:'.ui-multiselect',revert:'invalid'})})},_registerRemoveEvents:function(a){var b=this;a.click(function(){b._setSelected($(this).parent(),false);b.count-=1;b._updateCount();return false})},_registerSearchEvents:function(a){var b=this;a.focus(function(){$(this).addClass('ui-state-active')}).blur(function(){$(this).removeClass('ui-state-active')}).keypress(function(e){if(e.keyCode==13)return false}).keyup(function(){b._filter.apply(this,[b.availableList])})}});$.extend($.ui.multiselect,{defaults:{sortable:true,searchable:true,animated:'fast',show:'slideDown',hide:'slideUp',dividerLocation:0.6,nodeComparator:function(a,b){var c=a.text(),text2=b.text();return c==text2?0:(c<text2?-1:1)}},locale:{addAll:'Add all',removeAll:'Remove all',itemsCount:'items selected'}})})(jQuery);