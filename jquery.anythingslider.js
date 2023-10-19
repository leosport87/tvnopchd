(function($){$.anythingSlider=function(el,options){var base=this,o;base.el=el;base.$el=$(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');base.$el.data("AnythingSlider",base);base.init=function(){base.options=o=$.extend({},$.anythingSlider.defaults,options);base.initialized=false;if($.isFunction(o.onBeforeInitialize)){base.$el.bind('before_initialize',o.onBeforeInitialize);}
base.$el.trigger('before_initialize',base);base.$wrapper=base.$el.parent().closest('div.anythingSlider').addClass('anythingSlider-'+o.theme);base.$window=base.$el.closest('div.anythingWindow');base.win=window;base.$win=$(base.win);base.$controls=$('<div class="anythingControls"></div>').appendTo((o.appendControlsTo&&$(o.appendControlsTo).length)?$(o.appendControlsTo):base.$wrapper);base.$startStop=$('<a href="#" class="start-stop"></a>');if(o.buildStartStop){base.$startStop.appendTo((o.appendStartStopTo&&$(o.appendStartStopTo).length)?$(o.appendStartStopTo):base.$controls);}
base.$nav=$('<ul class="thumbNav" />').appendTo((o.appendNavigationTo&&$(o.appendNavigationTo).length)?$(o.appendNavigationTo):base.$controls);base.flag=false;base.playing=o.autoPlay;base.slideshow=false;base.hovered=false;base.panelSize=[];base.currentPage=o.startPanel=parseInt(o.startPanel,10)||1;o.changeBy=parseInt(o.changeBy,10)||1;base.adj=(o.infiniteSlides)?0:1;base.width=base.$el.width();base.height=base.$el.height();base.outerPad=[base.$wrapper.innerWidth()-base.$wrapper.width(),base.$wrapper.innerHeight()-base.$wrapper.height()];if(o.playRtl){base.$wrapper.addClass('rtl');}
if(o.expand){base.$outer=base.$wrapper.parent();base.$window.css({width:'100%',height:'100%'});base.checkResize();}
if(o.buildStartStop){base.buildAutoPlay();}
if(o.buildArrows){base.buildNextBackButtons();}
if(!o.autoPlay){o.autoPlayLocked=false;}
base.updateSlider();base.runTimes=$('div.anythingSlider').index(base.$wrapper)+1;base.regex=new RegExp('panel'+base.runTimes+'-(\\d+)','i');if(base.runTimes===1){base.makeActive();}
if(!$.isFunction($.easing[o.easing])){o.easing="swing";}
if(o.pauseOnHover){base.$wrapper.hover(function(){if(base.playing){base.$el.trigger('slideshow_paused',base);base.clearTimer(true);}},function(){if(base.playing){base.$el.trigger('slideshow_unpaused',base);base.startStop(base.playing,true);}});}
base.setCurrentPage(base.gotoHash()||o.startPage,false);base.$lastPage=base.$targetPage=base.$currentPage;base.slideControls(false);base.$wrapper.bind('mouseenter mouseleave',function(e){base.hovered=(e.type==="mouseenter")?true:false;base.slideControls(base.hovered,false);});$(document).keyup(function(e){if(o.enableKeyboard&&base.$wrapper.is('.activeSlider')&&!e.target.tagName.match('TEXTAREA|INPUT|SELECT')){if(!o.vertical&&(e.which===38||e.which===40)){return;}
switch(e.which){case 39:case 40:base.goForward();break;case 37:case 38:base.goBack();break;}}});base.$items.delegate('a','focus.AnythingSlider',function(e){var panel=$(this).closest('.panel'),indx=base.$items.index(panel)+base.adj;base.$items.find('.focusedLink').removeClass('focusedLink');$(this).addClass('focusedLink');base.$window.scrollLeft(0);if((indx!==-1&&(indx>=base.currentPage+o.showMultiple||indx<base.currentPage))){base.gotoPage(indx);e.preventDefault();}});var triggers="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");$.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "),function(i,f){if($.isFunction(o[f])){base.$el.bind(triggers[i],o[f]);}});if($.isFunction(o.onSlideComplete)){base.$el.bind('slide_complete',function(){setTimeout(function(){o.onSlideComplete(base);},0);});}
base.initialized=true;base.$el.trigger('initialized',base);base.startStop(base.playing);};base.updateSlider=function(){var t;base.$el.children('.cloned').remove();base.$nav.empty();base.currentPage=base.currentPage||1;base.$items=base.$el.children();base.pages=base.$items.length;base.dir=(o.vertical)?'top':'left';o.showMultiple=(o.vertical)?1:parseInt(o.showMultiple,10)||1;o.navigationSize=(o.navigationSize===false)?0:parseInt(o.navigationSize,10)||0;if(o.showMultiple>1){if(o.showMultiple>base.pages){o.showMultiple=base.pages;}
base.adjustMultiple=(o.infiniteSlides&&base.pages>1)?0:o.showMultiple-1;base.pages=base.$items.length-base.adjustMultiple;}
base.$controls.add(base.$nav).add(base.$startStop).add(base.$forward).add(base.$back)[(base.pages<=1)?'hide':'show']();if(base.pages>1){base.buildNavigation();}
if(o.infiniteSlides&&base.pages>1){base.$el.prepend(base.$items.filter(':last').clone().addClass('cloned'));if(o.showMultiple>1){base.$el.append(base.$items.filter(':lt('+o.showMultiple+')').clone().addClass('cloned multiple'));}else{base.$el.append(base.$items.filter(':first').clone().addClass('cloned'));}
base.$el.find('.cloned').each(function(){$(this).find('a,input,textarea,select,button,area').attr('disabled','disabled');$(this).find('[id]').andSelf().removeAttr('id');});}
base.$items=base.$el.children().addClass('panel'+(o.vertical?' vertical':''));base.setDimensions();if(o.resizeContents){base.$items.css('width',base.width);base.$wrapper.css('width',base.getDim(base.currentPage)[0]).add(base.$items).css('height',base.height);}else{base.$win.load(function(){base.setDimensions();t=base.getDim(base.currentPage);base.$wrapper.css({width:t[0],height:t[1]});});}
if(base.currentPage>base.pages){base.currentPage=base.pages;}
base.setCurrentPage(base.currentPage,false);base.$nav.find('a').eq(base.currentPage-1).addClass('cur');};base.buildNavigation=function(){if(o.buildNavigation&&(base.pages>1)){var a,c,i,t,$li;base.$items.filter(':not(.cloned)').each(function(j){$li=$('<li/>');i=j+1;c=o.tooltipClass+((i===1)?' first':'')+((i===base.pages)?' last':'');a='<a class="panel'+i+'" href="#"><span>@</span></a>';if($.isFunction(o.navigationFormatter)){t=o.navigationFormatter(i,$(this));if(typeof(t)==="string"){$li.html(a.replace(/@/,t));}else{$li=$('<li/>',t);}}else{$li.html(a.replace(/@/,i));}
$li.appendTo(base.$nav).addClass(c).data('index',i);});base.$nav.children('li').bind(o.clickControls,function(e){if(!base.flag&&o.enableNavigation){base.flag=true;setTimeout(function(){base.flag=false;},100);base.gotoPage($(this).data('index'));}
e.preventDefault();});if(!!o.navigationSize&&o.navigationSize<base.pages){if(!base.$controls.find('.anythingNavWindow').length){base.$nav.before('<ul><li class="prev"><a href="#"><span>'+o.backText+'</span></a></li></ul>').after('<ul><li class="next"><a href="#"><span>'+o.forwardText+'</span></a></li></ul>').wrap('<div class="anythingNavWindow"></div>');}
base.navWidths=base.$nav.find('li').map(function(){return $(this).innerWidth()+Math.ceil(parseInt($(this).find('span').css('left'),10)/2||0);}).get();base.navLeft=base.currentPage;base.$nav.width(base.navWidth(1,base.pages+1)+5);base.$controls.find('.anythingNavWindow').width(base.navWidth(1,o.navigationSize+1)).end().find('.prev,.next').bind(o.clickControls,function(e){if(!base.flag){base.flag=true;setTimeout(function(){base.flag=false;},200);base.navWindow(base.navLeft+o.navigationSize*($(this).is('.prev')?-1:1));}
e.preventDefault();});}}};base.navWidth=function(x,y){var i,s=Math.min(x,y),e=Math.max(x,y),w=0;for(i=s;i<e;i++){w+=base.navWidths[i-1]||0;}
return w;};base.navWindow=function(n){if(!!o.navigationSize&&o.navigationSize<base.pages&&base.navWidths){var p=base.pages-o.navigationSize+1;n=(n<=1)?1:(n>1&&n<p)?n:p;if(n!==base.navLeft){base.$controls.find('.anythingNavWindow').animate({scrollLeft:base.navWidth(1,n),width:base.navWidth(n,n+o.navigationSize)},{queue:false,duration:o.animationTime});base.navLeft=n;}}};base.buildNextBackButtons=function(){base.$forward=$('<span class="arrow forward"><a href="#"><span>'+o.forwardText+'</span></a></span>');base.$back=$('<span class="arrow back"><a href="#"><span>'+o.backText+'</span></a></span>');base.$back.bind(o.clickBackArrow,function(e){if(o.enableArrows&&!base.flag){base.flag=true;setTimeout(function(){base.flag=false;},100);base.goBack();}
e.preventDefault();});base.$forward.bind(o.clickForwardArrow,function(e){if(o.enableArrows&&!base.flag){base.flag=true;setTimeout(function(){base.flag=false;},100);base.goForward();}
e.preventDefault();});base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){$(this).toggleClass('hover');});base.$back.appendTo((o.appendBackTo&&$(o.appendBackTo).length)?$(o.appendBackTo):base.$wrapper);base.$forward.appendTo((o.appendForwardTo&&$(o.appendForwardTo).length)?$(o.appendForwardTo):base.$wrapper);base.arrowWidth=base.$forward.width();base.arrowRight=parseInt(base.$forward.css('right'),10);base.arrowLeft=parseInt(base.$back.css('left'),10);};base.buildAutoPlay=function(){base.$startStop.html('<span>'+(base.playing?o.stopText:o.startText)+'</span>').bind(o.clickSlideshow,function(e){if(o.enableStartStop){base.startStop(!base.playing);base.makeActive();if(base.playing&&!o.autoPlayDelayed){base.goForward(true);}}
e.preventDefault();}).bind('focusin focusout',function(){$(this).toggleClass('hover');});};base.checkResize=function(stopTimer){clearTimeout(base.resizeTimer);base.resizeTimer=setTimeout(function(){var w=base.$outer.width()-base.outerPad[0],h=(base.$outer[0].tagName==="BODY"?base.$win.height():base.$outer.height())-base.outerPad[1];if(base.width*o.showMultiple!==w||base.height!==h){base.setDimensions();base.gotoPage(base.currentPage,base.playing,null,-1);}
if(typeof(stopTimer)==='undefined'){base.checkResize();}},500);};base.setDimensions=function(){var w,h,c,t,edge=0,fullsize={width:'100%',height:'100%'},pw=(o.showMultiple>1)?base.width||base.$window.width()/o.showMultiple:base.$window.width(),winw=base.$win.width();if(o.expand){w=base.$outer.width()-base.outerPad[0];base.height=h=base.$outer.height()-base.outerPad[1];base.$wrapper.add(base.$window).add(base.$items).css({width:w,height:h});base.width=pw=(o.showMultiple>1)?w/o.showMultiple:w;}
base.$items.each(function(i){t=$(this);c=t.children();if(o.resizeContents){w=base.width;h=base.height;t.css({width:w,height:h});if(c.length){if(c[0].tagName==="EMBED"){c.attr(fullsize);}
if(c[0].tagName==="OBJECT"){c.find('embed').attr(fullsize);}
if(c.length===1){c.css(fullsize);}}}else{w=t.width()||base.width;if(c.length===1&&w>=winw){w=(c.width()>=winw)?pw:c.width();c.css('max-width',w);}
t.css('width',w);h=(c.length===1?c.outerHeight(true):t.height());if(h<=base.outerPad[1]){h=base.height;}
t.css('height',h);}
base.panelSize[i]=[w,h,edge];edge+=(o.vertical)?h:w;});base.$el.css((o.vertical?'height':'width'),edge);};base.getDim=function(page){if(base.pages<1||isNaN(page)){return[base.width,base.height];}
page=(o.infiniteSlides&&base.pages>1)?page:page-1;var i,w=base.panelSize[page][0],h=base.panelSize[page][1];if(o.showMultiple>1){for(i=1;i<o.showMultiple;i++){w+=base.panelSize[(page+i)%o.showMultiple][0];h=Math.max(h,base.panelSize[page+i][1]);}}
return[w,h];};base.goForward=function(autoplay){base.gotoPage(base.currentPage+o.changeBy*(o.playRtl?-1:1),autoplay);};base.goBack=function(autoplay){base.gotoPage(base.currentPage+o.changeBy*(o.playRtl?1:-1),autoplay);};base.gotoPage=function(page,autoplay,callback,time){if(autoplay!==true){autoplay=false;base.startStop(false);base.makeActive();}
if(/^[#|.]/.test(page)&&$(page).length){page=$(page).closest('.panel').index()+base.adj;}
if(o.changeBy!==1){if(page<0){page+=base.pages;}
if(page>base.pages){page-=base.pages;}}
if(base.pages<=1){return;}
base.$lastPage=base.$currentPage;if(typeof(page)!=="number"){page=o.startPanel;base.setCurrentPage(page);}
if(autoplay&&o.isVideoPlaying(base)){return;}
base.exactPage=page;if(page>base.pages+1-base.adj){page=(!o.infiniteSlides&&!o.stopAtEnd)?1:base.pages;}
if(page<base.adj){page=(!o.infiniteSlides&&!o.stopAtEnd)?base.pages:1;}
if(!o.infiniteSlides){base.exactPage=page;}
base.currentPage=(page>base.pages)?base.pages:(page<1)?1:base.currentPage;base.$currentPage=base.$items.eq(base.currentPage-base.adj);base.targetPage=(page===0)?base.pages:(page>base.pages)?1:page;base.$targetPage=base.$items.eq(base.targetPage-base.adj);time=time||o.animationTime;if(time>=0){base.$el.trigger('slide_init',base);}
base.slideControls(true,false);if(autoplay!==true){autoplay=false;}
if(!autoplay||(o.stopAtEnd&&page===base.pages)){base.startStop(false);}
if(time>=0){base.$el.trigger('slide_begin',base);}
setTimeout(function(d){var p,empty=true;if(!o.resizeContents){p=base.getDim(page);d={};if(base.$wrapper.width()!==p[0]){d.width=p[0]||base.width;empty=false;}
if(base.$wrapper.height()!==p[1]){d.height=p[1]||base.height;empty=false;}
if(!empty){base.$wrapper.filter(':not(:animated)').animate(d,{queue:false,duration:(time<0?0:time),easing:o.easing});}}
d={};d[base.dir]=-base.panelSize[(o.infiniteSlides&&base.pages>1)?page:page-1][2];base.$el.filter(':not(:animated)').animate(d,{queue:false,duration:time,easing:o.easing,complete:function(){base.endAnimation(page,callback,time);}});},parseInt(o.delayBeforeAnimate,10)||0);};base.endAnimation=function(page,callback,time){if(page===0){base.$el.css(base.dir,-base.panelSize[base.pages][2]);page=base.pages;}else if(page>base.pages){base.$el.css(base.dir,-base.panelSize[1][2]);page=1;}
base.exactPage=page;base.setCurrentPage(page,false);base.$items.removeClass('activePage').eq(page-base.adj).addClass('activePage');if(!base.hovered){base.slideControls(false);}
if(o.hashTags){base.setHash(page);}
if(time>=0){base.$el.trigger('slide_complete',base);}
if(typeof callback==='function'){callback(base);}
if(o.autoPlayLocked&&!base.playing){setTimeout(function(){base.startStop(true);},o.resumeDelay-(o.autoPlayDelayed?o.delay:0));}};base.setCurrentPage=function(page,move){page=parseInt(page,10);if(base.pages<1||page===0||isNaN(page)){return;}
if(page>base.pages+1-base.adj){page=base.pages-base.adj;}
if(page<base.adj){page=1;}
if(o.buildNavigation){base.$nav.find('.cur').removeClass('cur').end().find('a').eq(page-1).addClass('cur');}
if(!o.infiniteSlides&&o.stopAtEnd){base.$wrapper.find('span.forward')[page===base.pages?'addClass':'removeClass']('disabled').end().find('span.back')[page===1?'addClass':'removeClass']('disabled');if(page===base.pages&&base.playing){base.startStop();}}
if(!move){var d=base.getDim(page);base.$wrapper.css({width:d[0],height:d[1]}).add(base.$window).scrollLeft(0);base.$el.css(base.dir,-base.panelSize[(o.infiniteSlides&&base.pages>1)?page:page-1][2]);}
base.currentPage=page;base.$currentPage=base.$items.removeClass('activePage').eq(page-base.adj).addClass('activePage');};base.makeActive=function(){if(!base.$wrapper.is('.activeSlider')){$('.activeSlider').removeClass('activeSlider');base.$wrapper.addClass('activeSlider');}};base.gotoHash=function(){var h=base.win.location.hash,i=h.indexOf('&'),n=h.match(base.regex);if(n===null&&!/^#&/.test(h)&&!/#!?\//.test(h)){h=h.substring(0,(i>=0?i:h.length));n=($(h).length&&$(h).closest('.anythingBase')[0]===base.el)?$(h).closest('.panel').index():null;}else if(n!==null){n=(o.hashTags)?parseInt(n[1],10):null;}
return n;};base.setHash=function(n){var s='panel'+base.runTimes+'-',h=base.win.location.hash;if(typeof h!=='undefined'){base.win.location.hash=(h.indexOf(s)>0)?h.replace(base.regex,s+n):h+"&"+s+n;}};base.slideControls=function(toggle){var dir=(toggle)?'slideDown':'slideUp',t1=(toggle)?0:o.animationTime,t2=(toggle)?o.animationTime:0,op=(toggle)?1:0,sign=(toggle)?0:1;if(o.toggleControls){base.$controls.stop(true,true).delay(t1)[dir](o.animationTime/2).delay(t2);}
if(o.buildArrows&&o.toggleArrows){if(!base.hovered&&base.playing){sign=1;op=0;}
base.$forward.stop(true,true).delay(t1).animate({right:base.arrowRight+(sign*base.arrowWidth),opacity:op},o.animationTime/2);base.$back.stop(true,true).delay(t1).animate({left:base.arrowLeft+(sign*base.arrowWidth),opacity:op},o.animationTime/2);}};base.clearTimer=function(paused){if(base.timer){base.win.clearInterval(base.timer);if(!paused&&base.slideshow){base.$el.trigger('slideshow_stop',base);base.slideshow=false;}}};base.startStop=function(playing,paused){if(playing!==true){playing=false;}
base.playing=playing;if(playing&&!paused){base.$el.trigger('slideshow_start',base);base.slideshow=true;}
if(o.buildStartStop){base.$startStop.toggleClass('playing',playing).find('span').html(playing?o.stopText:o.startText);if(base.$startStop.find('span').css('visibility')==="hidden"){base.$startStop.addClass(o.tooltipClass).attr('title',playing?o.stopText:o.startText);}}
if(playing){base.clearTimer(true);base.timer=base.win.setInterval(function(){if(!o.isVideoPlaying(base)){base.goForward(true);}else if(!o.resumeOnVideoEnd){base.startStop();}},o.delay);}else{base.clearTimer();}};base.init();};$.anythingSlider.defaults={theme:"default",expand:false,resizeContents:true,vertical:false,showMultiple:false,easing:"swing",buildArrows:true,buildNavigation:true,buildStartStop:true,toggleArrows:false,toggleControls:false,startText:"Start",stopText:"Stop",forwardText:"&raquo;",backText:"&laquo;",tooltipClass:"tooltip",enableArrows:true,enableNavigation:true,enableStartStop:true,enableKeyboard:true,startPanel:1,changeBy:1,hashTags:true,infiniteSlides:true,navigationFormatter:null,navigationSize:false,autoPlay:false,autoPlayLocked:false,autoPlayDelayed:false,pauseOnHover:true,stopAtEnd:false,playRtl:false,delay:3000,resumeDelay:15000,animationTime:600,delayBeforeAnimate:0,clickForwardArrow:"click",clickBackArrow:"click",clickControls:"click focusin",clickSlideshow:"click",resumeOnVideoEnd:true,resumeOnVisible:true,addWmodeToObject:"opaque",isVideoPlaying:function(base){return false;}};$.fn.anythingSlider=function(options,callback){return this.each(function(){var page,anySlide=$(this).data('AnythingSlider');if((typeof(options)).match('object|undefined')){if(!anySlide){(new $.anythingSlider(this,options));}else{anySlide.updateSlider();}}else if(/\d/.test(options)&&!isNaN(options)&&anySlide){page=(typeof(options)==="number")?options:parseInt($.trim(options),10);if(page>=1&&page<=anySlide.pages){anySlide.gotoPage(page,false,callback);}}else if(/^[#|.]/.test(options)&&$(options).length){anySlide.gotoPage(options,false,callback);}});};})(jQuery);