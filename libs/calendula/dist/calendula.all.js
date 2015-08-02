/*! Calendula | © 2013—2015 Denis Seleznev | https://github.com/hcodes/calendula/ */
var Calendula=function(t,e,n,i,a){"use strict";function r(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function o(t){return(10>t?"0":"")+t}function s(t,e,n){return[t,o(e+1),o(n)].join("-")}function l(t){var e,i,a=null;if(t)if(b(t)){if("today"===t)return new n;e=/^\s*(\d{4})[-/.](\d\d)(?:[-/.](\d\d))?\s*$/.exec(t),e?i=[e[3],e[2],e[1]]:(e=/^\s*(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{4}|\d\d))?\s*$/.exec(t),e&&(i=[e[1],e[2],e[3]])),i&&(a=new n(v(i[2]),v(i[1]-1),v(i[0])))}else w(t)?t instanceof n?a=t:t.year&&t.day&&(a=new n(t.year,t.month,t.day,12,0,0,0)):D(t)&&(a=new n(t));return a}function c(t){var e=l(t);return e?[e.getFullYear(),o(e.getMonth()+1),o(e.getDate())].join("-"):null}function h(t){var e=l(t);return e?{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}:{}}function u(t,e,n){return null===n||n===!1?e="":(n===!0||n===a)&&(n=""),Y+"__"+t+(e?"_"+e+(""===n?"":"_"+n):"")}function d(t,e){return null===e||e===!1?t="":(e===!0||e===a)&&(e=""),Y+(t?"_"+t+(""===e?"":"_"+e):"")}function f(t,e){var n=p(t),i=n?u(n,e):d(e),a=(t.className||"").split(" ");a.forEach(function(e){(e===i||-1!==e.search(i+"_"))&&W(t,e)})}function m(t,e,n){var i=p(t);f(t,e),C(t,i?u(i,e,n):d(e,n))}function y(t,e,n){var i=p(t);return T(t,i?u(i,e,n):d(e,n))}function _(t,e){return T(t,u(e))}function p(t){var e=t.className.match(/__([^ _$]+)/);return e?e[1]:""}function v(t){return parseInt(t,10)}function g(t){return"[object Object]"===Object.prototype.toString.call(t)}function b(t){return"string"==typeof t}function D(t){return"number"==typeof t}function w(t){return"object"==typeof t}function x(t){return"undefined"==typeof t}function E(n){var i={top:0,left:0};return x(n.getBoundingClientRect)||(i=n.getBoundingClientRect()),{top:i.top+(t.pageYOffset||e.scrollTop||0)-(e.clientTop||0),left:i.left+(t.pageXOffset||e.scrollLeft||0)-(e.clientLeft||0)}}function S(t,e,n){M(t,e),k(t,n)}function M(t,e){t.style.left=D(e)?e+"px":e}function k(t,e){t.style.top=D(e)?e+"px":e}var N=0,A=11,O=function(t){t=r({},t||{});var e=this._prepareYears(t.years),n=r(t,{autocloseable:x(t.autocloseable)?!0:t.autocloseable,closeAfterSelection:x(t.closeAfterSelection)?!0:t.closeAfterSelection,locale:t.locale||O._defaultLocale,min:h(t.min),max:h(t.max),showOn:t.showOn||"click",theme:t.theme||"default",_startYear:e.start,_endYear:e.end});this._data=n,this._initExts(),this.val(n.value),this._addSwitcherEvents(n.showOn)};r(O.prototype,{isOpened:function(){return this._isOpened},open:function(){var t=this;return this._init(),this.isOpened()||(this.timeout.clearAll(["open","close"]).set(function(){m(t._container,"opened"),t._update(),t._monthSelector(t._currentDate.month,!1),t._yearSelector(t._currentDate.year,!1),t._openedEvents()},0,"open"),this._isOpened=!0,this.event.trigger("open")),this},close:function(){var t=this;return this._init(),this.isOpened()&&(this.timeout.clearAll(["open","close"]).set(function(){t.timeout.clearAll("open"),t._update(),t._delOpenedEvents(),f(t._container,"opened"),t.tooltip.hide(),t.event.trigger("close")},0,"close"),this._isOpened=!1),this},toggle:function(){return this.isOpened()?this.close():this.open()},val:function(t){return arguments.length?(t?(this._val=h(t),this._currentDate=r({},this._val)):(this._val={},this._currentDate=this._current()),this._container&&this._updateSelection(),void this._updateSwitcher()):this._val},setting:function(t,e){var n=this._data,i=this._container,a={min:!0,max:!0,locale:!0};return 1===arguments.length?n[t]:(n[t]="min"===t||"max"===t||"value"===t?h(e):e,"showOn"===t&&this._addSwitcherEvents(e),i&&("theme"===t&&m(i,"theme",e),"daysAfterMonths"===t&&(e?m(i,"days-after-months"):f(i,"days-after-months")),a[t]&&this._rebuild()),this)},position:function(){var t,e,n,i=this.setting("position")||"left bottom",a=this.setting("switcher"),r=E(a),o=this._container,s=o.offsetWidth,l=o.offsetHeight,c=a.offsetWidth,h=a.offsetHeight;if(b(i)){switch(t=i.trim().split(/ +/),e=r.left,n=r.top,t[0]){case"center":e+=-(s-c)/2;break;case"right":e+=c-s}switch(t[1]){case"top":n+=-l;break;case"center":n+=-(l-h)/2;break;case"bottom":n+=h}}else e=r.left,n=r.top;S(this._container,e,n)},destroy:function(){this._isInited&&(this.close(),this._removeExts(),e.body.removeChild(this._container),this._data=null,this._container=null,this._isInited=null)},_init:function(){if(!this._isInited){this._isInited=!0;var t=this.setting("id"),n=e.createElement("div");this._container=n,t&&(n.id=t),C(n,Y),m(n,"theme",this._data.theme),this.setting("daysAfterMonths")&&m(n,"days-after-months"),this._rebuild(),e.body.appendChild(n)}},_current:function(){var t=new n;return{day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}},_update:function(){this._init(),this.setting("switcher")&&this.position()},_findDayByDate:function(t){if(t.year!==this._currentDate.year)return null;var e=this._elemAll("days-month")[t.month];if(e){var n=this._elemAllContext(e,"day")[t.day-1];return n||null}return null},_resize:function(){this._update()},_rebuild:function(){var t=this.isOpened();t&&this._delOpenedEvents(),this._container.innerHTML=this.template.get("main"),t&&(this._openedEvents(),this._monthSelector(this._currentDate.month,!1),this._yearSelector(this._currentDate.year,!1))},_rebuildDays:function(){this._elem("days-container").innerHTML=this.template.get("days"),this._monthSelector(this._currentDate.month,!1)},_intoContainer:function(t){for(var e=t;e;){if(e===this._container)return!0;e=e.parentNode}return!1},_openedEvents:function(){var n=this;this.domEvent.on(e,"click",function(t){!t.button&&n.setting("autocloseable")&&(t.target===n.setting("switcher")||n._intoContainer(t.target)||n.close())},"open"),this.domEvent.on(t,"resize",function(){n._resize()},"open").on(e,"keypress",function(t){27===t.keyCode&&n.close()},"open").on(this._container,"click",function(t){t.button||n.tooltip.hide()},"open");var i=this._elem("days"),a=this._elem("months"),r=this._elem("years"),o=function(t){var e=0;return t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e};this._onwheelmonths=function(t){var e=o(t);e&&(n._monthSelector(n._currentDate.month+e,!0),t.preventDefault())},this._onwheelyears=function(t){var e=o(t);e&&(n._yearSelector(n._currentDate.year+e,!0),t.preventDefault())},this.domEvent.onWheel(i,this._onwheelmonths,"open").onWheel(a,this._onwheelmonths,"open").onWheel(r,this._onwheelyears,"open"),this.domEvent.on(a,"click",function(t){t.button||_(t.target,"month")&&n._monthSelector(+z(t.target,"month"),!0)},"open"),this.domEvent.on(r,"click",function(t){if(!t.button){var e=z(t.target,"year");e&&n._yearSelector(+e,!0)}},"open"),this.domEvent.on(i,"mouseover",function(t){var e=t.target,i=+z(e,"day"),a=+z(e,"month"),r=+n._currentDate.year;_(e,"day")&&y(e,"has-title")&&n.tooltip.show(e,n.title.get(s(r,a,i)))},"open"),this.domEvent.on(i,"mouseout",function(t){_(t.target,"day")&&n.tooltip.hide()},"open"),this.domEvent.on(i,"click",function(t){if(!t.button){var e=n._currentDate,a=t.target,r=z(a,"day"),o=z(a,"month");if(r){if(y(a,"minmax"))return;if(!y(a,"selected")){e.day=+r,e.month=+o;var s=i.querySelector("."+u("day","selected"));s&&f(s,"selected"),m(a,"selected"),n.event.trigger("select",{day:e.day,month:e.month,year:e.year}),n.setting("closeAfterSelection")&&n.close()}}}},"open")},_monthSelector:function(t,e){N>t?t=N:t>A&&(t=A),this._currentDate.month=t;var n,a=this._elem("months"),r=this._elem("month").offsetHeight,o=this._elemAll("days-month"),s=o[t],l=this._elem("month-selector"),c=this._elem("days-container"),h=this._elem("days");e||(m(h,"noanim"),m(a,"noanim"));var u=i.floor(this._currentDate.month*r-r/2);0>=u&&(u=1),u+l.offsetHeight>=a.offsetHeight&&(u=a.offsetHeight-l.offsetHeight-1),J(l,u),n=-i.floor(s.offsetTop-h.offsetHeight/2+s.offsetHeight/2),n>0&&(n=0);var d=h.offsetHeight-c.offsetHeight;d>n&&(n=d),J(c,n),this._colorizeMonths(t),e||this.timeout.set(function(){f(h,"noanim"),f(a,"noanim")},0,"anim")},_yearSelector:function(t,e){var n=this._data,a=n._startYear,r=n._endYear,o=this._currentDate.year;a>t?t=a:t>r&&(t=r),this._currentDate.year=t;var s=this._elem("years"),l=this._elem("years-container"),c=this._elem("year").offsetHeight,h=this._elem("year-selector");e||m(s,"noanim");var u=i.floor((this._currentDate.year-a)*c),d=-i.floor((this._currentDate.year-a)*c-s.offsetHeight/2);d>0&&(d=0),d<s.offsetHeight-l.offsetHeight&&(d=s.offsetHeight-l.offsetHeight);var y=0;s.offsetHeight>=l.offsetHeight&&((r-a+1)%2&&(y=c),d=i.floor((s.offsetHeight-l.offsetHeight-y)/2)),t!==o&&this._rebuildDays(t),J(h,u),J(l,d),this._colorizeYears(t),e||this.timeout.set(function(){f(s,"noanim")},0,"anim")},_colorizeMonths:function(t){for(var e=this._elemAll("month"),n=5,i=0;n>i;i++)for(var a=this._elemAll("month","color",i),r=0,o=a.length;o>r;r++)f(a[r],"color",i);m(e[t],"color","0"),t-1>=N&&m(e[t-1],"color","0"),A>=t+1&&m(e[t+1],"color","0");var s=1;for(i=t-2;i>=N&&n>s;i--,s++)m(e[i],"color",s);for(s=1,i=t+2;A>=i&&n>s;i++,s++)m(e[i],"color",s)},_colorizeYears:function(t){for(var e=this._elemAll("year"),n=this._data._startYear,i=5,a=0;i>a;a++)for(var r=this._elemAll("year","color",a),o=0,s=r.length;s>o;o++)f(r[o],"color",a);m(e[t-n],"color","0");var l=1;for(a=t-1;a>=this._data._startYear&&i>l;a--,l++)m(e[a-n],"color",l);for(l=1,a=t+1;a<=this._data._endYear&&i>l;a++,l++)m(e[a-n],"color",l)},_delOpenedEvents:function(){this.domEvent.offAll("open")},_prepareYears:function(t){var e,n,a,r=this._current();return b(t)&&(e=t.trim().split(/[:,; ]/),n=v(e[0]),a=v(e[1]),isNaN(n)||isNaN(a)||(i.abs(n)<1e3&&(n=r.year+n),i.abs(a)<1e3&&(a=r.year+a))),{start:n||r.year-11,end:a||r.year+1}},_updateSelection:function(){var t=this._elem("day","selected");if(t&&f(t,"selected"),this._currentDate.year===this._val.year){var e=this._elemAll("days-month");if(e&&e[this._val.month]){var n=this._elemAllContext(e[this._val.month],"day"),i=this._val.day-1;n&&n[i]&&m(n[i],"selected")}}},_addSwitcherEvents:function(t){var e=this.setting("switcher"),n=this,i=P(t)?t:[t||"click"],a=["input","textarea"],r=["focus","mouseover"];if(this.domEvent.offAll("switcher"),-1===i.indexOf("none")&&e){var o=e.tagName.toLowerCase();i.forEach(function(t){n.domEvent.on(e,t,function(){-1!==a.indexOf(o)||-1!==r.indexOf(t)?n.open():n.toggle()},"switcher")})}},_switcherText:function(){var t=this._currentDate,e=this.text("months"),n=this.text("caseMonths");return t.day+" "+(n||e)[t.month]+" "+t.year},_updateSwitcher:function(){var t,e=this.setting("switcher"),n=this._switcherText();e&&(t=e.tagName.toLowerCase(),"input"===t||"textarea"===t?e.value=n:e.innerHTML=n)},_elem:function(t,e,n){return this._container.querySelector("."+u(t,e,n))},_elemAll:function(t,e,n){return this._container.querySelectorAll("."+u(t,e,n))},_elemAllContext:function(t,e,n,i){return t.querySelectorAll("."+u(e,n,i))}}),r(O.prototype,{_initExts:function(t){O._exts.forEach(function(t){var e=t[0],n=t[1]||function(){},i=t[2];r(n.prototype,i),this[e]=new n;var a=this[e];a.parent=this,a.init&&a.init(this._data,this._container)},this)},_removeExts:function(){O._exts.forEach(function(t){var e=t[0];this[e].destroy(),delete this[e]},this)}}),O._exts=[],O.addExt=function(t,e,n){O._exts.push([t,e,n])};var L=e.createElement("div"),z=L.dataset?function(t,e){return t.dataset[e]}:function(t,e){return t.getAttribute("data-"+e)},H=!!L.classList,C=H?function(t,e){t.classList.add(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");n.test(e.className)||(t.className=(t.className+" "+e).replace(/\s+/g," ").replace(/(^ | $)/g,""))},W=H?function(t,e){t.classList.remove(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");t.className=t.className.replace(n,"$1").replace(/\s+/g," ").replace(/(^ | $)/g,"")},T=H?function(t,e){return t.classList.contains(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");return-1!==t.className.search(n)},Y="calendula";r(O,{addHolidays:function(t,e){this._holidays=this._holidays||{},this._holidays[t]=e}}),O.prototype.getHoliday=function(t,e,n){var i=this._data.locale,r=O._holidays;return r&&r[i]&&r[i][n]?r[i][n][t+"-"+(e+1)]:a};var j=function(){var t=function(n){if(null===n||n===a)return"";var i=[];if(g(n))return e(n);if(P(n)){for(var r=0,o=n.length;o>r;r++)i.push(t(n[r]));return i.join("")}return""+n},e=function(e){var i=e.t||"div",a="<"+i+n(e)+">";return e.c&&(a+=t(e.c)),a+="</"+i+">"},n=function(t){var e,n,a=Object.keys(t),r=["c","t","e","m"],o=[],s=[],l="";if(t.e&&s.push(u(t.e)),t.m)if(t.e)for(e in t.m)t.m.hasOwnProperty(e)&&s.push(u(t.e,e,t.m[e]));else for(e in t.m)t.m.hasOwnProperty(e)&&s.push(d(e,t.m[e]));for(s.length&&o.push(i("class",s)),e=0,n=a.length;n>e;e++){var c=a[e];-1===r.indexOf(c)&&o.push(i(c,t[c]))}return l=o.join(" "),l?" "+l:""},i=function(t,e){return null!==e&&e!==a?t+'="'+(P(e)?e.join(" "):e)+'"':""};return t}();r(O,{_locales:[],_texts:{},addLocale:function(t,e){this._locales.push(t),this._texts[t]=e,e.def&&(this._defaultLocale=t)}}),O.prototype.text=function(t){return O._texts[this._data.locale][t]};var P=Array.isArray,J=function(){var t=e.createElement("div"),n=!1;return["Moz","Webkit","O","ms",""].forEach(function(e){var i=e+(e?"T":"t")+"ransform";i in t.style&&(n=i)}),n===!1?function(t,e){t.style.top=D(e)?e+"px":e}:function(t,e){t.style[n]="translateY("+(D(e)?e+"px":e)+")"}}(),F="onwheel"in e.createElement("div")?"wheel":e.onmousewheel!==a?"mousewheel":"DOMMouseScroll";O.addExt("domEvent",function(){this._buf=[]},{onWheel:function(e,n,i){return this.on(e,"DOMMouseScroll"===F?"MozMousePixelScroll":F,"wheel"===F?n:function(e){e||(e=t.event);var i={originalEvent:e,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"===e.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}},a=-1/40;return"mousewheel"===F?(i.deltaY=a*e.wheelDelta,e.wheelDeltaX&&(i.deltaX=a*e.wheelDeltaX)):i.deltaY=e.detail,n(i)},i)},on:function(t,e,n,i){return t&&e&&n&&(t.addEventListener(e,n,!1),this._buf.push({elem:t,type:e,callback:n,ns:i})),this},off:function(t,e,n,i){for(var a=this._buf,r=0;r<a.length;r++){var o=a[r];o&&o.elem===t&&o.callback===n&&o.type===e&&o.ns===i&&(t.removeEventListener(e,n,!1),a.splice(r,1),r--)}return this},offAll:function(t){for(var e=this._buf,n=0;n<e.length;n++){var i=e[n];t?t===i.ns&&(i.elem.removeEventListener(i.type,i.callback,!1),e.splice(n,1),n--):i.elem.removeEventListener(i.type,i.callback,!1)}return t||(this._buf=[]),this},destroy:function(){this.offAll(),delete this._buf}}),O.addExt("event",function(){this._buf=[]},{on:function(t,e){return t&&e&&this._buf.push({type:t,callback:e}),this},off:function(t,e){for(var n=this._buf,i=0;i<n.length;i++)e===n[i].callback&&t===n[i].type&&(n.splice(i,1),i--);return this},trigger:function(t){for(var e=this._buf,n=0;n<e.length;n++)t===e[n].type&&e[n].callback.apply(this,[{type:t}].concat(Array.prototype.slice.call(arguments,1)));return this},destroy:function(){delete this._buf}});var $=6,I=0;return O.addExt("template",null,{get:function(t){return j(this[t]())},days:function(){for(var t=[],e=N;A>=e;e++)t.push(this.month(e,this.parent._currentDate.year));return t},dayNames:function(){for(var t=this.parent.text("firstWeekday")||0,e={first:t,last:t?t-1:$},n=t,i=0;7>i;i++)e[n]=i,n++,n>$&&(n=I);return e},month:function(t,e){var i=new n(e,t,1,12,0,0,0),a=i.getTime(),r=new n,l=function(t,e,n){var i=m._val;return t===i.day&&e===i.month&&n===i.year},c=function(t){return t.year?new n(t.year,t.month,t.day,12,0,0,0).getTime():null},h=function(){var n=function(t){return v(""+t.year+o(t.month))},i=n(b),a=n(D),r={},s=v(""+e+o(t));return(b&&i>s||D&&s>a)&&(r.minmax=!0),{e:"days-title-month",m:r,c:g}};r.setHours(12,0,0,0);for(var u,d,f,m=this.parent,y=i.getDay(),_=this.dayNames(),p=_[y],g=m.text("months")[t],b=m.setting("min"),D=m.setting("max"),w=c(b),x=c(D),E=r.getTime(),S={t:"tr",c:[y!==_.first?{t:"td",colspan:p,e:"empty",c:3>p?"":h()}:""]},M=S,k={e:"days-month",c:[3>p?h():"",{t:"table",e:"days-table",c:[M]}]},N=1;i.getMonth()===t;i.setDate(++N)){u="",a=+i,y=i.getDay(),d=m.getHoliday(N,t,e),f={},y===I||y===$?f.holiday=!0:f.workday=!0,0===d?f.nonholiday=!0:1===d&&(f.highday=!0),l(N,t,e)&&(f.selected=!0),E===a&&(f.now=!0,u=m.text("today")),(w&&w>a||x&&a>x)&&(f.minmax=!0);var A=m.title.get(s(e,t,N));A&&(f["has-title"]=!0,f["title-color"]=A.color||"default"),y===_.first&&(M={t:"tr",c:[]},k.c[1].c.push(M)),M.c.push({t:"td",e:"day",m:f,title:u,"data-month":t,"data-day":N,c:N})}return k},years:function(){for(var t=this.parent._data,e=t._startYear,n=t._endYear,i=[{e:"year-selector",c:{e:"year-selector-i"}}],a=e;n>=a;a++)i.push({e:"year","data-year":a,c:a});return i},months:function(){var t=[{e:"month-selector",c:{e:"month-selector-i"}}];return this.parent.text("months").forEach(function(e,n){t.push({e:"month","data-month":n,c:e})}),t},main:function(){var t=this.parent,e=t.text("firstWeekday")||I,n=t.text("dayNames")||[],i=[];return t.text("shortDayNames").forEach(function(t,a,r){i.push({e:"short-daynames-cell",m:{n:e},title:n[e]||r[e],c:r[e]}),e++,e>$&&(e=I)},this),[{e:"short-daynames",c:i},{e:"container",c:[{e:"days",c:{e:"days-container",c:this.days()}},{e:"months",c:this.months()},{e:"years",c:{e:"years-container",c:this.years()}}]}]},destroy:function(){}}),O.addExt("timeout",function(){this._buf=[]},{set:function(t,e,n){var i=this,a=setTimeout(function(){t(),i.clear(a)},e);return this._buf.push({id:a,ns:n}),a},clear:function(t){var e=this._buf,n=-1;return e&&(e.some(function(e,i){return e.id===t?(n=i,!0):!1}),n>=0&&(clearTimeout(e[n].id),e.splice(n,1))),this},clearAll:function(t){var e=this._buf,n=[],i=Array.isArray(t)?t:[t];return e.forEach(function(e,a){t?-1!==i.indexOf(e.ns)?clearTimeout(e.id):n.push(e):clearTimeout(e.id)},this),this._buf=t?n:[],this},destroy:function(){this.clearAll(),delete this._buf}}),O.addExt("title",function(){this._title={}},{init:function(t){this.set(t.title)},get:function(t){var e=c(t);return e?this._title[e]:a},set:function(t){P(t)?t.forEach(function(e){this._set(t)},this):g(t)&&this._set(t)},_set:function(t){var e,n=c(t.date),i=this.parent;n&&(this._title[n]={text:t.text,color:t.color},i._isInited&&(e=i._findDayByDate(h(t.date)),e&&(m(e,"has-title"),m(e,"title-color",t.color))))},remove:function(t){P(t)?t.forEach(function(t){this._remove(t)},this):this._remove(t)},_remove:function(t){var e=this.parent,n=c(t);if(n&&(delete this._title[n],e._isInited)){var i=e._findDayByDate(h(t));i&&(f(i,"has-title"),f(i,"title-color"))}},removeAll:function(){if(this._title={},this.parent._isInited){var t=this.parent._elemAll("day","has-title");if(t)for(var e=0,n=t.length;n>e;e++)f(t[e],"has-title"),f(t[e],"title-color")}},destroy:function(){delete this._title}}),O.addExt("tooltip",null,{create:function(){if(!this._container){var t=e.createElement("div");C(t,u("tooltip")),t.innerHTML=j([{e:"tooltip-text"},{e:"tooltip-tail"}]),e.body.appendChild(t),this._container=t}},show:function(t,e){var n=e||{},i=5;this.create(),m(this._container,"theme",this.parent.setting("theme")),m(this._container,"visible"),this._container.querySelector(".calendula__tooltip-text").innerHTML=j({c:n.text,e:"tooltip-row"}),m(this._container,"color",n.color||"default"),this._isOpened=!0;var a=E(t),r=a.left-(this._container.offsetWidth-t.offsetWidth)/2,o=a.top-this._container.offsetHeight-i;S(this._container,r,o)},hide:function(){this._isOpened&&(f(this._container,"visible"),this._isOpened=!1)},destroy:function(){this._container&&(this.hide(),e.body.removeChild(this._container),delete this._container)}}),O}(this,this.document,Date,Math);Calendula.addLocale("be",{months:["студзень","люты","сакавік","красавік","май","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],caseMonths:["студзеня","лютага","сакавіка","красавіка","траўня","траўня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня"],shortDayNames:["Н","П","А","С","Ч","П","С"],dayNames:["Нядзеля","Панядзелак","Аўторак","Серада","Чацьвер","Пятніца","Субота"],today:"Сення",firstWeekday:1}),Calendula.addLocale("de",{months:["Januar","Februar","Marz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],shortDayNames:["So","Mo","Di","Mi","Do","Fr","Sa"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],today:"Heute",firstWeekday:1}),Calendula.addLocale("en",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],today:"Today",firstWeekday:0,def:!0}),Calendula.addLocale("es",{months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],shortDayNames:["Do","Lu","Ma","Mi","Ju","Vi","S?"],dayNames:["Domingo","Lunes","Martes","Mi?rcoles","Jueves","Viernes","S?bado"],today:"Hoy",firstWeekday:1}),Calendula.addLocale("fr",{months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],shortDayNames:["Di","Lu","Ma","Me","Je","Ve","Sa"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],today:"Aujourd’hui",firstWeekday:1}),Calendula.addLocale("it",{months:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],shortDayNames:["Do","Lu","Ma","Me","Gi","Ve","Sa"],dayNames:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],today:"Oggi",firstWeekday:1}),Calendula.addLocale("pl",{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],caseMonths:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"],shortDayNames:["N","P","W","Ś","C","P","S"],dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],today:"Dziś",firstWeekday:1}),Calendula.addLocale("ru",{months:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],caseMonths:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],shortDayNames:["В","П","В","С","Ч","П","С"],dayNames:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],today:"Сегодня",firstWeekday:1}),Calendula.addLocale("tr",{months:["ocak","şubat","mart","nisan","mayıs","haziran","temmuz","ağustos","eylül","ekim","kasım","aralık"],shortDayNames:["Pz","Pt","Sa","Ça","Pe","Cu","Ct"],dayNames:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],today:"Bugün",firstWeekday:1}),Calendula.addLocale("uk",{months:["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"],caseMonths:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],shortDayNames:["Н","П","В","С","Ч","П","С"],dayNames:["Неділя","Понеділок","Вівторок","Середа","Четвер","П’ятниця","Субота"],today:"Сьогодні",firstWeekday:1});